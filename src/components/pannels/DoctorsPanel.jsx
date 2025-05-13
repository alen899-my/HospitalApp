import React, { useState } from "react";
import "../../styles/panels/Doctorpanel.css";
import AddDoctorForm from "../addon/AddDoctorForm";
import ViewDoctors from "../addon/ViewDoctors";
import AddCredentials from "../addon/AddCredentials";

const TabContent = ({ title, buttons, note, onButtonClick }) => {
  const getIcon = (label) => {
    if (/Add|Create/.test(label)) return "➕";
    if (/Edit|Update/.test(label)) return "✏️";
    if (/Delete|Archive|Deactivate/.test(label)) return "🗑️";
    if (/View/.test(label)) return "👁️";
    if (/Assign/.test(label)) return "🧑‍⚕️";
    if (/Reset/.test(label)) return "🔄";
    return "📌";
  };

  return (
    <section className="doctor-section">
      <h3 className="section-title">{title}</h3>
      {note && <p className="section-note">{note}</p>}

      <div className="button-grid">
        {buttons.map((label, index) => (
          <div
            key={index}
            className="button-card"
            onClick={() => onButtonClick(label)}
          >
            <span className="icon">{getIcon(label)}</span>
            <span className="label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const DoctorsPanel = () => {
  const [activeTab, setActiveTab] = useState("management");
  const [selectedAction, setSelectedAction] = useState("");

  const handleButtonClick = (label) => {
    if (label === "Add New Doctor") {
      setSelectedAction("add");
    } else if (label === "View All Doctors") {
      setSelectedAction("view");
    } else if (label === "Create Login Credentials") {
      setSelectedAction("credentials");
    } else {
      setSelectedAction(""); // clear action if another is selected
    }
  };

  const tabs = [
    { id: "management", label: "Doctor Management" },
    { id: "scheduling", label: "Scheduling" },
    { id: "access", label: "Permissions" },
    { id: "reports", label: "Reports" },
  ];

  const tabSections = {
    management: {
      title: "Doctor Management",
      buttons: [
        "Add New Doctor",
        "Edit/Update Doctor Details",
        "Archive Doctor (Deactivate)",
        "View All Doctors",
      ],
      note: "Manage doctor information and profiles.",
    },
    scheduling: {
      title: "Scheduling & Availability",
      buttons: ["View/Edit Schedule", "Set Availability", "Assign Shift"],
      note: "Manage working hours and availability.",
    },
    access: {
      title: "Access & Permissions",
      buttons: [
        "Create Login Credentials",
        "Reset Password",
        "Assign Role (Admin/Regular)",
      ],
      note: "Control user roles and access levels.",
    },
    reports: {
      title: "Reports & Analytics",
      buttons: ["View Appointment History", "View Billing Summary"],
      note: "Access doctor activity and billing data.",
    },
  };

  return (
    <div className="doctorpanel light-theme">
      <header className="doctorpanel-header">
        <h2>🩺 Doctor Control Panel</h2>
      </header>

      <nav className="doctorpanel-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => {
              setActiveTab(tab.id);
              setSelectedAction(""); // reset form when tab changes
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="doctorpanel-content">
        <TabContent
          {...tabSections[activeTab]}
          onButtonClick={handleButtonClick}
        />
        {selectedAction === "add" && <AddDoctorForm />}
        {selectedAction === "view" && <ViewDoctors />}
        {selectedAction === "credentials" && <AddCredentials />}
      </div>
    </div>
  );
};

export default DoctorsPanel;
