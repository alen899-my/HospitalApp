from django.urls import path
from .views import add_doctor, list_doctors

urlpatterns = [
    path('', list_doctors, name='list-doctors'),
    path('add/', add_doctor, name='add-doctor'),
]
