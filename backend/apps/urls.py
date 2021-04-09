from django.urls import path
from apps.views import CreateAppView, ListAppView, RetrieveAppView, UpdateAppView, DeleteAppView

app_name = 'apps'

urlpatterns = [
    path('create/', CreateAppView.as_view(), name='create'),
    path('list/', ListAppView.as_view(), name='list'),
    path('retrieve/', RetrieveAppView.as_view(), name='retrieve'),
    path('update/', UpdateAppView.as_view(), name='update'),
    path('delete/', DeleteAppView.as_view(), name='delete'),
]
