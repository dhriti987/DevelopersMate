from numpy import source
from rest_framework import serializers
from .models import Comment, Like, Post

class PostSerializer(serializers.ModelSerializer):
    post_date = serializers.DateTimeField(format="%d/%b/%y %H:%M:%S",read_only = True)
    user = serializers.ReadOnlyField(source='posted_by.fullname')
    user_image = serializers.ReadOnlyField(source = 'posted_by.image.url')
    time_interval = serializers.ReadOnlyField(source = 'time')
    class Meta:
        model = Post
        fields = "__all__"
    
class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user_profile.fullname')
    class Meta:
        model = Comment
        fields = "__all__"
    