# Generated by Django 3.2 on 2021-04-24 15:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apps', '0003_remove_app_static'),
        ('users', '0002_customuser_imported'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='imported',
            field=models.ManyToManyField(blank=True, related_name='user', to='apps.App'),
        ),
    ]
