import React from 'react'
import "../styles/loginStyles/ReceptionLogin.css"
import reception from "../assets/loginImages/reception.jpg"
const ReceptionLogin = () => {
  return (
    <div className="recep_login_container">
      <div className="left_image">
        <img src={reception} alt="" />
      </div>
      <div className="receploginBox">
        <div className="receploginTxt">
          <h1>Reception Login</h1>
        </div>
        <form  className="reception_login_form">
          <div className="rform_group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder='enter your email' required />
          </div>
          <div className="rform_group">
            <label htmlFor="password">password</label>
            <input type="password" id="password" placeholder='enter your password' required/>

          </div>
          <div className="rform_group">
            <button type="submit" className='rlogin_button'>login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReceptionLogin