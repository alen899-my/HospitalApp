import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import pharimg from "../assets/loginImages/pharimg.jpg";
import "../styles/loginStyles/PharLogin.css";

const PharmacyLogin = () => {
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
      if (response.data.role === "pharmacist") navigate("/pharmacist/dashboard");
      else if (response.data.role === "admin") navigate("/admin/dashboard");
      else if (response.data.role === "doctor") navigate("/doctor/dashboard");
      else if (response.data.role === "receptionist") navigate("/receptionist/dashboard");
    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <div className="phar_login_container">
      <div className="left_image">
        <img src={pharimg} alt="" />
      </div>
      <div className="phaloginBox">
        <div className="phaloginTxt">
          <h1>Pharmacy Login</h1>
        </div>
        <form className="Phar_login_form" onSubmit={handleSubmit}>
          <div className="pform_group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder='enter your username' value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className="pform_group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder='enter your password' value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div className="pform_group">
            <button type="submit" className='plogin_button'>login</button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default PharmacyLogin