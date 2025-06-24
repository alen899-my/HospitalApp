from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser, DoctorProfile, ReceptionistProfile, PharmacistProfile, Doctor, DoctorCredentials

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role']

class DoctorProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    class Meta:
        model = DoctorProfile
        fields = ['user', 'specialization', 'license_number']

class ReceptionistProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    class Meta:
        model = ReceptionistProfile
        fields = ['user', 'shift']

class PharmacistProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    class Meta:
        model = PharmacistProfile
        fields = ['user', 'license_id']

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid credentials")

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