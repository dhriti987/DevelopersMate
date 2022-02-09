from django.urls import path
from .views import (RegisterView,CustomObtainAuthToken)

urlpatterns = [
    path('register/',RegisterView.as_view(),name='register'),
    path('login/',CustomObtainAuthToken.as_view(),name = 'login')
]