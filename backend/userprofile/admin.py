from django.contrib import admin

from userprofile.models import (
            Education, Experience, Link,
            Profile, Project, Skill, UserFollowing
            )

# Register your models here.
admin.site.register(Profile)
admin.site.register(Skill)
admin.site.register(Education)
admin.site.register(Experience)
admin.site.register(Link)
admin.site.register(Project)
admin.site.register(UserFollowing)
