from django.db import models
import uuid

from userprofile.models import Profile
from datetime import datetime, timedelta

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

    @property
    def time(self):
        now = datetime.now()
        then = self.post_date.replace(tzinfo=None) 
        then+= timedelta(hours=5,minutes = 30)
        interval = now - then
        total_months = ((now.year - then.year)*12 + (now.month-then.month))

        if total_months>=12:
            return "{} years ago".format(total_months//12) if total_months>1 else "1 year ago"
        
        elif total_months>=1:
            return "{} months ago".format(total_months) if total_months>1 else "1 month ago"
        
        elif interval.days:
            return "{} days ago".format(interval.days) if interval.days>1 else "1 day ago"

        elif interval.seconds>=3600:
            interval_hours = interval.seconds//3600
            return f"{interval_hours} hours ago" if interval_hours>1 else "1 hour ago"
        
        elif interval.seconds>=60:
            interval_mins = interval.seconds//60
            return f"{interval_mins} mins ago" if interval_mins>1 else "1 min ago"
        
        return "{} sec ago".format(interval.seconds)

class Like(models.Model):
    post = models.OneToOneField(to=Post,on_delete=models.CASCADE,related_name='likes')
    user_profile = models.ManyToManyField(to=Profile,blank=True)
    
class Comment(models.Model):
    post = models.ForeignKey(to=Post,on_delete=models.CASCADE,related_name='comments')
    user_profile = models.ForeignKey(to=Profile,on_delete=models.CASCADE)
    text = models.TextField()
    date = models.DateTimeField(auto_now=True)
