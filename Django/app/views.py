from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from django.contrib.auth.models import User
from app.models import Establishment
from app.serializers import LoginSerializer
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from app import parser
import pyqrcode
from pyzbar.pyzbar import decode
from PIL import Image
import base64



@api_view(['POST'])
def login(request):
    login_data = JSONParser().parse(request)
    username = login_data['email']
    password = login_data['password']
    user = authenticate(request._request, username = username, password = password)
    if user is not None:
        auth_login(request._request, user)
        return JsonResponse({'response': 'Welcome'}, status=status.HTTP_201_CREATED) 
    return JsonResponse({'response': 'Authentification Failed'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register(request):
    register_data = JSONParser().parse(request)
    user = User.objects.create_user(register_data['email'], register_data['email'], register_data['password'])
    if user is not None: 
        return JsonResponse({'response': 'User Created'}, status=status.HTTP_201_CREATED) 
    return JsonResponse({'response': 'Email already used'}, status=status.HTTP_401_BAD_REQUEST)

@api_view(['POST'])
def get_qr_code(request):
    #get_qr_code_data = JSONParser().parse(request)
    #number_qr_codes = get_qr_code_data['number']
    qr = pyqrcode.create(1)
    qr.png("test1.png", scale = 2)
    data = decode(Image.open('test1.png'))
    print(data)
    encoded_string =' '
    with open("test1.png", "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
    print(encoded_string)
    return JsonResponse({'response': 'User Created'}, status=status.HTTP_201_CREATED) 
    #return JsonResponse({'response': 'Email already used'}, status=status.HTTP_401_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def tutorial_detail(request, pk):
    # find tutorial by pk (id)
    try: 
        tutorial = Tutorial.objects.get(pk=pk) 
    except Tutorial.DoesNotExist: 
        return JsonResponse({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND) 
    # Retrieve a single object
    if request.method == 'GET': 
        tutorial_serializer = TutorialSerializer(tutorial) 
        return JsonResponse(tutorial_serializer.data) 
    # Update an object
    elif request.method == 'PUT': 
        tutorial_data = JSONParser().parse(request) 
        tutorial_serializer = TutorialSerializer(tutorial, data=tutorial_data) 
        if tutorial_serializer.is_valid(): 
            tutorial_serializer.save()
            return JsonResponse(tutorial_serializer.data) 
        return JsonResponse(tutorial_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # Delete an object
    elif request.method == 'DELETE': 
        tutorial.delete() 
        return JsonResponse({'message': 'Tutorial was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    # Delete all objects
    # elif request.method == 'DELETE':
    #     count = Tutorial.objects.all().delete()
    #     return JsonResponse({'message': '{} Tutorials were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
        
@api_view(['GET'])
def tutorial_list_published(request):
    # GET all published tutorials
    # Find all objects by condition
    tutorials = Tutorial.objects.filter(published=True)
        
    if request.method == 'GET': 
        tutorials_serializer = TutorialSerializer(tutorials, many=True)
        return JsonResponse(tutorials_serializer.data, safe=False)
