from django.urls import path

from userprofile.views import (
    EducationRetriveUpdateDeleteAPIView, 
    EducationView, 
    ExperienceAPIView,
    ExperienceRetriveUpdateDeleteAPIView, 
    LinkAPIView, 
    LinkRetriveUpdateDeleteAPIView, 
    ProfileView,
    ProjectAPIView,
    ProjectRetriveUpdateDeleteAPIView, 
    SkillAPIView, 
    SkillDeleteAPIView,
    get_favicon
    )
urlpatterns = [
    # path('skill/',SkillView.as_view(), name = 'skill'),
    path('profile/',ProfileView.as_view(),name='Profile'),
    path('education/',EducationView.as_view(),name='Education'),
    path('education/<int:pk>',EducationRetriveUpdateDeleteAPIView.as_view(),name='Education-details'),
    path('skill/',SkillAPIView.as_view(),name='skill'),
    path('skill/<int:pk>',SkillDeleteAPIView.as_view(),name='skill-details'),
    path('link/',LinkAPIView.as_view(),name = 'Link'),
    path('link/<int:pk>',LinkRetriveUpdateDeleteAPIView.as_view(),name = 'Link-details'),
    path('project/',ProjectAPIView.as_view(),name = "Project"),
    path('project/<int:pk>',ProjectRetriveUpdateDeleteAPIView.as_view(),name = "Project-details"),
    path('experience/',ExperienceAPIView.as_view(),name = 'Experience'),
    path('experience/<int:pk>',ExperienceRetriveUpdateDeleteAPIView.as_view(),name = 'Experience-details'),
    path('icon/',get_favicon,name='Icon'),
]