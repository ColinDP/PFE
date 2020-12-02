from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from app.models import Establishment
from app.serializers import LoginSerializer
from rest_framework.decorators import api_view


@api_view(['POST'])
def login(request):
 
    login_data = JSONParser().parse(request)
    print(login_data['email'])
    try : 
        establishment = Establishment.objects.get(mail = )
    except Establishment.DoesNotExist :
        establishment = None
    print('establishment : ', establishment)
    login_serializer = LoginSerializer(data=login_data)
    if login_serializer.is_valid():
        return JsonResponse(login_serializer.data, status=status.HTTP_201_CREATED) 
    return JsonResponse(login_serializer.errors, status=status.HTTP_401_BAD_REQUEST)
 
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
