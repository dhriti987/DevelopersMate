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
    
    def get_queryset(self,pk=None):
        if pk:
            try:
                return Profile.objects.get(user = pk)
            except:
                return None
        return Profile.objects.get(user = self.request.user)

    def get(self,request):
        pk = request.GET.get('id')
        if pk:
            query=self.get_queryset(pk)
            if not query:
                return Response({'status':'failed'},status=status.HTTP_404_NOT_FOUND)
            
        else:
            query = self.get_queryset()

        serialized_data = self.serializer_class(query)
        return Response(serialized_data.data,status=status.HTTP_200_OK)

    def post(self,request):
        serialized_data = self.serializer_class(data=request.data)
        serialized_data.is_valid(raise_exception=True)
        serialized_data.save()
        return Response(serialized_data.data,status=status.HTTP_201_CREATED)
