# Generated by Django 3.2 on 2021-05-12 15:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apps', '0005_alter_app_output_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='app',
            name='output_type',
            field=models.CharField(choices=[('application/json', '.json'), ('text/plain', '.txt'), ('text/csv', '.csv'), ('text/markdown', '.md'), ('image/bmp', '.bmp'), ('image/gif', '.gif'), ('image/vnd.microsoft.icon', '.ico'), ('image/jpeg', '.jpg'), ('image/jpeg', '.jpeg'), ('image/png', '.png'), ('image/svg+xml', '.svg'), ('image/tiff', '.tif'), ('image/tiff', '.tiff'), ('image/webp', '.webp'), ('application/pdf', '.pdf')], default='application/json', max_length=30, verbose_name='output_type'),
        ),
    ]