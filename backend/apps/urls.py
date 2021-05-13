from django.urls import path
from apps.views import (
    CreateAppView,
    ListAppView,
    UpdateAppView,
    DeleteAppView,
    RetrieveAppView,
    SelectedListAppView,
    UpdateInputSpecView
)

app_name = 'apps'

urlpatterns = [
    path('create/', CreateAppView.as_view(), name='create'),
    path('list/', ListAppView.as_view(), name='list'),
    path('list/selected/', SelectedListAppView.as_view(), name='list__selected'),
    path('retrieve/', RetrieveAppView.as_view(), name='retrieve'),
    path('update/app-spec/', UpdateAppView.as_view(), name='update__app-spec'),
    path('update/input-spec/', UpdateInputSpecView.as_view(),
         name='update__input-spec'),
    path('delete/', DeleteAppView.as_view(), name='delete'),
]
