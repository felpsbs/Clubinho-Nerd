# Generated by Django 2.1.5 on 2019-01-28 17:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0007_lesson_material'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='slug',
            field=models.SlugField(max_length=100, unique=True, verbose_name='Atalho'),
        ),
    ]
