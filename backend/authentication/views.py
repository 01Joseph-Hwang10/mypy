from django.core.checks.messages import DEBUG
from django.urls import reverse_lazy
from django.views.generic import FormView, TemplateView
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from users.serializers import CustomUserSerializer
from users.models import CustomUser
from common.functions import get_cookie
from authentication.forms import SignUpForm


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

        auth_response = Response(
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
        auth_response = Response(status=status.HTTP_200_OK)
        auth_response.delete_cookie("access_token")
        auth_response.delete_cookie("refresh_token")
        auth_response.delete_cookie("user_id")
        return auth_response


class RedirectToLoginView(TemplateView):

    template_name = 'auth/login.html'


class SignUpView(FormView):

    template_name = 'auth/signup.html'
    form_class = SignUpForm
    success_url = reverse_lazy('auth:login')
