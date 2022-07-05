from django.urls import path

from posts.views import CommentAPIView, CommentRetriveDeleteAPIView, LikeAPIView, PostAPIView, PostRetriveUpdateDeleteAPIView

urlpatterns = [
    path('posts/',PostAPIView.as_view()),
    path('posts/<uuid:pk>',PostRetriveUpdateDeleteAPIView.as_view()),
    path('comments/',CommentAPIView.as_view()),
    path('comments/<int:pk>',CommentRetriveDeleteAPIView.as_view()),
    path('like/<uuid:pk>',LikeAPIView.as_view()),
]