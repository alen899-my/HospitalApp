from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import CustomUser, DoctorProfile, ReceptionistProfile, PharmacistProfile
from .serializers import (
    CustomUserSerializer, DoctorProfileSerializer,
    ReceptionistProfileSerializer, PharmacistProfileSerializer, LoginSerializer
)
from .permissions import IsAdmin, IsDoctor, IsReceptionist, IsPharmacist

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'role': user.role,
        })

class ProfileView(APIView):
    def get(self, request):
        user = request.user
        if user.role == 'doctor':
            profile = DoctorProfile.objects.get(user=user)
            data = DoctorProfileSerializer(profile).data
        elif user.role == 'receptionist':
            profile = ReceptionistProfile.objects.get(user=user)
            data = ReceptionistProfileSerializer(profile).data
        elif user.role == 'pharmacist':
            profile = PharmacistProfile.objects.get(user=user)
            data = PharmacistProfileSerializer(profile).data
        else:
            data = CustomUserSerializer(user).data
        return Response(data)

class AdminDashboardView(APIView):
    permission_classes = [IsAdmin]
    def get(self, request):
        return Response({'message': 'Admin dashboard data'})

class DoctorDashboardView(APIView):
    permission_classes = [IsDoctor]
    def get(self, request):
        return Response({'message': 'Doctor dashboard data'})

class ReceptionistDashboardView(APIView):
    permission_classes = [IsReceptionist]
    def get(self, request):
        return Response({'message': 'Receptionist dashboard data'})

class PharmacistDashboardView(APIView):
    permission_classes = [IsPharmacist]
    def get(self, request):
        return Response({'message': 'Pharmacist dashboard data'})
