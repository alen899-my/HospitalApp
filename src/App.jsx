import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DoctorLogin from './pages/Doctorlogin'; // small spelling fix here
import PharmacyLogin from '../src/pages/PharmacyLogin';
import ReceptionLogin from "./pages/ReceptionLogin";
import AdminLogin from "./pages/AdminLogin";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Doctorlogin" element={<DoctorLogin />} />
        <Route path="/PharmacyLogin" element={<PharmacyLogin/>}/>
        <Route path='/ReceptionLogin' element={<ReceptionLogin/>}/>
        
        <Route path='/AdminLogin' element={<AdminLogin/>}/>
       
      </Routes>
    </Router>
  );
}

export default App;
