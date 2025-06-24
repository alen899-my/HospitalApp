import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/forms/ViewDoctors.css'; // You can copy AddDoctorForm styles here

const ViewDoctors = ({ onClose }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/doctors/')
      .then(res => {
        setDoctors(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="add-doctor-overlay"><div className="view-doctor-container">Loading doctors...</div></div>;
  if (error) return <div className="add-doctor-overlay"><div className="view-doctor-container error">Error loading doctors.</div></div>;

  return (
    <div className="add-doctor-overlay">
      <div className="view-doctor-container">
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="close-btn" onClick={onClose}>❌</button>
        </div>
        <h4>👨‍⚕️ All Doctors</h4>
        <div className="doctor-list">
          {doctors.map((doc) => (
            <div className="doctor-list-item" key={doc.id || doc.email}>
              <div className="doctor-list-avatar">
                {doc.gender && doc.gender.toLowerCase() === 'female' ? '👩‍⚕️' : '👨‍⚕️'}
              </div>
              <div className="doctor-list-main">
                <div className="doctor-list-name">{doc.full_name}</div>
                <div className="doctor-list-specialization">{doc.specialization}</div>
                <div className="doctor-list-email">{doc.email}</div>
              </div>
              <div className="doctor-list-secondary">
                <div><b>Phone:</b> {doc.phone_number}</div>
                <div><b>City:</b> {doc.city}</div>
                <div><b>State:</b> {doc.state}</div>
                <div><b>Experience:</b> {doc.experience}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewDoctors;
