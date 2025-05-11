import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/loginStyles/ReceptionLogin.css";
import reception from "../assets/loginImages/reception.jpg";

const ReceptionLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("role", response.data.role);
      if (response.data.role === "receptionist") navigate("/receptionist/dashboard");
      else if (response.data.role === "admin") navigate("/admin/dashboard");
      else if (response.data.role === "doctor") navigate("/doctor/dashboard");
      else if (response.data.role === "pharmacist") navigate("/pharmacist/dashboard");
    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <div className="recep_login_container">
      <div className="left_image">
        <img src={reception} alt="" />
      </div>
      <div className="receploginBox">
        <div className="receploginTxt">
          <h1>Reception Login</h1>
        </div>
        <form className="reception_login_form" onSubmit={handleSubmit}>
          <div className="rform_group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder='enter your username' value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className="rform_group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder='enter your password' value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div className="rform_group">
            <button type="submit" className='rlogin_button'>login</button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default ReceptionLogin