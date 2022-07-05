from django.contrib import admin
from .models import Message, MessageThread
# Register your models here.

admin.site.register(Message)

class ChatMessage(admin.TabularInline):
    model = Message

class MessageThreadAdmin(admin.ModelAdmin):
    inlines = [ChatMessage]
    class Meta:
        model = MessageThread
    
admin.site.register(MessageThread, MessageThreadAdmin)