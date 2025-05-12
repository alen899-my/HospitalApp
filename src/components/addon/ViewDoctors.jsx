import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/forms/ViewDoctors.css'; // You can copy AddDoctorForm styles here

const ViewDoctors = () => {
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

  if (loading) return <div className="view-doctor-container">Loading doctors...</div>;
  if (error) return <div className="view-doctor-container error">Error loading doctors.</div>;

  return (
    <div className="view-doctor-container">
      <h4>👨‍⚕️ All Doctors</h4>
      <div className="doctor-table-wrapper">
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Full Name</th>
              <th>Specialization</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Qualification</th>
              <th>Experience</th>
              <th>City</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.id || doc.username}>
                <td>{doc.username}</td>
                <td>{doc.full_name}</td>
                <td>{doc.specialization}</td>
                <td>{doc.email}</td>
                <td>{doc.phone}</td>
                <td>{doc.gender}</td>
                <td>{doc.dob}</td>
                <td>{doc.qualifications}</td>
                <td>{doc.experience}</td>
                <td>{doc.city}</td>
                <td>{doc.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewDoctors;
