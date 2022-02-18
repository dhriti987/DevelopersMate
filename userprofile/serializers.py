from .models import Education, Experience, Link, Profile, Project, Skill
from rest_framework import serializers

class SkillSerializer(serializers.ModelSerializer):
    # user_profile = serializers.ModelField(Profile,write_only=True)
    class Meta:
        model = Skill
        fields ="__all__"
        extra_kwargs = {
            'user_profile': {'write_only': True},
        }

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = "__all__"
        # extra_kwargs = {
        #     'user_profile': {'write_only': True},
        # }

class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = "__all__"
        extra_kwargs = {
            'user_profile': {'write_only': True},
        }

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"
        extra_kwargs = {
            'user_profile': {'write_only': True},
        }

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = "__all__"
        extra_kwargs = {
            'user_profile': {'write_only': True},
        }

class ProfileSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True,read_only=True)
    education = EducationSerializer(many=True,read_only=True)
    links = LinkSerializer(many=True,read_only=True)
    projects = ProjectSerializer(many=True,read_only=True)
    experiences = ExperienceSerializer(many=True,read_only=True)
    class Meta:
        model = Profile
        fields = "__all__"

    def create(self, validated_data):
        profile = Profile.objects.create(**validated_data)
        return profile