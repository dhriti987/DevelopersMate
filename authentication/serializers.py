from rest_framework import serializers

from authentication.models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=50,min_length=8,write_only=True
    )

    class Meta:
        model = User
        fields = ['id','email','password']

    def validate(self,attrs):
        email = attrs.get('email',None)
        if email is None:
            raise serializers.ValidationError(
                'User Should Have email address'
            )
        
        return attrs
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
        