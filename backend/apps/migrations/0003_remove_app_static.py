# Generated by Django 3.2 on 2021-04-19 14:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apps', '0002_app_created_by'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='app',
            name='static',
        ),
    ]
