import React from 'react'
import "../styles/loginStyles/AdminLog.css"
import adminlg from "../assets/loginImages/adminlg.jpg"
const AdminLogin = () => {
  return (
    <div className="ad_login_container">
             <div className="left_image">
               <img src={adminlg} alt="" />
             </div>
             <div className="adloginBox">
               <div className="adloginTxt">
                 <h1>Admin Login</h1>
               </div>
               <form  className="ad_login_form">
                 <div className="adform_group">
                   <label htmlFor="email">Email</label>
                   <input type="email" id="email" placeholder='enter your email' required />
                 </div>
                 <div className="adform_group">
                   <label htmlFor="password">password</label>
                   <input type="password" id="password" placeholder='enter your password' required/>
       
                 </div>
                 <div className="adform_group">
                   <button type="submit" className='adlogin_button'>login</button>
                 </div>
               </form>
             </div>
           </div>
  )
}

export default AdminLogin