from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

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

class Doctor(models.Model):
    name = models.CharField(max_length=100)
    full_name = models.CharField(max_length=150)
    specialization = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    availability = models.CharField(max_length=20, choices=[
        ('Full Time', 'Full Time'),
        ('Part Time', 'Part Time'),
        ('Visiting', 'Visiting')
    ])
    gender = models.CharField(max_length=10)
    age = models.PositiveIntegerField()
    qualification = models.CharField(max_length=100)
    experience = models.CharField(max_length=50)
    address = models.TextField()
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    zip_code = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name

class DoctorCredentials(models.Model):
    doctor = models.OneToOneField(Doctor, on_delete=models.CASCADE, related_name='credentials')
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.doctor.name}'s credentials"
