import React from 'react';
import doctorIcon from "../assets/icons/doctorIcon.jpg";
import reception from "../assets/icons/reception.jpg";
import pharmacist from "../assets/icons/pharmasist.jpg"; // fixed spelling here
import admin from "../assets/icons/admin.jpg";
import "../styles/Home.css";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home_container">
      <div className="choose_login">
        <h1>Choose a Login to Continue</h1>
      </div>
      <div className="home_icons">
        <div className="doctor_icon">
        <Link to="/Doctorlogin">
           <img src={doctorIcon} alt="Doctor" />
        </Link>
        </div>
        <div className="reception_icon">
          <Link to="/ReceptionLogin">
          <img src={reception} alt="Reception" />
          </Link>
          
        </div>
        <div className="pharmacy_icon">
          <Link to="/PharmacyLogin">
          <img src={pharmacist} alt="Pharmacist" />
          </Link>
          
        </div>
        <div className="admin_icon">
          <Link to="/AdminLogin"> 
          <img src={admin} alt="Admin" />
          </Link>
         
        </div>
      </div>
    </div>
  );
};

export default Home;
