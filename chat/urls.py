from django.urls import path

from chat.views import GetThreadAPIView

urlpatterns = [
    path('get-thread/<int:id>',GetThreadAPIView.as_view()),
]