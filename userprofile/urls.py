from django.urls import path

from userprofile.views import EducationRetriveUpdateDeleteAPIView, EducationView, ProfileView, SkillAPIView, SkillDeleteAPIView

urlpatterns = [
    # path('skill/',SkillView.as_view(), name = 'skill'),
    path('profile/',ProfileView.as_view(),name='Profile'),
    path('education/',EducationView.as_view(),name='Education'),
    path('education/<int:pk>',EducationRetriveUpdateDeleteAPIView.as_view(),name='Education'),
    path('skill/',SkillAPIView.as_view(),name='skill'),
    path('skill/<int:pk>',SkillDeleteAPIView.as_view(),name='skill'),

]