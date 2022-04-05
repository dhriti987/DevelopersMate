import os
from django.db import models
from django.dispatch import receiver
from authentication.models import User

def create_path_images(self,filename):
    email = self.user.email.split('@')[0]
    return f'user/images/{email}/{filename}'

def create_path_banner_image(self,filename):
    email = self.user.email.split('@')[0]
    return f'user/banner/{email}/{filename}'

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(to=User,on_delete=models.CASCADE,primary_key=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    headline = models.CharField(max_length=200,null=True)
    image = models.ImageField(upload_to = create_path_images,default = "/user/default.jpg")
    banner = models.ImageField(upload_to = create_path_banner_image, null=True)
    gender = models.CharField(max_length=8)
    country = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    bio = models.TextField(null=True,blank=True)

    def __str__(self):
        return str(self.user)

    @property
    def fullname(self):
        return self.first_name + " " + self.last_name

    @property
    def total_followers(self):
        return self.followers.count()

    @property
    def total_following(self):
        return self.following.count()

class Skill(models.Model):
    skill = models.CharField(max_length=30)
    user_profile = models.ManyToManyField(to=Profile,related_name='skills',blank= True)


class Education(models.Model):
    user_profile = models.ForeignKey(to=Profile,on_delete=models.CASCADE,related_name='education')
    college_name = models.CharField(max_length=150)
    degree = models.CharField(max_length=100,null=True)
    start_year = models.CharField(max_length=5,null=True)
    passing_year = models.CharField(max_length=5,null=True)

class Link(models.Model):
    user_profile = models.ForeignKey(to=Profile,on_delete=models.CASCADE,related_name='links')
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=500,null = True,blank=True)
    link = models.URLField()

class Project(models.Model):
    user_profile = models.ForeignKey(to=Profile,on_delete=models.CASCADE,related_name='projects')
    project_name = models.CharField(max_length=50)
    description = models.CharField(max_length=500,null = True,blank=True)
    project_link = models.URLField()
    live_link = models.URLField(null=True)
    start_date = models.CharField(max_length=20,default='')
    end_date = models.CharField(max_length=20,default='')

class Experience(models.Model):
    user_profile = models.ForeignKey(to=Profile,on_delete=models.CASCADE,related_name='experiences')
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=500,null = True,blank=True)
    employment_type = models.CharField(max_length=50)
    company_name = models.CharField(max_length=50)
    start_date = models.CharField(max_length=20)
    end_date = models.CharField(max_length=20)

class UserFollowing(models.Model):
    profile = models.ForeignKey(Profile, related_name="following",on_delete=models.CASCADE)
    following_profile = models.ForeignKey(Profile, related_name="followers",on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['profile','following_profile'],  name="unique_followers")
        ]

        ordering = ["-created"]

    def __str__(self):
        return f"{self.profile.user.email} follows {self.following_profile.user.email}"

@receiver(models.signals.post_delete,sender=Profile)
def auto_delete_image_on_delete(sender,instance,*args,**kwargs):
    try:
        instance.image.delete(save=False)
        instance.banner.delete(save=False)
    except:
        return

@receiver(models.signals.pre_save,sender=Profile)
def auto_delete_image_on_change(sender,instance,*args,**kwargs):
    if not instance.pk:
        return False

    try:
        old_image = Profile.objects.get(pk=instance.pk).image
        old_banner = Profile.objects.get(pk=instance.pk).banner
    except Profile.DoesNotExist:
        return False

    new_image = instance.image
    new_banner = instance.banner
    try:
        if not old_image == new_image:
            if os.path.isfile(old_image.path):
                os.remove(old_image.path)
        
        if not old_banner == new_banner:
            if os.path.isfile(old_banner.path):
                os.remove(old_banner.path)
        
    except:
        return False
