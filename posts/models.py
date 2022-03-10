from django.db import models
import uuid

from userprofile.models import Profile

def create_path_image(self,filename):
    email = self.posted_by.user.email.split('@')[0]
    return f'user/posts/images/{email}/{filename}'

class Post(models.Model):
    post_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        )
    posted_by = models.ForeignKey(to=Profile,on_delete=models.CASCADE,related_name='posts')
    image = models.ImageField(upload_to=create_path_image,null=True)
    text = models.TextField(blank=True,null=True)
    post_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-post_date',)

class Like(models.Model):
    post = models.OneToOneField(to=Post,on_delete=models.CASCADE,related_name='likes')
    user_profile = models.ManyToManyField(to=Profile,blank=True)
    
class Comment(models.Model):
    post = models.ForeignKey(to=Post,on_delete=models.CASCADE,related_name='comments')
    user_profile = models.ForeignKey(to=Profile,on_delete=models.CASCADE)
    text = models.TextField()
    date = models.DateTimeField(auto_now=True)
