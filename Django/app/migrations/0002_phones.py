# Generated by Django 3.1.3 on 2020-12-04 16:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Phones',
            fields=[
                ('phone_id', models.CharField(max_length=50, primary_key=True, serialize=False)),
            ],
        ),
    ]
