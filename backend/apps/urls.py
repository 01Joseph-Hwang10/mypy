from django.urls import path
from apps.views import CreateAppView

app_name = 'apps'

urlpatterns = [
    path('create/', CreateAppView.as_view(), name='create'),
]
