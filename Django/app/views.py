from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from django.contrib.auth.models import User
from app.models import Connection
from app.serializers import ConnectionSerializer
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
    login_data = JSONParser().parse(request)
    username = login_data['email']
    password = login_data['password']
    user = authenticate(request, username = username, password = password)
    if user is not None:
        encrypted_id = encrypt(str(user.id))
        connection = {'user_id' : user.id, 'expire_date' : datetime.now()}
        connection_serializer = ConnectionSerializer(data = connection)
        if connection_serializer.is_valid():
            connection_serializer.save()
            return JsonResponse({'response': 'User Connected', 'token' : encrypted_id}, status=status.HTTP_200_OK)
    return JsonResponse({'response': 'Authentification Failed'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def register(request):
    register_data = JSONParser().parse(request)
    user = User.objects.create_user(register_data['email'], register_data['email'], register_data['password'])
    if user is not None: 
        return JsonResponse({'response': 'User Created'}, status=status.HTTP_201_CREATED) 
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
        qr = pyqrcode.create(1)
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
    User.objects.get(pk=4).is_authenticated = False
    print(User.objects.get(pk=4).is_authenticated)
    logout(request)
    
    return JsonResponse({'image': 'User logged out'}, status=status.HTTP_201_CREATED)

def encrypt(txt):
    try:
        # convert integer etc to string first
        txt = str(txt)
        # get the key from settings
        cipher_suite = Fernet(settings.ENCRYPT_KEY) # key should be byte
        # #input should be byte, so convert the text to byte
        encrypted_text = cipher_suite.encrypt(txt.encode('ascii'))
        # encode to urlsafe base64 format
        encrypted_text = base64.urlsafe_b64encode(encrypted_text).decode("ascii") 
        return encrypted_text
    except Exception as e:
        # log the error if any
        logging.getLogger("error_logger").error(traceback.format_exc())
        return None

def decrypt(string):
    try:
        # base64 decode
        txt = base64.urlsafe_b64decode(txt)
        cipher_suite = Fernet(settings.ENCRYPT_KEY)
        decoded_text = cipher_suite.decrypt(txt).decode("ascii")     
        return decoded_text
    except Exception as e:
        # log the error
        logging.getLogger("error_logger").error(traceback.format_exc())
        return None

#Marc
#Generate an unique id for the devices
@api_view(['GET'])
def get_device_id(request):
    id = uuid.uuid4()
    return JsonResponse({'device_id' : id})