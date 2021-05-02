from django.urls import path
from feedbacks.views import CreateFeedBackView

app_name = 'feedbacks'

urlpatterns = [
    path('create/', CreateFeedBackView.as_view(), name="create")
]
