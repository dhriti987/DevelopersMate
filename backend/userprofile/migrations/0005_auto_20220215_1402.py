# Generated by Django 3.2.10 on 2022-02-15 08:32

from django.db import migrations, models
import userprofile.models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0004_auto_20220214_1248'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='banner',
            field=models.ImageField(null=True, upload_to=userprofile.models.create_path_banner_image),
        ),
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(default='/user/default.jpg', upload_to=userprofile.models.create_path_images),
        ),
    ]
