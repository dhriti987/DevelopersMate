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
    image = models.ImageField(upload_to = create_path_images,default = "/user/default.jpg")
    banner = models.ImageField(upload_to = create_path_banner_image, null=True)
    gender = models.CharField(max_length=8)
    country = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    bio = models.TextField(null=True,blank=True)

    def __str__(self):
        return str(self.user)

class Skill(models.Model):
    skill = models.CharField(max_length=30)
    user_profile = models.ManyToManyField(to=Profile,related_name='skills')


class Education(models.Model):
    user_profile = models.ForeignKey(to=Profile,on_delete=models.CASCADE,related_name='education')
    college_name = models.CharField(max_length=150)
    degree = models.CharField(max_length=20,null=True)
    start_year = models.CharField(max_length=5,null=True)
    passing_year = models.CharField(max_length=5,null=True)

class Link(models.Model):
    user_profile = models.ForeignKey(to=Profile,on_delete=models.CASCADE,related_name='links')
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=500,null = True)
    link = models.URLField()

class Project(models.Model):
    user_profile = models.ForeignKey(to=Profile,on_delete=models.CASCADE,related_name='projects')
    project_name = models.CharField(max_length=50)
    description = models.CharField(max_length=500,null = True)
    project_link = models.URLField()
    live_link = models.URLField(null=True)

class Experience(models.Model):
    user_profile = models.ForeignKey(to=Profile,on_delete=models.CASCADE,related_name='experiences')
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=500,null = True)
    employment_type = models.CharField(max_length=50)
    company_name = models.CharField(max_length=50)
    start_date = models.CharField(max_length=10)
    end_date = models.CharField(max_length=10)

@receiver(models.signals.post_delete,sender=Profile)
def auto_delete_image_on_delete(sender,instance,*args,**kwargs):
    try:
        instance.image.delete(save=False)
    except:
        return

@receiver(models.signals.pre_save,sender=Profile)
def auto_delete_image_on_change(sender,instance,*args,**kwargs):
    if not instance.pk:
        return False

    try:
        old_file = Profile.objects.get(pk=instance.pk).image
    except Profile.DoesNotExist:
        return False

    new_file = instance.image
    try:
        if not old_file == new_file:
            if os.path.isfile(old_file.path):
                os.remove(old_file.path)
    except:
        return False
