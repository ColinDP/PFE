from django.db import models

class Tutorial(models.Model):
    title = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=200,blank=False, default='')
    published = models.BooleanField(default=False)

class Qrcode_Establishment(models.Model):
    qrcode_id = models.IntegerField(primary_key = True)
    establishment_id = models.IntegerField()

class Qrcode_Doctor(models.Model):
    qrcode_id = models.IntegerField()
    doctor_id = models.IntegerField()

class Entries_Qrcodes_Client(models.Model):
    qrcode_id = models.IntegerField()
    client_id = models.IntegerField()
    date_time = models.DateTimeField(auto_now=False, auto_now_add=False)

class Establishment(models.Model):
    firstname = models.CharField(max_length=50, blank=False, default='')
    lastname = models.CharField(max_length=50, blank=False, default='')
    telephone = models.CharField(max_length=13, blank=False, default='')
    street_name = models.CharField(max_length=100, blank=False, default='')
    house_number = models.IntegerField()
    postcode = models.CharField(max_length=10, blank=False, default='') 
    tva = models.CharField(max_length=20, blank=False, default='')
    mail = models.CharField(max_length=100, blank=False, default='')
    hashedPassword = models.CharField(max_length=300, blank=False, default='')

class Doctor(models.Model):
    firstname = models.CharField(max_length=50, blank=False, default='')
    lastname = models.CharField(max_length=50, blank=False, default='')
    telephone = models.CharField(max_length=13, blank=False, default='')
    street_name = models.CharField(max_length=100, blank=False, default='')
    house_number = models.IntegerField()
    postcode = models.CharField(max_length=10, blank=False, default='') 
    inami = models.CharField(max_length=20, blank=False, default='')
    mail = models.CharField(max_length=100, blank=False, default='')
    hashedPassword = models.CharField(max_length=300, blank=False, default='')

class Connection(models.Model):
    user_id = models.IntegerField()
    expire_date = models.DateTimeField(auto_now=False, auto_now_add=True)
