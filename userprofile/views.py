from rest_framework.response import Response
from rest_framework import generics,status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from userprofile.models import Profile, Skill

from userprofile.serializers import ProfileSerializer, SkillSerializer

# Create your views here.

class ProfileView(generics.GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = ProfileSerializer
    
    def get_queryset(self):
        return Profile.objects.get(user = self.request.user)

    def get(self,request):
        query = self.get_queryset()
        serialized_data = self.serializer_class(query)
        return Response(serialized_data.data,status=status.HTTP_200_OK)

    def post(self,request):
        serialized_data = self.serializer_class(data=request.data)
        serialized_data.is_valid(raise_exception=True)
        serialized_data.save()
        return Response(serialized_data.data,status=status.HTTP_201_CREATED)
