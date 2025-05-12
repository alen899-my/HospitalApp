from django.db import models

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

