from django.urls import path

from posts.views import PostAPIView, PostRetriveUpdateDeleteAPIView

urlpatterns = [
    path('posts/',PostAPIView.as_view()),
    path('posts/<uuid:pk>',PostRetriveUpdateDeleteAPIView.as_view()),
]