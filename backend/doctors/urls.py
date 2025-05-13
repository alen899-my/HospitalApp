from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_doctors, name='list_doctors'),
    path('add/', views.add_doctor, name='add_doctor'),
    path('<int:doctor_id>/credentials/', views.add_doctor_credentials, name='add_doctor_credentials'),
]
