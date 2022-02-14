from django.urls import path

from userprofile.views import ProfileView

urlpatterns = [
    # path('skill/',SkillView.as_view(), name = 'skill'),
    path('profile/',ProfileView.as_view(),name='Profile'),

]