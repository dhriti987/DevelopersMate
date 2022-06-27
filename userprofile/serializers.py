from numpy import source
from .models import Education, Experience, Link, Profile, Project, Skill, UserFollowing
from rest_framework import serializers

class SkillSerializer(serializers.ModelSerializer):
    # user_profile = serializers.ModelField(Profile,write_only=True)
    class Meta:
        model = Skill
        fields ="__all__"

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
    followers = serializers.ReadOnlyField(source='total_followers')
    following = serializers.ReadOnlyField(source='total_following')
    is_followed = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = "__all__"

    def create(self, validated_data):
        profile = Profile.objects.create(**validated_data)
        return profile

    def get_is_followed(self,obj):
        request = self.context.get('request')
        if request and hasattr(request,'user'):
            user = request.user
            user_profile = user.profile
            return obj.followers.filter(profile = user_profile).exists()
        else:
            return False

class UserFollowingSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source = 'following_profile.fullname')
    headline = serializers.ReadOnlyField(source = 'following_profile.headline')
    image = serializers.ReadOnlyField(source = 'following_profile.image.url')
    class Meta:
        model = UserFollowing
        fields = ("following_profile",'name','headline','image')

class UserFollowersSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source = 'profile.fullname')
    headline = serializers.ReadOnlyField(source = 'profile.headline')
    image = serializers.ReadOnlyField(source = 'profile.image.url')
    class Meta:
        model = UserFollowing
        fields = ("profile",'name','headline','image')