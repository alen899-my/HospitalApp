import React from 'react';
import doctorIcon from "../assets/icons/doctorIcon.jpg";
import reception from "../assets/icons/reception.jpg";
import pharmacist from "../assets/icons/pharmasist.jpg"; // fixed spelling here
import admin from "../assets/icons/admin.jpg";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home_container">
      <div className="home_icons">
        <div className="doctor_icon">
          <img src={doctorIcon} alt="Doctor" />
        </div>
        <div className="reception_icon">
          <img src={reception} alt="Reception" />
        </div>
        <div className="pharmacy_icon">
          <img src={pharmacist} alt="Pharmacist" />
        </div>
        <div className="admin_icon">
          <img src={admin} alt="Admin" />
        </div>
      </div>
    </div>
  );
};

export default Home;
