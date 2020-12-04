from rest_framework import serializers 
from app.models import Connection
from app.models import Establishment
from app.models import Doctor


 
 
class ConnectionSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Connection
        fields = ('user_id',
                  'expire_date')

class EstablishmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Establishment
        fields = ('user_id',
                  'firstname',
                  'lastname',
                  'telephone',
                  'street_name',
                  'house_number',
                  'postcode',
                  'tva',
                  'mail'
                    )

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ('user_id',
                  'firstname',
                  'lastname',
                  'telephone',
                  'street_name',
                  'house_number',
                  'postcode',
                  'inami',
                  'mail'
                    )
