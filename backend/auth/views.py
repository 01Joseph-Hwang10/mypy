from django.core.checks.messages import DEBUG
from rest_framework import response, generics, status
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from users.serializers import CustomUserSerializer
from users.models import CustomUser
from common.functions import get_cookie


class CustomTokenObtainPairView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            user_id = CustomUser.objects.get(
                username=request.data['username']).id
        except TokenError as e:
            raise InvalidToken(e.args[0])

        auth_response = response.Response(
            data={"user_id": user_id}, status=status.HTTP_200_OK)

        max_age_1day = 24*60*60
        max_age_54weeks = 54*7*24*60*60

        if DEBUG:
            auth_response.set_cookie(
                "access_token", value=serializer.validated_data['access'])
            auth_response.set_cookie(
                "refresh_token", value=serializer.validated_data['refresh'])
            auth_response.set_cookie("user_id", value=user_id)
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

        cookie = get_cookie(request)
        post_data = {"refresh": str(cookie['refresh_token'])}

        serializer = self.get_serializer(data=post_data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        auth_response = response.Response(
            serializer.validated_data, status=status.HTTP_200_OK)

        # max_age = 365 * 24 * 60 * 60
        max_age_1day = 24*60*60

        if DEBUG:
            auth_response.set_cookie(
                "access_token", value=serializer.validated_data['access'])
        else:
            auth_response.set_cookie(
                "access_token", value=serializer.validated_data['access'], max_age=max_age_1day, secure=True, httponly=True, samesite='Lax')

        return auth_response


class LogoutView(generics.RetrieveAPIView):

    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def get(self, request, *args, **kwargs):
        auth_response = response.Response(status=status.HTTP_200_OK)
        auth_response.delete_cookie("access_token")
        auth_response.delete_cookie("refresh_token")
        auth_response.delete_cookie("user_id")
        return auth_response


class SignupView(generics.CreateAPIView):

    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def post(self, request):
        try:
            post_data = request.data
            first_name = post_data['first_name']
            email = post_data['email']
            username = email
            password = post_data['password']
            password_confirm = post_data['passwordConfirm']
            if(password != password_confirm):
                return response.Response(status=400, data='password confirm not match')
            if(CustomUser.objects.filter(email=email).exists()):
                return response.Response(status=400, data='email already used')
            new_object = CustomUser(
                username=username,
                first_name=first_name,
                last_name="",
                email=email,
            )
            new_object.set_password(password)
            new_object.save()
            return response.Response(status=201, data="Signed Up Successfully!")
        except Exception:
            return response.Response(status=500, data="Internal Server Error")
