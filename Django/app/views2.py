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
    print(register_data["QRCodeContent"])
    print(register_data["phoneID"])
    return JsonResponse({'message': 'scan handled'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def handle_app_launched(request):
    request_data = JSONParser().parse(request)
    id = request_data['id']
    print("id req : ")
    print(id)
    if(id is not None):
        phoneID = Phones.objects.get(pk=id)
        if phoneID is not None: 
            # get les gens qui ont scan les mm QR dans un laps de temps
            # return : soit liste contenant chaque danger (lieu, heure), soit msg "vous etes safe"
            return JsonResponse({'response': 'get dans BD'}, status=status.HTTP_201_CREATED)
        return JsonResponse({'response': 'Illegal phone ID'}, status=status.HTTP_400_BAD_REQUEST)
    id = uuid.uuid4()
    print("id new : ")
    print(id)
    phoneID = Phones.objects.create(phone_id=id)
    if phoneID is not None: 
        return JsonResponse({'response': 'New phone added'}, status=status.HTTP_201_CREATED)
    return JsonResponse({'response': 'Phone counldnt be added'}, status=status.HTTP_400_BAD_REQUEST)
