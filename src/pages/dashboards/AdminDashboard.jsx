import React, { useState } from "react";
import "../../styles/dashboardsyles/AdminDashboard.css";
import DoctorsPanel from "../../components/pannels/DoctorsPanel";
import ReceptionPanel from "../../components/pannels/ReceptionPanel";
import PharmacistPanel from "../../components/pannels/PharmacistPanel";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Doctors":
        return <DoctorsPanel />;
      case "reception":
        return <ReceptionPanel />;
      case "pharmacist":
        return <PharmacistPanel />;
      default:
        return <p></p>;
    }
  };

  return (
    <div className="admindash">
      <div className="admindashside">
        <h2>Admin</h2>
        <ul>
          <li className={activeTab === "overview" ? "active" : ""} onClick={() => handleTabClick("overview")}>Now</li>
          <li className={activeTab === "users" ? "active" : ""} onClick={() => handleTabClick("Doctors")}>Doctors</li>
          <li className={activeTab === "drivers" ? "active" : ""} onClick={() => handleTabClick("reception")}>Reception</li>
          <li className={activeTab === "bookings" ? "active" : ""} onClick={() => handleTabClick(" pharmacist")}>Pharmacist</li>
        </ul>
      </div>

      <div className="admindashmain">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
