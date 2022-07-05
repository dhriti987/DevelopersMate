from django.urls import path

from chat.views import GetThreadAPIView, SetThreadMessageSeenAPI

urlpatterns = [
    path('get-thread/<int:id>',GetThreadAPIView.as_view()),
    path('set-thread-seen/<int:id>',SetThreadMessageSeenAPI.as_view())
]