import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DoctorLogin from './pages/Doctorlogin';
import PharmacyLogin from '../src/pages/PharmacyLogin';
import ReceptionLogin from "./pages/ReceptionLogin";
import AdminLogin from "./pages/AdminLogin";
import DoctorDashboard from "./pages/dashboards/DoctorDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import ReceptionistDashboard from "./pages/dashboards/ReceptionistDashboard";
import PharmacistDashboard from "./pages/dashboards/PharmacistDashboard";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Doctorlogin" element={<DoctorLogin />} />
        <Route path="/PharmacyLogin" element={<PharmacyLogin/>}/>
        <Route path='/ReceptionLogin' element={<ReceptionLogin/>}/>
        <Route path='/AdminLogin' element={<AdminLogin/>}/>
        {/* Dashboard routes */}
        <Route path='/doctor/dashboard' element={<DoctorDashboard />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/receptionist/dashboard' element={<ReceptionistDashboard />} />
        <Route path='/pharmacist/dashboard' element={<PharmacistDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
