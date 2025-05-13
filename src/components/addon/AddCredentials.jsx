import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/addon/AddCredentials.css';

const AddCredentials = () => {
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
    <div className="add-credentials-container">
      <h2>Add Doctor Credentials</h2>
      {message && <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Doctor:</label>
          <select 
            value={selectedDoctor?.id || ''}
            onChange={(e) => setSelectedDoctor(doctors.find(d => d.id === parseInt(e.target.value)))}
            required
          >
            <option value="">Choose a doctor...</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            required
            placeholder="Enter username"
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
            placeholder="Enter password"
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Credentials
        </button>
      </form>
    </div>
  );
};

export default AddCredentials;
