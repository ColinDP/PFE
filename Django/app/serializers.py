from rest_framework import serializers 
from app.models import Establishment
 
 
class LoginSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Establishment
        fields = ('mail',
                  'password')
