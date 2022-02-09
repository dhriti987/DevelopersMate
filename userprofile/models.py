from django.db import models
from matplotlib.pyplot import title
from authentication.models import User

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(to=User,on_delete=models.CASCADE,primary_key=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    image = models.ImageField(upload_to = "/user",default = "/user/default.png")
    gender = models.CharField(max_length=8)
    country = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    bio = models.TextField(null=True,blank=True)

class Skill(models.Model):
    skill = models.CharField(max_length=30)
    user_profile = models.ManyToManyField(to=Profile)


class Education(models.Model):
    user_profile = models.ForeignKey(to=Profile,on_delete=models.CASCADE)
    college_name = models.CharField(max_length=150)
    degree = models.CharField(max_length=20,null=True)
    start_year = models.CharField(max_length=5,null=True)
    passing_year = models.CharField(max_length=5,null=True)

class Link(models.Model):
    user_profile = models.ForeignKey(to=Profile,on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=500,null = True)
    link = models.URLField()

class Project(models.Model):
    user_profile = models.ForeignKey(to=Profile,on_delete=models.CASCADE)
    project_name = models.CharField(max_length=50)
    description = models.CharField(max_length=500,null = True)
    project_link = models.URLField()
    live_link = models.URLField(null=True)

class Experience(models.Model):
    user_profile = models.ForeignKey(to=Profile,on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=500,null = True)
    employment_type = models.CharField(max_length=50)
    company_name = models.CharField(max_length=50)
    start_date = models.CharField(max_length=10)
    end_date = models.CharField(max_length=10)

