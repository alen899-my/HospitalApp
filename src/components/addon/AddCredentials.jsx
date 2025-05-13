import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/forms/ViewDoctors.css';

const AddCredentials = ({ onClose }) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch all registered doctors
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setMessage('Failed to load doctors');
      }
    };

    fetchDoctors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor?.id || !credentials.username || !credentials.password) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8000/api/doctors/${selectedDoctor.id}/credentials/`, credentials);
      setMessage('Credentials added successfully!');
      // Clear form
      setCredentials({ username: '', password: '' });
      setSelectedDoctor('');
    } catch (error) {
      console.error('Error adding credentials:', error);
      setMessage(error.response?.data?.message || 'Failed to add credentials');
    }
  };

  return (
    <div className="add-doctor-overlay" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="view-doctor-container" style={{
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '25px',
        maxWidth: '500px',
        width: '90%',
        margin: '40px auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="close-btn" onClick={onClose}>❌</button>
        </div>
        <h4 style={{
          fontSize: '24px',
          color: '#2c3e50',
          marginBottom: '20px',
          textAlign: 'center',
          fontWeight: '600'
        }}>🔑 Add Doctor Credentials</h4>
      {message && (
        <div 
          style={{
            padding: '15px',
            marginBottom: '20px',
            borderRadius: '6px',
            textAlign: 'center',
            backgroundColor: message.includes('success') ? '#d4edda' : '#f8d7da',
            color: message.includes('success') ? '#155724' : '#721c24',
            border: `1px solid ${message.includes('success') ? '#c3e6cb' : '#f5c6cb'}`,
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={{
          marginBottom: '20px',
          padding: '15px',
          borderRadius: '8px',
          background: '#f8f9fa',
          border: '1px solid #e9ecef'
        }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: '#495057',
            fontWeight: '500',
            fontSize: '14px'
          }}>Select Doctor:</label>
          <select 
            value={selectedDoctor?.id || ''}
            onChange={(e) => setSelectedDoctor(doctors.find(d => d.id === parseInt(e.target.value)))}
            required
            className="doctor-input"
            style={{
              width: '100%',
              padding: '12px',
              marginTop: '5px',
              border: '1px solid #ced4da',
              borderRadius: '6px',
              fontSize: '14px',
              transition: 'border-color 0.2s ease-in-out',
              outline: 'none',
              '&:focus': {
                borderColor: '#4CAF50',
                boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.25)'
              }
            }}
          >
            <option value="">Choose a doctor...</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>

        <div style={{
          marginBottom: '20px',
          padding: '15px',
          borderRadius: '8px',
          background: '#f8f9fa',
          border: '1px solid #e9ecef'
        }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: '#495057',
            fontWeight: '500',
            fontSize: '14px'
          }}>Username:</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            required
            placeholder="Enter username"
            className="doctor-input"
            style={{
              width: '100%',
              padding: '12px',
              marginTop: '5px',
              border: '1px solid #ced4da',
              borderRadius: '6px',
              fontSize: '14px',
              transition: 'border-color 0.2s ease-in-out',
              outline: 'none',
              '&:focus': {
                borderColor: '#4CAF50',
                boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.25)'
              }
            }}
          />
        </div>

        <div style={{
          marginBottom: '20px',
          padding: '15px',
          borderRadius: '8px',
          background: '#f8f9fa',
          border: '1px solid #e9ecef'
        }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: '#495057',
            fontWeight: '500',
            fontSize: '14px'
          }}>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
            placeholder="Enter password"
            className="doctor-input"
            style={{
              width: '100%',
              padding: '12px',
              marginTop: '5px',
              border: '1px solid #ced4da',
              borderRadius: '6px',
              fontSize: '14px',
              transition: 'border-color 0.2s ease-in-out',
              outline: 'none',
              '&:focus': {
                borderColor: '#4CAF50',
                boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.25)'
              }
            }}
          />
        </div>

        <button 
          type="submit" 
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '14px 28px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            marginTop: '20px',
            width: '100%',
            transition: 'all 0.2s ease-in-out',
            boxShadow: '0 2px 4px rgba(76, 175, 80, 0.2)',
            '&:hover': {
              backgroundColor: '#43a047',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 6px rgba(76, 175, 80, 0.3)'
            }
          }}
        >
          Add Credentials
        </button>
      </form>
      </div>
    </div>
  );
};

export default AddCredentials;
