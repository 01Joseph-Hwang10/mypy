import json
from django.contrib import auth
from django.core.checks.messages import DEBUG
from config.settings import GOOGLE_CLIENT_ID
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from users.constants import GOOGLE
from users.models import CustomUser
from common.functions import get_cookie
from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError
from google.oauth2 import id_token
from google.auth.transport import requests


class CustomTokenObtainPairView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            user_id = CustomUser.objects.get(
                username=request.data['username']).id
        except TokenError as e:
            raise InvalidToken(e.args[0])

        auth_response = Response(
            data={"user_id": user_id}, status=status.HTTP_200_OK)

        max_age_1day = 24*60*60
        max_age_54weeks = 54*7*24*60*60

        if DEBUG:
            auth_response.set_cookie(
                "access_token", value=serializer.validated_data['access'], max_age=max_age_1day, samesite='Lax')
            auth_response.set_cookie(
                "refresh_token", value=serializer.validated_data['refresh'], max_age=max_age_54weeks, samesite='Lax')
            auth_response.set_cookie(
                "user_id", value=user_id, max_age=max_age_54weeks, samesite='Lax')
        else:
            auth_response.set_cookie(
                "access_token", value=serializer.validated_data['access'], max_age=max_age_1day, secure=True, httponly=True, samesite='Lax')
            auth_response.set_cookie(
                "refresh_token", value=serializer.validated_data['refresh'], max_age=max_age_54weeks, secure=True, httponly=True, samesite='Lax')
            auth_response.set_cookie(
                "user_id", value=user_id, max_age=max_age_54weeks, secure=True, httponly=True, samesite='Lax')

        return auth_response


class CustomTokenRefreshView(TokenRefreshView):

    def post(self, request, *args, **kwargs):

        try:
            cookie = get_cookie(request)
            post_data = {"refresh": str(cookie['refresh_token'])}

            serializer = self.get_serializer(data=post_data)
            serializer.is_valid(raise_exception=True)

            auth_response = Response(
                serializer.validated_data, status=status.HTTP_200_OK)

            # max_age = 365 * 24 * 60 * 60
            max_age_1day = 24*60*60

            if DEBUG:
                auth_response.set_cookie(
                    "access_token", value=serializer.validated_data['access'], samesite='Lax')
            else:
                auth_response.set_cookie(
                    "access_token", value=serializer.validated_data['access'], max_age=max_age_1day, secure=True, httponly=True, samesite='Lax')

            return auth_response
        except Exception as e:
            print(e)
            return Response(status=401, data='Authorization Error')


@api_view(['GET'])
@permission_classes([AllowAny, ])
@authentication_classes([])
def logout(request):

    auth_response = Response(status=status.HTTP_200_OK)
    auth_response.delete_cookie("access_token")
    auth_response.delete_cookie("refresh_token")
    auth_response.delete_cookie("user_id")
    return auth_response


# class RedirectToLoginView(TemplateView):

#     template_name = 'auth/login.html'


# class SignUpView(FormView):

#     template_name = 'auth/signup.html'
#     form_class = SignUpForm
#     success_url = reverse_lazy('auth:login')

#     def form_valid(self, form):
#         form.save()
#         return super().form_valid(form)


BANNED_NAME = ['Guest']


@api_view(['POST'])
@permission_classes([AllowAny, ])
@authentication_classes([])
def signup(request):

    try:
        post_data = request.data
        email = post_data['email']
        first_name = post_data['first_name']
        password = post_data['password']
        password_confirm = post_data['password_confirm']

        not_able_to_signup = False

        errors = {
            'error': 'Signup failed',
        }

        try:
            password_validation.validate_password(password)
        except ValidationError as e:
            not_able_to_signup = True
            errors['passwordError'] = list(e.messages)

        if password != password_confirm:
            not_able_to_signup = True
            errors['passwordError'] = [
                'Password and password confirmation do not match each other']

        user = CustomUser.objects.filter(email=email)
        if user:
            not_able_to_signup = True
            errors['emailError'] = ['User with the email already exists.']
        else:
            errors['emailError'] = []

        if first_name in BANNED_NAME:
            not_able_to_signup = True
            errors['nameError'] = ['This name is not allowed']
        else:
            errors['nameError'] = []

        if not_able_to_signup:
            raise ValueError()

        new_user = CustomUser.objects.create(
            first_name=first_name,
            email=email,
            username=email,
        )
        new_user.set_password(password)
        new_user.save()
        response = Response(status=201, data='User successfully created!')
        return response
    except Exception as e:
        print(e)
        return Response(status=400, data=errors)


@api_view(['POST'])
@permission_classes([AllowAny, ])
@authentication_classes([])
def google_login(request):

    try:
        post_data = request.data
        token = post_data['id_token']
        idinfo = id_token.verify_oauth2_token(
            token, requests.Request(), GOOGLE_CLIENT_ID)
        email = idinfo['email']
        name = idinfo['name']
        user = CustomUser.objects.filter(email=email)
        if user:
            if user.login_method != GOOGLE:
                raise ValidationError(
                    'Account with this email already exists.')
        else:
            user = CustomUser.objects.create(
                email=email,
                username=email,
                first_name=name,
                login_method=GOOGLE
            )
            user.set_unusable_password()
            user.save()
        refresh = RefreshToken.for_user(user)
        user_id = int(user.id)
        auth_response = Response(status=201, data={'user_id': user_id})

        max_age_1day = 24*60*60
        max_age_54weeks = 54*7*24*60*60

        if DEBUG:
            auth_response.set_cookie(
                "access_token", value=str(refresh.access_token), max_age=max_age_1day, samesite='Lax')
            auth_response.set_cookie(
                "refresh_token", value=str(refresh), max_age=max_age_54weeks, samesite='Lax')
            auth_response.set_cookie(
                "user_id", value=user_id, max_age=max_age_54weeks, samesite='Lax')
        else:
            auth_response.set_cookie(
                "access_token", value=str(refresh.access_token), max_age=max_age_1day, secure=True, httponly=True, samesite='Lax')
            auth_response.set_cookie(
                "refresh_token", value=str(refresh), max_age=max_age_54weeks, secure=True, httponly=True, samesite='Lax')
            auth_response.set_cookie(
                "user_id", value=user_id, max_age=max_age_54weeks, secure=True, httponly=True, samesite='Lax')

        return auth_response
    except Exception as e:
        print(e)
        return Response(status=400, data=json.dumps(str(e)))
