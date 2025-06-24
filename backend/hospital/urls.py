from django.urls import path
from .views import (
    LoginView, ProfileView,
    AdminDashboardView, DoctorDashboardView,
    ReceptionistDashboardView, PharmacistDashboardView,
    list_doctors, add_doctor, add_doctor_credentials
)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('admin/dashboard/', AdminDashboardView.as_view(), name='admin_dashboard'),
    path('doctor/dashboard/', DoctorDashboardView.as_view(), name='doctor_dashboard'),
    path('receptionist/dashboard/', ReceptionistDashboardView.as_view(), name='receptionist_dashboard'),
    path('pharmacist/dashboard/', PharmacistDashboardView.as_view(), name='pharmacist_dashboard'),
    path('doctors/', list_doctors, name='list_doctors'),
    path('doctors/add/', add_doctor, name='add_doctor'),
    path('doctors/<int:doctor_id>/credentials/', add_doctor_credentials, name='add_doctor_credentials'),
] 