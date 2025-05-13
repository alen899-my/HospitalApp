from rest_framework import serializers
from users.models import CustomUser
from .models import Doctor, DoctorCredentials

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'


class DoctorCredentialsSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = DoctorCredentials
        fields = ['doctor', 'username', 'password']
        read_only_fields = ['user']

    def validate_username(self, value):
        if CustomUser.objects.filter(username=value).exists():
            raise serializers.ValidationError('This username is already taken.')
        return value

    def create(self, validated_data):
        username = validated_data.pop('username')
        password = validated_data.pop('password')

        try:
            # Create User instance with doctor role
            user = CustomUser.objects.create_user(
                username=username,
                password=password,
                role='doctor',
                email=f'{username}@hospital.com'  # Temporary email, should be provided in the form
            )

            # Create DoctorCredentials instance
            credentials = DoctorCredentials.objects.create(
                user=user,
                **validated_data
            )

            return credentials
        except Exception as e:
            # If anything fails, make sure to delete the user if it was created
            if 'user' in locals():
                user.delete()
            raise serializers.ValidationError(str(e))
