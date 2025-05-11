from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from users.models import DoctorProfile, ReceptionistProfile, PharmacistProfile

User = get_user_model()

class Command(BaseCommand):
    help = 'Seed initial data for hospital management system.'

    def handle(self, *args, **kwargs):
        # Admins
        for i in range(2):
            user, created = User.objects.get_or_create(
                username=f'admin{i+1}',
                email=f'admin{i+1}@hospital.com',
                role='admin',
                defaults={'is_superuser': True, 'is_staff': True}
            )
            user.set_password('testpass123')
            user.save()
        # Doctors
        for i in range(3):
            user, _ = User.objects.get_or_create(
                username=f'doctor{i+1}',
                email=f'doctor{i+1}@hospital.com',
                role='doctor'
            )
            user.set_password('testpass123')
            user.save()
            DoctorProfile.objects.get_or_create(
                user=user,
                specialization=f'Specialization {i+1}',
                license_number=f'DOC-LIC-{i+1}'
            )
        # Receptionists
        for i in range(2):
            user, _ = User.objects.get_or_create(
                username=f'receptionist{i+1}',
                email=f'receptionist{i+1}@hospital.com',
                role='receptionist'
            )
            user.set_password('testpass123')
            user.save()
            ReceptionistProfile.objects.get_or_create(
                user=user,
                shift='Morning' if i == 0 else 'Evening'
            )
        # Pharmacists
        for i in range(2):
            user, _ = User.objects.get_or_create(
                username=f'pharmacist{i+1}',
                email=f'pharmacist{i+1}@hospital.com',
                role='pharmacist'
            )
            user.set_password('testpass123')
            user.save()
            PharmacistProfile.objects.get_or_create(
                user=user,
                license_id=f'PHARM-LIC-{i+1}'
            )
        self.stdout.write(self.style.SUCCESS('Seed data created successfully.'))
