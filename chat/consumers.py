from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from .models import MessageThread, Message
from .serializers import MessageThreadSerializer, MessageSerializer

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']

        self.chat_room = f'chat_room_{self.user.id}'
        
        await self.channel_layer.group_add(
            self.chat_room,
            self.channel_name
        )
        threads = await self.get_all_threads()
        serializer_obj = await self.create_serializer_object(threads)
        await self.accept()

        await self.send(
            text_data= json.dumps(serializer_obj)
        )

    async def receive(self, text_data=None, bytes_data=None):
        event = json.loads(text_data)
        message = event.get('message')

        thread_id = event.get('thread_id')
        thread = await self.get_thread(thread_id)
        
        other_user_chatroom = await self.get_other_user_chatroom(thread)
        
        response = await self.save_message(message,thread)

        await self.channel_layer.group_send(
            other_user_chatroom,
            {
                "type":"chat_message",
                "text":json.dumps(response),
            }
        )
        await self.channel_layer.group_send(
            self.chat_room,
            {
                "type":"chat_message",
                "text":json.dumps(response),
            }
        )
    
    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.chat_room,
            self.channel_name
        )
        return await super().disconnect(code)

    async def chat_message(self,event):
        text = event['text']
        await self.send(text_data=text)

    @database_sync_to_async
    def get_all_threads(self):
        return MessageThread.objects.by_user(user = self.scope['user'])

    @database_sync_to_async
    def get_thread(self, thread_id):
        return MessageThread.objects.get(id = thread_id)
    
    @database_sync_to_async
    def get_user(self, username):
        try:
            return User.objects.get(username=username)
        except:
            return AnonymousUser()
            
    @database_sync_to_async
    def save_message(self, message, thread):
        user = self.scope['user']
        msg_obj =  Message.objects.create(thread = thread, sent_by= user, message = message)
        return MessageSerializer(msg_obj).data
    
    @sync_to_async
    def create_serializer_object(self, threads):
        return MessageThreadSerializer(threads,many=True).data


    @sync_to_async
    def get_other_user_chatroom(self, thread):
        if thread.first_user == self.user:
            return f'chat_room_{thread.second_user.id}'
        else:
            return f'chat_room_{thread.first_user.id}'

