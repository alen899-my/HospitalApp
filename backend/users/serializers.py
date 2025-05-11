from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser, DoctorProfile, ReceptionistProfile, PharmacistProfile

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
