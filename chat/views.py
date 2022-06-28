from rest_framework.generics import GenericAPIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from chat.models import MessageThread
from .serializers import MessageThreadSerializer
from rest_framework.response import Response
from django.contrib.auth import get_user_model

class GetThreadAPIView(GenericAPIView):
    authentication_classes = [JWTAuthentication]

    def get(self,request,id):
        first_user = request.user
        second_user = get_user_model().objects.get(id = id)
        if first_user.id > second_user.id:
            first_user, second_user = second_user, first_user
        thread, _ = MessageThread.objects.get_or_create(first_user=first_user, second_user=second_user)
        
        return Response(MessageThreadSerializer(thread).data)

class SetThreadMessageSeenAPI(GenericAPIView):
    authentication_classes = [JWTAuthentication]
    def get_queryset(self,id):
        return MessageThread.objects.get(pk=id)

    def put(self,request,id):
        thread = self.get_queryset(id)
        if thread.first_user == request.user:
            thread.first_user_seen = True
        else:
            thread.second_user_seen = True
        thread.save()
        
        return Response()