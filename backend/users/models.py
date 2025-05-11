from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('doctor', 'Doctor'),
        ('receptionist', 'Receptionist'),
        ('pharmacist', 'Pharmacist'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'role']

class DoctorProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='doctor_profile')
    specialization = models.CharField(max_length=100)
    license_number = models.CharField(max_length=50)

class ReceptionistProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='receptionist_profile')
    shift = models.CharField(max_length=50)

class PharmacistProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='pharmacist_profile')
    license_id = models.CharField(max_length=50)
