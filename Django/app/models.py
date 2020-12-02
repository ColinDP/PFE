from django.db import models

class Tutorial(models.Model):
    title = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=200,blank=False, default='')
    published = models.BooleanField(default=False)

class Qrcode_Establishment(models.Model):
    qrcode_id = models.IntegerField()
    establishment_id = models.IntegerField()

class Qrcode_Doctor(models.Model):
    qrcode_id = models.IntegerField()
    doctor_id = models.IntegerField()

class Entries_Qrcodes_Client(models.Model):
    qrcode_id = models.IntegerField()
    client_id = models.IntegerField()
    date_time = models.DateTimeField(auto_now=False, auto_now_add=False)

class Establishment(models.Model):
    mail = models.CharField(max_length=300, blank=False, default='')
    hashedPassword = models.CharField(max_length=300, blank=False, default='')

class Doctor(models.Model):
    mail = models.CharField(max_length=300, blank=False, default='')
    hashedPassword = models.CharField(max_length=300, blank=False, default='')

class User(models.Model):
    mail = models.CharField(max_length=300, blank=False, default='')
    hashedPassword = models.CharField(max_length=300, blank=False, default='')
