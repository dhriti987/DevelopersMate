from rest_framework import generics

from posts.models import Comment, Post
from posts.serializers import PostSerializer

class PostAPIView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostRetriveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class LikeAPIView(generics.GenericAPIView):
    def post(self,request):
        pass 

class CommentAPIView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    
    def get_queryset(self):
        post_id = self.request.GET.get("id")
        post_obj = Post.objects.get(post_id = post_id)
        return Comment.objects.filter(post = post_obj)
