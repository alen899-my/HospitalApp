import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/forms/AddDoctorForm.css';

const AddDoctorForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    full_name: '',
    specialization: '',
    phone_number: '',
    email: '',
    availability: 'Full Time',
    gender: '',
    age: '',
    qualification: '',
    experience: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/doctors/add/', formData);
      alert('Doctor added successfully!');
      onClose();
    } catch (err) {
      if (err.response) {
        console.log('Backend error:', err.response.data);
      } else {
        console.error(err);
      }
      alert('Failed to add doctor');
    }
  };

  return (
    <div className="add-doctor-overlay">
      <div className="add-doctor-form">
        <button className="close-btn" onClick={onClose}>❌</button>
        <h4>➕ Add Doctor Form</h4>
        <form className="form-grid" onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" name="name" onChange={handleChange} required />
          </div>
          <div>
            <label>Full Name:</label>
            <input type="text" name="full_name" onChange={handleChange} required />
          </div>
          <div>
            <label>Specialization:</label>
            <input type="text" name="specialization" onChange={handleChange} />
          </div>
          <div>
            <label>Phone Number:</label>
            <input type="tel" name="phone_number" onChange={handleChange} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" onChange={handleChange} />
          </div>
          <div>
            <label>Availability:</label>
            <select name="availability" onChange={handleChange}>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Visiting">Visiting</option>
            </select>
          </div>
          <div>
            <label>Gender:</label>
            <select name="gender" onChange={handleChange}>
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label>Years of Experience:</label>
            <input type="text" name="experience" onChange={handleChange} required />
          </div>
          <div>
            <label>Qualification:</label>
            <input type="text" name="qualification" onChange={handleChange} required />
          </div>
          <div>
            <label>Address:</label>
            <input type="text" name="address" onChange={handleChange} />
          </div>
          <div>
            <label>City:</label>
            <input type="text" name="city" onChange={handleChange} />
          </div>
          <div>
            <label>State:</label>
            <input type="text" name="state" onChange={handleChange} />
          </div>
          <div>
            <label>Age:</label>
            <input type="number" name="age" onChange={handleChange} required />
          </div>
          <div>
            <label>Zip Code:</label>
            <input type="text" name="zip_code" onChange={handleChange} required />
          </div>
          <div className="form-actions">
            <button type="submit">Add Doctor</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorForm;
