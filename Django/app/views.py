from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from django.contrib.auth.models import User

from app.models import Establishment
from app.serializers import LoginSerializer
from rest_framework.decorators import api_view
from app import parser
import pyqrcode
from pyzbar.pyzbar import decode
from PIL import Image
import base64
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

import uuid



@api_view(['POST'])
def login_request(request):
    print(request.user.is_authenticated)
    request.user
    login_data = JSONParser().parse(request)
    username = login_data['email']
    password = login_data['password']
    user = authenticate(request, username = username, password = password)
    if user is not None:
        login(request, user)
        return JsonResponse({'response': 'User Connected', 'token' : request.session.session_key}, status=status.HTTP_201_CREATED)
    return JsonResponse({'response': 'Authentification Failed'}, status=status.HTTP_400_BAD_REQUEST)

@login_required
@api_view(['POST'])
def register(request):

    register_data = JSONParser().parse(request)
    user = User.objects.create_user(register_data['email'], register_data['email'], register_data['password'])
    if user is not None: 
        return JsonResponse({'response': 'User Created'}, status=status.HTTP_201_CREATED) 
    return JsonResponse({'response': 'Email already used'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def get_qr_code(request):
    print(User.objects.get(pk=4).is_authenticated)

    get_qr_code_data = JSONParser().parse(request)
    token = get_qr_code_data['token']
    #number_qr_codes = get_qr_code_data['number']
    #if request._request.user.is_authenticated is not True:
        #return JsonResponse({'response': 'Not connected'}, status=status.HTTP_400_BAD_REQUEST)
    #if not request.user.is_authenticated:
    #    return JsonResponse({'response': 'Not connected'}, status=status.HTTP_400_BAD_REQUEST)
    qr = pyqrcode.create(1)
    qr.png("test1.png", scale = 2)
    data = decode(Image.open('test1.png'))
    encoded_string =''
    with open("test1.png", "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
    return JsonResponse({'image': str(encoded_string)}, status=status.HTTP_201_CREATED)
    #return JsonResponse({'response': 'Email already used'}, status=status.HTTP_401_BAD_REQUEST)

@api_view(['POST'])
def logout_request(request):
    User.objects.get(pk=4).is_authenticated = False
    print(User.objects.get(pk=4).is_authenticated)

    # get_logout_data = JSONParser().parse(request)
    # token = get_qr_code_data['token']
    # auth.logout(request)
    # django_session = Session.objects.get(pk = token)
    # print(django_session)
    # print('token')
    
    return JsonResponse({'image': 'User logged out'}, status=status.HTTP_201_CREATED)

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


#Marc
#Generate an unique id for the devices
@api_view(['GET'])
def get_device_id(request):
    id = uuid.uuid4()
    return JsonResponse({'device_id' : id})