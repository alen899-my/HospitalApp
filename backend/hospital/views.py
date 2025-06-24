from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import CustomUser, DoctorProfile, ReceptionistProfile, PharmacistProfile, Doctor, DoctorCredentials
from .serializers import (
    CustomUserSerializer, DoctorProfileSerializer,
    ReceptionistProfileSerializer, PharmacistProfileSerializer, LoginSerializer,
    DoctorSerializer, DoctorCredentialsSerializer
)
from .permissions import IsAdmin, IsDoctor, IsReceptionist, IsPharmacist
from rest_framework.decorators import api_view, permission_classes

# Create your views here.

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

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def list_doctors(request):
    doctors = Doctor.objects.all()
    serializer = DoctorSerializer(doctors, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def add_doctor(request):
    serializer = DoctorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def add_doctor_credentials(request, doctor_id):
    from django.shortcuts import get_object_or_404
    doctor = get_object_or_404(Doctor, id=doctor_id)
    if hasattr(doctor, 'credentials'):
        return Response({'error': 'Doctor already has credentials'}, status=status.HTTP_400_BAD_REQUEST)
    data = request.data.copy()
    data['doctor'] = doctor_id
    serializer = DoctorCredentialsSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Credentials created successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
