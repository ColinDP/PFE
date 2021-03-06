from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from django.contrib.auth.models import User
from app.models import Connection, Doctor, Establishment,Qrcode_Doctor, Qrcode_Establishment, Entries_Scans, Phones
from app.serializers import ConnectionSerializer, EstablishmentSerializer, DoctorSerializer, Qrcode_DoctorSerializer, Qrcode_EstablishmentSerializer, Entries_ScansSerializer, PhonesSerializer
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
import pytz

from datetime import datetime, timedelta 

utc=pytz.UTC

@api_view(['POST'])
def login_request(request):
    request_data = JSONParser().parse(request)
    username = request_data['email']
    password = request_data['password']
    user = authenticate(request, username = username, password = password)
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
            if establishment is not None :
                return JsonResponse({'response': 'User Connected', 'token' : encrypted_id, 'role' : 'E'}, status=status.HTTP_200_OK)
            doctor = Doctor.objects.get(pk=user.id)
            if doctor is not None : 
                return JsonResponse({'response': 'User Connected', 'token' : encrypted_id, 'role' : 'D'}, status=status.HTTP_200_OK)
    return JsonResponse({'response': 'Authentification Failed'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def register_establishment(request):
    request_data = JSONParser().parse(request)
    try:
        user = User.objects.create_user(request_data['email'], request_data['email'], request_data['password'])
    except : 
        return JsonResponse({'response': 'Email already used'}, status=status.HTTP_400_BAD_REQUEST)
    establishment = {'user_id' : int(user.id),
                     'name' : request_data['name'],
                     'telephone' : request_data['telephone'],
                     'street_name' : request_data['address_street'],
                     'house_number' : int(request_data['address_number']),
                     'postcode' : request_data['address_postcode'],
                     'tva' : request_data['num_tva'],
                     'mail' : request_data['email']
                    }
    establishment_serializer = EstablishmentSerializer(data = establishment)
    if establishment_serializer.is_valid():
        establishment_serializer.save()
        return JsonResponse({'response': 'User Created'}, status=status.HTTP_201_CREATED) 
    else : 
        return JsonResponse({'response': 'Email already used'}, status=status.HTTP_400_BAD_REQUEST) 

@api_view(['POST'])
def register_doctor(request):
    request_data = JSONParser().parse(request)
    try:
        user = User.objects.create_user(request_data['email'], request_data['email'], request_data['password'])
    except:
        return JsonResponse({'response': 'Email already used'}, status=status.HTTP_400_BAD_REQUEST)     
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
    if doctor_serializer.is_valid():
        doctor_serializer.save()
        return JsonResponse({'response': 'User Created'}, status=status.HTTP_201_CREATED) 
    else : 
        return JsonResponse({'response': 'Email already used'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def get_qr_code(request):
    request_data = JSONParser().parse(request)
    token = request_data['token']
    user_id = int(decrypt(token))
    try:
        connection = Connection.objects.filter(user_id = user_id)
    except :
        return JsonResponse({'response': 'User not logged in'}, status=status.HTTP_400_BAD_REQUEST)
    
    # generates n qr_codes
    n_qr_codes = request_data['quantity']
    role = request_data['role']
    names = request_data['names']
    cname = ""
    names_split = names.split(',')
    if (names !="") &(len(names_split) != int(n_qr_codes)) :
        return JsonResponse({'response': 'If you want to enter names, you need to enter one for each qr code'}, status=status.HTTP_400_BAD_REQUEST)
    
    i = 0
    qr_codes_list = []
    while i < int(n_qr_codes):
        #générer id aléatoire
        qr_code_id = uuid.uuid4()
        if role == 'E':
            # Generates an establishement qr_code
            qr_code_id_role = '0' + str(qr_code_id)
            
            if names != "":
                cname = names_split[i]
                qr_code = {'qrcode_id' : qr_code_id_role, 'establishment' : user_id, 'nb_scans' : 0, 'name' : names_split[i]}
            else :
                name = 'Code QR' + str(i+1)
                cname =  name 
                qr_code = {'qrcode_id' : qr_code_id_role, 'establishment' : user_id, 'nb_scans' : 0, 'name' : name}
            qr_code_serializer = Qrcode_EstablishmentSerializer(data = qr_code)
        else :
            # Generates a doctor qr_code
            qr_code_id_role = '1' + str(qr_code_id)
            qr_code = {'qrcode_id' : qr_code_id_role, 'doctor' : user_id, 'used' : False}
            qr_code_serializer = Qrcode_DoctorSerializer(data = qr_code)
        # Saves the qr_code to the DB 
        if qr_code_serializer.is_valid():
            qr_code_serializer.save()
        else : 
            return JsonResponse({'response': 'The data has an invalid format and can not be added to DB'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        qr = pyqrcode.create(str(qr_code_id_role))
        qr.png("testQR.svg",scale=5)
        data = decode(Image.open("testQR.svg"))
        encoded_string =''
        with open("testQR.svg", "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
        qr_codes_list.append({'image': str(encoded_string), 'name': cname})
        i = i+1
    return JsonResponse({"data":qr_codes_list}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def logout_request(request):
    request_data = JSONParser().parse(request)
    token = request_data['token']
    user_id = int(decrypt(token))
    Connection.objects.filter(user_id = user_id).delete()
    return JsonResponse({'response': 'User logged out'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def handle_scanned_request(request):
    register_data = JSONParser().parse(request)
    qr_code = register_data["QRCodeContent"]
    phone_id = register_data["phoneId"]
    scan_date = utc.localize(datetime.now())
    qr_code_db = None
    if(qr_code[0]=='1'):
        qr_code_db = Qrcode_Doctor.objects.get(pk = qr_code)
        if qr_code_db is None:
            return JsonResponse({'code': 0, 'error': 'Qr_code does not exist'}, status=200)
        if qr_code_db.used == True:
            return JsonResponse({'code': 1, 'error': 'Qr_code already scanned'}, status=200)
        qr_code_db.used = True
        qr_code_db.save()
        phone = Phones.objects.get(pk = phone_id)
        phone.sickness_date = utc.localize(datetime.now())
        phone.save()
    else :
        qr_code_db = Qrcode_Establishment.objects.get(pk = qr_code)
        if qr_code_db is None:
            return JsonResponse({'code': 0, 'error': 'Qr_code does not exist'}, status=200)
        qr_code_db.nb_scans = qr_code_db.nb_scans + 1
        qr_code_db.save()
    entry_scan = {'qrcode_id' : qr_code, 'phone' : phone_id, 'date_time' : scan_date}
    scan_serializer = Entries_ScansSerializer(data = entry_scan)
    if scan_serializer.is_valid() :
        scan_serializer.save()
        return JsonResponse({'code': 2}, status=200)
    return JsonResponse({'code': 0, 'error': 'Bad request'}, status=200)



@api_view(['POST'])
def get_qr_list(request):
    request_data = JSONParser().parse(request)
    token = request_data['token']
    user_id = int(decrypt(token))
    try:       
        connection = Connection.objects.filter(user_id = user_id)
    except:
        return JsonResponse({'response': 'User not logged in'}, status=status.HTTP_400_BAD_REQUEST)

    qr_code_db_count = Qrcode_Establishment.objects.filter(establishment=user_id).count()
    qr_codes_list = []
    
    for qr_code_db_img in Qrcode_Establishment.objects.filter(establishment=user_id).all():
        qr = pyqrcode.create(str(qr_code_db_img.qrcode_id))
        qr.png("testQR.png",scale=5)
        data = decode(Image.open("testQR.png"))
        encoded_string =''
        with open("testQR.png", "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
        qr_codes_list.append({'image': str(encoded_string),'count':qr_code_db_img.nb_scans,'name': qr_code_db_img.name})
        
    return JsonResponse({'data' : qr_codes_list}, status=status.HTTP_201_CREATED)

def encrypt(txt):
    txt = str(txt)
    cipher_suite = Fernet(settings.ENCRYPT_KEY)
    encrypted_text = cipher_suite.encrypt(txt.encode('ascii'))
    encrypted_text = base64.urlsafe_b64encode(encrypted_text).decode("ascii") 
    return encrypted_text

def decrypt(string):
    text = base64.urlsafe_b64decode(string)
    cipher_suite = Fernet(settings.ENCRYPT_KEY)
    decoded_text = cipher_suite.decrypt(text).decode("ascii")     
    return decoded_text

#Generate an unique id for the devices
@api_view(['GET'])
def get_device_id(request):
    id = uuid.uuid4()
    return JsonResponse({'device_id' : id})

# codes renvoyés : 0 error, 1 welcome, 2 vous etes safe, 3 vous etes danger
@api_view(['POST'])
def handle_app_launched(request):
    request_data = JSONParser().parse(request)
    req_phone_id = request_data['id']
    if(req_phone_id is not None): 
        try:
            expositions_count = 0
            checked_phones = []
            for this_phone_scan in Entries_Scans.objects.filter(phone_id = req_phone_id):
                if (this_phone_scan.date_time > utc.localize(datetime.now() - timedelta(days=10))) & (this_phone_scan.date_time <= utc.localize(datetime.now())):
                    for same_qrcode_scan in Entries_Scans.objects.filter(qrcode_id = this_phone_scan.qrcode_id):
                        if (same_qrcode_scan.date_time > this_phone_scan.date_time - timedelta(hours=1)) & (same_qrcode_scan.date_time < this_phone_scan.date_time + timedelta(hours=1)) & (same_qrcode_scan.phone != this_phone_scan.phone):
                            nearby_phones = Phones.objects.filter(phone_id = same_qrcode_scan.phone.phone_id)
                            for nearby_phone in nearby_phones:
                                if (nearby_phone.sickness_date > this_phone_scan.date_time - timedelta(days=10)) & (nearby_phone.sickness_date <= this_phone_scan.date_time + timedelta(days=10)):
                                    if nearby_phone not in checked_phones :
                                        expositions_count += 1
                                        checked_phones.append(nearby_phone)
            if expositions_count != 0:
                return JsonResponse({'code': 3, 'expositions': expositions_count}, status=200)
            return JsonResponse({'code': 2}, status=status.HTTP_201_CREATED)
        except Phones.DoesNotExist:
            return JsonResponse({'code': 0, 'error': 'DB operation error'}, status=200)
    newPhoneId = str(uuid.uuid4())
    newPhone = {'phone_id': newPhoneId, 'sickness_date': utc.localize(datetime.min)}
    phone_serializer = PhonesSerializer(data = newPhone)
    if phone_serializer.is_valid():
        try:
            phone_serializer.save()
        except Exception as e:
            return JsonResponse({'code': 0, 'error': 'Phone couldnt be added in DB'}, status=200)
        return JsonResponse({'code': 1, 'id': newPhoneId}, status=200)
    return JsonResponse({'code': 0, 'error': 'API error'}, status=200)

@api_view(['POST'])
def insert_users_for_dev(request):
    try:
        docteur = User.objects.create_user('doc@gmail.com', 'doc@gmail.com', '12345678')
        docteur_id = User.objects.filter(email = 'doc@gmail.com').first().id
        pierre = User.objects.create_user('p@gmail.com', 'p@gmail.com', '12345678')
        pierre_id = User.objects.filter(email = 'p@gmail.com').first().id
        laurent = User.objects.create_user('l@gmail.com', 'l@gmail.com', '12345678')
        laurent_id = User.objects.filter(email = 'l@gmail.com').first().id
        simon = User.objects.create_user('s@gmail.com', 's@gmail.com', '12345678')
        simon_id = User.objects.filter(email = 's@gmail.com').first().id
        doctor = { 
            'user_id' : docteur_id,
            'firstname' : '1',
            'lastname' : '1',
            'telephone' : '1',
            'street_name' : '1',
            'house_number' : 1,
            'postcode' : '1',
            'inami' : '1',
            'mail' : '1'
        }
        establishmentP = {
            'user_id' : pierre_id,
            'name' : '2',
            'telephone' : '2',
            'street_name' : '2',
            'house_number' : 2,
            'postcode' : '2',
            'tva' : '2',
            'mail' : '2'
        }
        establishmentL = {
            'user_id' : laurent_id,
            'name' : '3',
            'telephone' : '3',
            'street_name' : '3',
            'house_number' : 3,
            'postcode' : '3',
            'tva' : '3',
            'mail' : '3'
        }
        establishmentS = {
            'user_id' : simon_id,
            'name' : '4',
            'telephone' : '4',
            'street_name' : '4',
            'house_number' : 4,
            'postcode' : '4',
            'tva' : '4',
            'mail' : '4'
        }
        if doctor is not None: 
            doctor_serializer = DoctorSerializer(data = doctor)
            if doctor_serializer.is_valid():
                doctor_serializer.save()
        if establishmentP is not None: 
            establishment_serializer = EstablishmentSerializer(data = establishmentP)
            if establishment_serializer.is_valid():
                establishment_serializer.save()
        if establishmentL is not None: 
            establishment_serializer = EstablishmentSerializer(data = establishmentL)
            if establishment_serializer.is_valid():
                establishment_serializer.save()
        if establishmentS is not None: 
            establishment_serializer = EstablishmentSerializer(data = establishmentS)
            if establishment_serializer.is_valid():
                establishment_serializer.save()
    except Exception as e:
        return JsonResponse({'response': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return JsonResponse({'response': 'ok'}, status=status.HTTP_201_CREATED)