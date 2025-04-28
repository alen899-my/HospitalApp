import React from 'react'
import "../styles/loginStyles/DoctorLogin.css"
import drlogin from "../assets/loginImages/drlogin.jpg"

const Doctor_login = () => {
  return (
    <div className="doctr_login_container">
      <div className="left_image">
        <img src={drlogin} alt="Doctor login" />
      </div>
      <div className="drloginBox">
        <div className="DoctrloginTxt">
          <h1>Doctor Login</h1>
        </div>
        <form className="doctor_login_form">
          <div className="form_group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>
          <div className="form_group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />
          </div>
          <div className="form_group">
            <button type="submit" className="login_button">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Doctor_login
