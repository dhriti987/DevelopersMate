# Generated by Django 3.2.10 on 2022-02-21 17:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0006_profile_headline'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='end_date',
            field=models.CharField(default='', max_length=20),
        ),
        migrations.AddField(
            model_name='project',
            name='start_date',
            field=models.CharField(default='', max_length=20),
        ),
        migrations.AlterField(
            model_name='experience',
            name='end_date',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='experience',
            name='start_date',
            field=models.CharField(max_length=20),
        ),
    ]
