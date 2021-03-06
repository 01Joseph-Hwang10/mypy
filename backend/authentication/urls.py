from django.urls import path
from authentication.views import (
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
    # RedirectToLoginView,
    # SignUpView,
    logout,
    signup,
    google_login
)

app_name = 'auth'

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token'),
    path('refresh/', CustomTokenRefreshView.as_view(), name='refresh'),
    path('logout/', logout, name='logout'),
    # path('redirect-to-login/', RedirectToLoginView.as_view(), name='login'),
    path('signup/', signup, name='signup'),
    path('signup/google/', google_login, name='signup__google')
]
