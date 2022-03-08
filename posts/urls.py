from django.urls import path

from posts.views import PostAPIView

urlpatterns = [
    path('posts/',PostAPIView.as_view()),
]