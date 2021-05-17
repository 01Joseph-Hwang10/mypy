# Generated by Django 3.2.3 on 2021-05-17 13:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FeedBack',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('email', models.CharField(default='anonymous', max_length=50)),
                ('content', models.TextField()),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
