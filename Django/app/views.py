from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from django.contrib.auth.models import User
from app.models import Connection, Doctor, Establishment
from app.serializers import ConnectionSerializer, EstablishmentSerializer, DoctorSerializer
from rest_framework.decorators import api_view
from app import parser
import pyqrcode
from pyzbar.pyzbar import decode
from PIL import Image
import base64
from django.contrib.auth import authenticate
from datetime import datetime
from django.shortcuts import get_object_or_404
from django.conf import settings
from cryptography.fernet import Fernet


import uuid



@api_view(['POST'])
def login_request(request):
    request_data = JSONParser().parse(request)
    username = request_data['email']
    password = request_data['password']
    print(password, username)
    print('hey')
    user = authenticate(request, username = username, password = password)
    print(user)
    if user is not None:
        encrypted_id = encrypt(str(user.id))
        connection = {'user_id' : user.id, 'expire_date' : datetime.now()}
        connection_serializer = ConnectionSerializer(data = connection)
        if connection_serializer.is_valid():
            connection_serializer.save()
            try:
                establishment = Establishment.objects.get(pk=user.id)
            except Establishment.DoesNotExist:
                establishment = None
                print('hey')
            if establishment is not None :
                return JsonResponse({'response': 'User Connected', 'token' : encrypted_id, 'role' : 'E'}, status=status.HTTP_200_OK)
            doctor = Doctor.objects.get(pk=user.id)
            if doctor is not None : 
                return JsonResponse({'response': 'User Connected', 'token' : encrypted_id, 'role' : 'D'}, status=status.HTTP_200_OK)
    return JsonResponse({'response': 'Authentification Failed'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def register_establishment(request):
    request_data = JSONParser().parse(request)
    user = User.objects.create_user(request_data['email'], request_data['email'], request_data['password'])
    establishment = {'user_id' : int(user.id),
                     'firstname' : request_data['first_name'],
                     'lastname' : request_data['last_name'],
                     'telephone' : request_data['telephone'],
                     'street_name' : request_data['address_street'],
                     'house_number' : int(request_data['address_number']),
                     'postcode' : request_data['address_postcode'],
                     'tva' : request_data['num_tva'],
                     'mail' : request_data['email']
                    }
    if user is not None: 
        establishment_serializer = EstablishmentSerializer(data = establishment)
        if establishment_serializer.is_valid():
            establishment_serializer.save()
            return JsonResponse({'response': 'User Created'}, status=status.HTTP_201_CREATED) 
        else : 
            return JsonResponse({'response': 'Internal Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
    return JsonResponse({'response': 'Email already used'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register_doctor(request):

    request_data = JSONParser().parse(request)
    user = User.objects.create_user(request_data['email'], request_data['email'], request_data['password'])
    print(user.id)

    doctor =  { 'user_id' : int(user.id),
                'firstname' : request_data['first_name'],
                'lastname' : request_data['last_name'],
                'telephone' : request_data['telephone'],
                'street_name' : request_data['address_street'],
                'house_number' : int(request_data['address_number']),
                'postcode' : request_data['address_postcode'],
                'inami' : request_data['num_inami'],
                'mail' : request_data['email']
            }
    
    doctor_serializer = DoctorSerializer(data = doctor)
    print(doctor_serializer)
    if doctor_serializer.is_valid():
        doctor_serializer.save()
        return JsonResponse({'response': 'User Created'}, status=status.HTTP_201_CREATED) 
    else : 
        return JsonResponse({'response': 'Internal Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
    return JsonResponse({'response': 'Email already used'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def get_qr_code(request):
    request_data = JSONParser().parse(request)
    # token = request_data['token']
    # user_id = int(decrypt(token))
    # connection = get_object_or_404(Connection, user_id = user_id)
    # if connection is not None :
    #     print('working')
    # else :
    #     return JsonResponse({'response': 'User not logged in'}, status=status.HTTP_400_BAD_REQUEST)
    
    # generates n qr_codes
    n_qr_codes = request_data['quantity']
    i = 0
    qr_codes_list = []
    while i < int(n_qr_codes):
        # besoin de générer un fichier pour les médecins et les établissement où se trouve l'id suivant
        #générer id aléatoire
        id
        id = uuid.uuid4()
        #enregistrer cet id dans DB
        qr = pyqrcode.create(id)
        qr.png("testQR.svg",scale=5)
        data = decode(Image.open("testQR.svg"))
        encoded_string =''
        with open("testQR.svg", "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
        qr_codes_list.append(str(encoded_string))
        i = i+1 

    # Toujours besoin de les log en db maintenant

    return JsonResponse({'images': qr_codes_list}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def logout_request(request):
    request_data = JSONParser().parse(request)
    token = request_data['token']
    user_id = int(decrypt(token))
    Connection.objects.filter(user_id = user_id).delete()
    return JsonResponse({'response': 'User logged out'}, status=status.HTTP_200_OK)

def encrypt(txt):
    try:
        txt = str(txt)
        cipher_suite = Fernet(settings.ENCRYPT_KEY)
        encrypted_text = cipher_suite.encrypt(txt.encode('ascii'))
        encrypted_text = base64.urlsafe_b64encode(encrypted_text).decode("ascii") 
        return encrypted_text
    except Exception as e:
        print('error :', e.message)
        return None

def decrypt(string):
    try:
        text = base64.urlsafe_b64decode(string)
        cipher_suite = Fernet(settings.ENCRYPT_KEY)
        decoded_text = cipher_suite.decrypt(text).decode("ascii")     
        return decoded_text
    except Exception as e:
        print('error :', e.message)
        return None

#Generate an unique id for the devices
@api_view(['GET'])
def get_device_id(request):
    id = uuid.uuid4()
    return JsonResponse({'device_id' : id})