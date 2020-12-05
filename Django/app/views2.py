from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
import uuid
from app.models import Phones

@api_view(['POST'])
def handle_scanned_request(request):
    register_data = JSONParser().parse(request)
    # ajout data DB
    print(register_data["QRCodeContent"])
    print(register_data["phoneID"])
    return JsonResponse({'message': 'scan handled'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def handle_app_launched(request):
    request_data = JSONParser().parse(request)
    reqID = request_data['id']
    if(reqID is not None):
        try:
            dbID = Phones.objects.get(pk=reqID)
            # get les gens qui ont scan les mm QR dans un laps de temps
            # return : soit liste contenant chaque danger (lieu, heure), soit msg "vous etes safe"
            return JsonResponse({'response': 'get dans BD'}, status=status.HTTP_201_CREATED)
        except Phones.DoesNotExist:
            return JsonResponse({'response': 'Phone not in DB'}, status=status.HTTP_400_BAD_REQUEST)
    newID = uuid.uuid4()
    dbID = Phones.objects.create(phone_id=newID)
    if dbID is not None: 
        return JsonResponse({'response': 'New : ' + str(newID)}, status=status.HTTP_201_CREATED)
    return JsonResponse({'response': 'Phone counldnt be registered'}, status=status.HTTP_400_BAD_REQUEST)
