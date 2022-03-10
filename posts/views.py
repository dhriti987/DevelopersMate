from rest_framework import generics
from authentication.models import User

from posts.models import Comment, Post
from posts.serializers import CommentSerializer, PostSerializer
from userprofile.models import Profile

class PostAPIView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        id = self.request.GET.get('id')
        if id:
            profile = Profile.objects.get(user = User.objects.get(pk = id))
            return self.queryset.filter(posted_by = profile)
        return super().get_queryset()

class PostRetriveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class LikeAPIView(generics.GenericAPIView):
    def post(self,request):
        pass 

class CommentAPIView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    
    def get_queryset(self):
        post_id = self.request.GET.get("id")
        if post_id:
            post_obj = Post.objects.get(post_id = post_id)
            return Comment.objects.filter(post = post_obj)
        return None
    
class CommentRetriveDeleteAPIView(generics.RetrieveDestroyAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
