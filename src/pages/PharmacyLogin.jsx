import React from 'react'
import pharimg from "../assets/loginImages/pharimg.jpg"
import "../styles/loginStyles/PharLogin.css"
const PharmacyLogin = () => {
  return (
    <div className="phar_login_container">
          <div className="left_image">
            <img src={pharimg} alt="" />
          </div>
          <div className="phaloginBox">
            <div className="phaloginTxt">
              <h1>Pharmacy Login</h1>
            </div>
            <form  className="Phar_login_form">
              <div className="pform_group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder='enter your email' required />
              </div>
              <div className="pform_group">
                <label htmlFor="password">password</label>
                <input type="password" id="password" placeholder='enter your password' required/>
    
              </div>
              <div className="pform_group">
                <button type="submit" className='plogin_button'>login</button>
              </div>
            </form>
          </div>
        </div>
  )
}

export default PharmacyLogin