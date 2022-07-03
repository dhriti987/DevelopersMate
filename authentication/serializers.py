from rest_framework import serializers, exceptions

from authentication.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from userprofile.models import Profile

class EmailNotVerifiedError(exceptions.APIException):
    status_code = 403
    default_detail = 'Email is not Verified. Please Verify Your Email. '
    default_code = 'Email_not_verified'


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


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # if not user.is_verified:
        #     raise EmailNotVerifiedError()
        token = super().get_token(user)

        # Add custom claims
        try:
            Profile.objects.get(pk=user)
            token["have_profile"] = True
        except:
            token["have_profile"] = False

        return token
        