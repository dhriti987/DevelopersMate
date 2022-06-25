from django.urls import path

from chat.views import GetThreadAPIView

urlpatterns = [
    path('get-thread/',GetThreadAPIView.as_view()),
]