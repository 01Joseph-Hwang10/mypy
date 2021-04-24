from django.urls import path
from users.views import UpdateImportsView, RetrieveUserView

app_name = 'users'

urlpatterns = [
    path('update/imports/', UpdateImportsView.as_view(), name='update__imports'),
    path('retrieve/user/<int:pk>/',
         RetrieveUserView.as_view(), name='retrieve__user')
]
