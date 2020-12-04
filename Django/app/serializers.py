from rest_framework import serializers 
from app.models import Connection
 
 
class ConnectionSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Connection
        fields = ('user_id',
                  'expire_date')
