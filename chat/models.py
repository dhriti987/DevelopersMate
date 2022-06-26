from django.db import models
from django.contrib.auth import get_user_model
from django.db.models import Q

User = get_user_model()

class MessageThreadManager(models.Manager):
    def by_user(self, **kwargs):
        user = kwargs.get('user')
        lookup = Q(first_user = user) | Q(second_user = user)
        queryset = self.get_queryset().filter(lookup).distinct()
        return queryset

# Create your models here.
class MessageThread(models.Model):
    first_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='thread_first_user')
    second_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='thread_second_user')

    created_at = models.DateTimeField(auto_now_add=True)

    objects = MessageThreadManager()
    class Meta:
        unique_together = ['first_user', 'second_user']

class Message(models.Model):
    thread = models.ForeignKey(MessageThread, on_delete=models.CASCADE, related_name='messages')
    sent_by = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('timestamp',)
