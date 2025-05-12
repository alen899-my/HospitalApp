import React from 'react';
import '../../styles/forms/AddDoctorForm.css';

const AddDoctorForm = ({ onClose }) => {
  return (
    <div className="add-doctor-overlay">
      <div className="add-doctor-form">
        <button className="close-btn" onClick={onClose}>❌</button>
        <h4>➕ Add Doctor Form</h4>
        <form className="form-grid">
          <div>
            <label>Doctor Username:</label>
            <input type="text" placeholder="Unique ID" />
          </div>
          <div>
            <label>Full Name:</label>
            <input type="text" placeholder="Dr. John Doe" />
          </div>
          <div>
            <label>Specialization:</label>
            <input type="text" placeholder="e.g. Cardiologist" />
          </div>
          <div>
            <label>Phone Number:</label>
            <input type="tel" placeholder="e.g. 9876543210" />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" placeholder="doctor@example.com" />
          </div>
          <div>
            <label>Availability:</label>
            <select>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Visiting</option>
            </select>
          </div>
          <div>
            <label>Date of Birth:</label>
            <input type="date" />
          </div>
          <div>
            <label>Gender:</label>
            <select>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label>Years of Experience:</label>
            <input type="number" placeholder="e.g. 10" />
          </div>
          <div>
            <label>Qualifications:</label>
            <input type="text" placeholder="e.g. MBBS, MD" />
          </div>
          <div>
            <label>Department:</label>
            <input type="text" placeholder="e.g. Cardiology" />
          </div>
          <div>
            <label>Room Number:</label>
            <input type="text" placeholder="e.g. 101A" />
          </div>
          <div>
            <label>Address:</label>
            <input type="text" placeholder="e.g. 123 Main St" />
          </div>
          <div>
            <label>City:</label>
            <input type="text" placeholder="e.g. New York" />
          </div>
          <div>
            <label>State:</label>
            <input type="text" placeholder="e.g. NY" />
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
