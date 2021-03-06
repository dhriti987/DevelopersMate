from django.db.models import Value
from django.db.models.functions import Concat
from rest_framework.decorators import api_view
from .utils import get_favicon_url, get_news
from rest_framework.response import Response
from rest_framework import generics,status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from userprofile.models import Education, Experience, Link, Profile, Project, Skill, UserFollowing
from userprofile.serializers import (
    EducationSerializer,
    ExperienceSerializer,
    LinkSerializer,
    ProfileSerializer,
    ProjectSerializer,
    SkillSerializer,
    UserFollowersSerializer,
    UserFollowingSerializer
)

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
        try:
            return Profile.objects.get(user = self.request.user)
        except:
            return None

    def get(self,request):
        pk = request.GET.get('id')
        if pk:
            query=self.get_queryset(pk)    
        else:
            query = self.get_queryset()
        if query:
            serialized_data = self.serializer_class(query, context={'request':request})
            return Response(serialized_data.data,status=status.HTTP_200_OK)
        return Response({'status':'failed'},status=status.HTTP_404_NOT_FOUND)

    def post(self,request):
        serialized_data = self.serializer_class(data=request.data, context={'request':request})
        serialized_data.is_valid(raise_exception=True)
        serialized_data.save()
        return Response(serialized_data.data,status=status.HTTP_201_CREATED)
    
    def delete(self,request):
        request.user.delete()
        return Response({'status':'success'},status=status.HTTP_200_OK)
    
    def patch(self,request):
        instance = self.get_queryset()
        serializer_obj = self.serializer_class(instance=instance, data=request.data,partial=True, context={'request':request})
        serializer_obj.is_valid(raise_exception=True)
        serializer_obj.save()
        return Response(serializer_obj.data,status=status.HTTP_201_CREATED)

