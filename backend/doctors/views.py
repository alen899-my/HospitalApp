from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import DoctorSerializer, DoctorCredentialsSerializer
from .models import Doctor, DoctorCredentials
from django.contrib.auth.models import User

import traceback
import sys

from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes

@api_view(['GET'])
@permission_classes([AllowAny])
def list_doctors(request):
    doctors = Doctor.objects.all()
    serializer = DoctorSerializer(doctors, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def add_doctor(request):
    try:
        serializer = DoctorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print('Exception in add_doctor:', e, file=sys.stderr)
        traceback.print_exc()
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
def add_doctor_credentials(request, doctor_id):
    try:
        # Check if doctor exists
        doctor = Doctor.objects.get(id=doctor_id)

        # Check if doctor already has credentials
        if hasattr(doctor, 'credentials'):
            return Response(
                {'error': 'Doctor already has credentials'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Add doctor ID to the request data
        data = request.data.copy()
        data['doctor'] = doctor_id

        serializer = DoctorCredentialsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'Credentials created successfully'}, 
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Doctor.DoesNotExist:
        return Response(
            {'error': 'Doctor not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        print('Exception in add_doctor_credentials:', e, file=sys.stderr)
        traceback.print_exc()
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
