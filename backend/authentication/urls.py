from django.urls import path
from authentication.views import (
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
    LogoutView,
    RedirectToLoginView,
    SignUpView
)

app_name = 'auth'

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token'),
    path('refresh/', CustomTokenRefreshView.as_view(), name='refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('redirect-to-login/', RedirectToLoginView.as_view(), name='login'),
    path('signup/', SignUpView.as_view(), name='signup')
]
