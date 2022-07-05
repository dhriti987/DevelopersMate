from django.urls import path
from .views import (EmailVerifyAPIView, RegisterView,CustomObtainAuthToken)

urlpatterns = [
    path('register/',RegisterView.as_view(),name='register'),
    path('login/',CustomObtainAuthToken.as_view(),name = 'login'),
    path('email-verify/<str:token>',EmailVerifyAPIView.as_view(),name = 'login'),
]