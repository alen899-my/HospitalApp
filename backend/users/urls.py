from django.urls import path
from .views import (
    LoginView, ProfileView,
    AdminDashboardView, DoctorDashboardView,
    ReceptionistDashboardView, PharmacistDashboardView
)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('admin/dashboard/', AdminDashboardView.as_view(), name='admin_dashboard'),
    path('doctor/dashboard/', DoctorDashboardView.as_view(), name='doctor_dashboard'),
    path('receptionist/dashboard/', ReceptionistDashboardView.as_view(), name='receptionist_dashboard'),
    path('pharmacist/dashboard/', PharmacistDashboardView.as_view(), name='pharmacist_dashboard'),
]
