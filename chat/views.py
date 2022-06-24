from rest_framework.generics import GenericAPIView
from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from chat.models import MessageThread
from .serializers import MessageThreadSerializer
from rest_framework.response import Response

class GetThreadAPIView(GenericAPIView):
    authentication_classes = [JWTAuthentication]

    def get(self,request,name):
        first_user = request.user
        second_user = User.objects.get(username = name)
        if first_user.id > second_user.id:
            first_user, second_user = second_user, first_user
        thread, _ = MessageThread.objects.get_or_create(first_user=first_user, second_user=second_user)
        
        return Response(MessageThreadSerializer(thread).data)