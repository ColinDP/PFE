# Generated by Django 3.1.3 on 2020-12-05 15:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Connection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.IntegerField()),
                ('expire_date', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('user_id', models.IntegerField(primary_key=True, serialize=False)),
                ('firstname', models.CharField(default='', max_length=50)),
                ('lastname', models.CharField(default='', max_length=50)),
                ('telephone', models.CharField(default='', max_length=13)),
                ('street_name', models.CharField(default='', max_length=100)),
                ('house_number', models.IntegerField()),
                ('postcode', models.CharField(default='', max_length=10)),
                ('inami', models.CharField(default='', max_length=20)),
                ('mail', models.CharField(default='', max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Establishment',
            fields=[
                ('user_id', models.IntegerField(primary_key=True, serialize=False)),
                ('firstname', models.CharField(default='', max_length=50)),
                ('lastname', models.CharField(default='', max_length=50)),
                ('telephone', models.CharField(default='', max_length=13)),
                ('street_name', models.CharField(default='', max_length=100)),
                ('house_number', models.IntegerField()),
                ('postcode', models.CharField(default='', max_length=10)),
                ('tva', models.CharField(default='', max_length=20)),
                ('mail', models.CharField(default='', max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Phones',
            fields=[
                ('phone_id', models.CharField(max_length=50, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Tutorial',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='', max_length=70)),
                ('description', models.CharField(default='', max_length=200)),
                ('published', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Qrcode_Establishment',
            fields=[
                ('qrcode_id', models.CharField(default='', max_length=100, primary_key=True, serialize=False)),
                ('establishment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.establishment')),
            ],
        ),
        migrations.CreateModel(
            name='Qrcode_Doctor',
            fields=[
                ('qrcode_id', models.CharField(default='', max_length=100, primary_key=True, serialize=False)),
                ('used', models.BooleanField()),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.doctor')),
            ],
        ),
        migrations.CreateModel(
            name='Entries_Scans',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qrcode_id', models.CharField(default='', max_length=100)),
                ('date_time', models.DateTimeField()),
                ('phone_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.phones')),
            ],
        ),
    ]
