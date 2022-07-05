from rest_framework import serializers
from .models import Comment, Like, Post

class PostSerializer(serializers.ModelSerializer):
    post_date = serializers.DateTimeField(format="%d/%b/%y %H:%M:%S",read_only = True)
    user = serializers.ReadOnlyField(source='posted_by.fullname')
    user_image = serializers.ReadOnlyField(source = 'posted_by.image.url')
    time_interval = serializers.ReadOnlyField(source = 'time')
    total_likes = serializers.ReadOnlyField(source = 'no_of_likes')
    total_comments = serializers.ReadOnlyField(source = 'no_of_comments')
    is_liked = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = "__all__"

    def get_is_liked(self,obj):
        user =  self.context['request'].user
        try:
            for profile in obj.likes.user_profile.all():
                if profile.user == user:
                    return True
            else:
                return False 
        except:
            return False
    
class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user_profile.fullname')
    user_image = serializers.ReadOnlyField(source = 'user_profile.image.url')
    time_interval = serializers.ReadOnlyField(source = 'time')
    class Meta:
        model = Comment
        fields = "__all__"
    