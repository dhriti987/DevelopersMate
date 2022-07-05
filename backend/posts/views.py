from django.shortcuts import get_object_or_404
from rest_framework import generics
from authentication.models import User
from rest_framework.response import Response
from rest_framework import status
from posts.models import Comment, Like, Post
from posts.serializers import CommentSerializer, LikeSerializer, PostSerializer
from userprofile.models import Profile
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

class PostAPIView(generics.ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        id = self.request.GET.get('id')
        if id:
            profile = Profile.objects.get(user = User.objects.get(pk = id))
            return self.queryset.filter(posted_by = profile)
        return super().get_queryset()

class PostRetriveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class LikeAPIView(generics.GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get_serializer_class(self):
        return LikeSerializer

    def post(self,request,pk):
        post_obj = get_object_or_404(Post,post_id=pk)
        like_obj, _ = Like.objects.get_or_create(post = post_obj)
        profile_obj = Profile.objects.get(user = request.user)
        like_obj.user_profile.add(profile_obj)
        like_obj.save()
        return Response()
    
    def delete(self,request,pk):
        like_obj = get_object_or_404(Like,post = pk)
        try:
            profile_obj = Profile.objects.get(user = request.user)
            like_obj.user_profile.remove(profile_obj)
            like_obj.save()
            return Response()
        except:
            Response(status=status.HTTP_400_BAD_REQUEST)
        
class CommentAPIView(generics.ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer
    
    def get_queryset(self):
        post_id = self.request.GET.get("id")
        try:
            post_obj = Post.objects.get(post_id = post_id)
            return Comment.objects.filter(post = post_obj)
        except:
            return None
    
class CommentRetriveDeleteAPIView(generics.RetrieveDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
