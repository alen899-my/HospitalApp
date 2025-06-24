from django.contrib import admin
from .models import CustomUser, DoctorProfile, ReceptionistProfile, PharmacistProfile, Doctor, DoctorCredentials

admin.site.register(CustomUser)
admin.site.register(DoctorProfile)
admin.site.register(ReceptionistProfile)
admin.site.register(PharmacistProfile)
admin.site.register(Doctor)
admin.site.register(DoctorCredentials)
