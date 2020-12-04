from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status

@api_view(['POST'])
def handleScanned_request(request):
    register_data = JSONParser().parse(request)
    print(register_data["QRCodeContent"])
    print(register_data["phoneID"])
    return JsonResponse({'message': 'handled'}, status=status.HTTP_201_CREATED)