class EducationView(generics.GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = EducationSerializer

    def get_queryset(self):
        return Education.objects.filter(user_profile = Profile.objects.get(user = self.request.user)) 

    def get(self,request):
        query = self.get_queryset()
        serialized_data = self.serializer_class(query,many=True, context={'request':request})
        return Response(serialized_data.data,status=status.HTTP_200_OK)
    
    def post(self,request):
        serialized_data = self.serializer_class(data=request.data, context={'request':request})
        serialized_data.is_valid(raise_exception=True)
        serialized_data.save()
        return Response(serialized_data.data,status=status.HTTP_201_CREATED)

class EducationRetriveUpdateDeleteAPIView(generics.GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = EducationSerializer

    def get_queryset(self,pk):
        try:
            return Education.objects.get(pk=pk)
        except Education.DoesNotExist:
            return None


    def get(self,request,pk):
        query = self.get_queryset(pk)
        if not query:
            return Response({'status':'failed'},status=status.HTTP_404_NOT_FOUND)
        serialized_data = self.serializer_class(query, context={'request':request})
        return Response(serialized_data.data,status=status.HTTP_200_OK)
    
    def patch(self,request,pk):
        query = self.get_queryset(pk)
        if not query:
            return Response({'status':'failed'},status=status.HTTP_404_NOT_FOUND)
        serializer_obj = self.serializer_class(instance=query,data=request.data,partial=True, context={'request':request})
        serializer_obj.is_valid(raise_exception=True)
        serializer_obj.save()
        return Response(serializer_obj.data,status = status.HTTP_200_OK)
    
    def delete(self,request,pk):
        query = self.get_queryset(pk)
        if not query:
            return Response({'status':'failed'},status=status.HTTP_404_NOT_FOUND)
        query.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class SkillAPIView(generics.GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = SkillSerializer

    def get_queryset(self):
        return Profile.objects.get(user = self.request.user).skills
    
    def get(self,request):
        query = self.get_queryset()
        serialized_data = self.serializer_class(query,many=True)
        return Response(serialized_data.data,status=status.HTTP_200_OK)
    
    def post(self,request):
        try:
            user = Profile.objects.get(user = request.user)
            skill , _ = Skill.objects.get_or_create(skill=request.data.get('skill'))
            skill.save()
            user.skills.add(skill)
            user.save()
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(self.serializer_class(skill).data,status=status.HTTP_200_OK)


class SkillDeleteAPIView(generics.GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self,request,pk):
        try:
            user = Profile.objects.get(user = request.user)
            skill = Skill.objects.get(pk=pk)
            user.skills.remove(skill)
            user.save()
            
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_200_OK)

class LinkAPIView(generics.GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = LinkSerializer

    def get_queryset(self):
        return Link.objects.filter(user_profile = Profile.objects.get(user = self.request.user))

    def get(self,request):
        query = self.get_queryset()
        serialized_data = self.serializer_class(query,many=True, context={'request':request})
        return Response(serialized_data.data,status=status.HTTP_200_OK)
    
    def post(self,request):
        serialized_data = self.serializer_class(data=request.data, context={'request':request})
        serialized_data.is_valid(raise_exception=True)
        serialized_data.save()
        return Response(serialized_data.data,status=status.HTTP_201_CREATED)

class LinkRetriveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = LinkSerializer
    queryset = Link.objects.all()

class ProjectAPIView(generics.GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return Project.objects.filter(user_profile = Profile.objects.get(user = self.request.user))

    def get(self,request):
        query = self.get_queryset()
        serialized_data = self.serializer_class(query,many=True, context={'request':request})
        return Response(serialized_data.data,status=status.HTTP_200_OK)
    
    def post(self,request):
        serialized_data = self.serializer_class(data=request.data, context={'request':request})
        serialized_data.is_valid(raise_exception=True)
        serialized_data.save()
        return Response(serialized_data.data,status=status.HTTP_201_CREATED)

class ProjectRetriveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    
class ExperienceAPIView(generics.GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ExperienceSerializer

    def get_queryset(self):
        return Experience.objects.filter(user_profile = Profile.objects.get(user = self.request.user))

    def get(self,request):
        query = self.get_queryset()
        serialized_data = self.serializer_class(query,many=True, context={'request':request})
        return Response(serialized_data.data,status=status.HTTP_200_OK)
    
    def post(self,request):
        serialized_data = self.serializer_class(data=request.data, context={'request':request})
        serialized_data.is_valid(raise_exception=True)
        serialized_data.save()
        return Response(serialized_data.data,status=status.HTTP_201_CREATED)

class ExperienceRetriveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ExperienceSerializer
    queryset = Experience.objects.all()

class SearchProfile(generics.ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_queryset(self):
        search = self.request.GET.get('query')
        if search:
            return Profile.objects.annotate(
                name = Concat('first_name',Value(' '),'last_name'),
            ).filter(name__istartswith=search).exclude(user = self.request.user)
        return None

class UserFollowersAPIView(generics.GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = UserFollowingSerializer

    def get_queryset(self):
        if self.request.GET.get('following'):
            return Profile.objects.get(pk=self.request.user).following.all()
        return Profile.objects.get(pk=self.request.user).followers.all()
    
    def get_serializer_class(self,data):
        if self.request.GET.get('following'):
            return UserFollowingSerializer(data,many=True, context={'request':self.request})
        return UserFollowersSerializer(data,many=True, context={'request':self.request})

    def post(self,request):
        try:
            data = {'profile':Profile.objects.get(pk= request.user), 'following_profile':Profile.objects.get(user__id=request.data.get('id'))}
            following_obj = UserFollowing.objects.create(**data)
            following_obj.save()
            return Response()
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def get(self,request):
        data = self.get_queryset()
        serializer_obj = self.get_serializer_class(data)
        return Response(serializer_obj.data)
    
    def delete(self,request):
        try:
            id = request.GET.get('id')
            data = UserFollowing.objects.get(profile__user=request.user,following_profile__user__id = id)
            data.delete()
            return Response()
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class ProfileFilterApi(generics.ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_queryset(self):
        skills = self.request.GET.getlist('skills[]')
        country = self.request.GET.get('country')
        data = Profile.objects.exclude(user = self.request.user)
        if skills:
            data = data.filter(skills__skill__in=skills)
        print(data)
        if country:
            data = data.filter(country__iexact = country)
        return data.distinct()

@api_view()
def get_favicon(request):
    url = request.GET.get('url')
    print(url)
    if url:
        try:
            icon_url = get_favicon_url(url)
            print(icon_url)
            return Response({"icon":icon_url})
        except Exception as err:
            return Response({"message":str(err)},status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({"message":"Required Parameter url"},status=status.HTTP_400_BAD_REQUEST)

class NewsAPI(generics.GenericAPIView):
    def get(self, request):
        news = get_news()
        return Response(news)