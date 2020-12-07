from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
import uuid
import app.views
from django.contrib.auth.models import User
from app.models import Connection, Doctor, Establishment, Phones, Entries_Scans
from app.serializers import ConnectionSerializer, EstablishmentSerializer, DoctorSerializer, Qrcode_DoctorSerializer, Qrcode_EstablishmentSerializer, PhonesSerializer
from datetime import datetime, timedelta 
import pytz

utc=pytz.UTC

@api_view(['POST'])
def handle_scanned_request(request):
    register_data = JSONParser().parse(request)
    # ajout data DB
    print(register_data["QRCodeContent"])
    print(register_data["phoneID"])
    return JsonResponse({'message': 'scan handled'}, status=status.HTTP_201_CREATED)

# codes renvoyés : 0 error, 1 welcome, 2 vous etes safe, 3 vous etes danger
@api_view(['POST'])
def handle_app_launched(request):
    request_data = JSONParser().parse(request)
    req_phone_id = request_data['id']
    print(req_phone_id)
    if(req_phone_id is not None): 
        try:
            # Get entriesscan (phone, moment > now - 10j)
            # Foreach entry
            #     Get entriesscan (entryQR, entryMoment+-1h)
            #     Foreach entry
            #         If its not this phone
            #             Get phone (entryPhone)
            #             If phone.sickDate > entryMoment - 2sem         && phone.sickDate <= entryMoment
            #                 ...
            expositions_count = 0
            for this_phone_scan in Entries_Scans.objects.filter(phone_id = req_phone_id):
                if (this_phone_scan.date_time > utc.localize(datetime.now() - timedelta(days=10))) & (this_phone_scan.date_time <= utc.localize(datetime.now())):
                    for same_qrcode_scan in Entries_Scans.objects.filter(qrcode_id = this_phone_scan.qrcode_id):
                        if (same_qrcode_scan.date_time > this_phone_scan.date_time - timedelta(hours=1)) & (same_qrcode_scan.date_time < this_phone_scan.date_time + timedelta(hours=1)) & (same_qrcode_scan.phone != this_phone_scan.phone):
                            nearby_phones = Phones.objects.filter(phone_id = same_qrcode_scan.phone.phone_id)
                            for nearby_phone in nearby_phones:
                                if (nearby_phone.sickness_date > this_phone_scan.date_time - timedelta(days=10)) & (nearby_phone.sickness_date <= this_phone_scan.date_time + timedelta(days=10)):
                                    expositions_count += 1
            if expositions_count != 0:
                return JsonResponse({'code': 3, 'expositions': expositions_count}, status=status.HTTP_201_CREATED)
            return JsonResponse({'code': 2}, status=status.HTTP_201_CREATED)
        except Phones.DoesNotExist:
            return JsonResponse({'code': 0, 'error': 'DB operation error'}, status=status.HTTP_400_BAD_REQUEST)
    newPhoneId = uuid.uuid4()
    newPhone = {'phone_id': int(newPhoneId), 'sickness_date': datetime.min}
    phone_serializer = PhonesSerializer(data = newPhone)
    if phone_serializer.is_valid():
        try:
            phone_serializer.save()
        except Exception as e:
            return JsonResponse({'code': 0, 'error': 'Phone couldnt be added in DB'}, status=status.HTTP_400_BAD_REQUEST)
        return JsonResponse({'code': 1}, status=status.HTTP_201_CREATED)
    return JsonResponse({'code': 0, 'error': 'API error'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def insert_users_for_dev(request):
    try:
        userA = User.objects.create_user('1', '1', '1')
        userB = User.objects.create_user('2', '2', '2')
        userC = User.objects.create_user('3', '3', '3')
        doctorA = { 
            'user_id' : 1,
            'firstname' : '1',
            'lastname' : '1',
            'telephone' : '1',
            'street_name' : '1',
            'house_number' : 1,
            'postcode' : '1',
            'inami' : '1',
            'mail' : '1'
        }
        establishmentA = {
            'user_id' : 2,
            'name' : '2',
            'telephone' : '2',
            'street_name' : '2',
            'house_number' : 2,
            'postcode' : '2',
            'tva' : '2',
            'mail' : '2'
        }
        establishmentB = {
            'user_id' : 3,
            'name' : '3',
            'telephone' : '3',
            'street_name' : '3',
            'house_number' : 3,
            'postcode' : '3',
            'tva' : '3',
            'mail' : '3'
        }
        if userA is not None: 
            doctor_serializer = DoctorSerializer(data = doctorA)
            if doctor_serializer.is_valid():
                doctor_serializer.save()
        if userB is not None: 
            establishment_serializer = EstablishmentSerializer(data = establishmentA)
            if establishment_serializer.is_valid():
                establishment_serializer.save()
        if userC is not None: 
            establishment_serializer = EstablishmentSerializer(data = establishmentB)
            if establishment_serializer.is_valid():
                establishment_serializer.save()
    except Exception as e:
        return JsonResponse({'response': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return JsonResponse({'response': 'ok'}, status=status.HTTP_201_CREATED)
    
