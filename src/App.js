import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from '../src/bounding/UserContext';
import Loginsignup from './components/LoginSignup/LoginSignup';
import MultipleFileUploader from './components/LoginSignup/MultipleFileUploader';
import { EditProfile } from './components/User/EditProfile';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import { Button } from "reactstrap";
import Information from './components/User/Information';
import { ManageUser } from './components/Admin/ManageUser';
import VerifyUsers from './components/Admin/VerifyUsers';
import { ManagementAdmin } from './components/Admin/MenuToolsAdmin/ManagementAdmin';
import PermissionSelected from './components/Admin/PermissionSelected';
import UserHomepage from './components/User/UserHomepage';

function App() {
  return (
    <UserProvider>

      <div className='App'>
        <Routes>
          <Route path="/" element={<Navigate to="/loginsignup" />} />
          <Route path="loginsignup" element={<Loginsignup />} />
          <Route path="editprofile" element={<EditProfile />} />
          <Route path="information" element={<Information />} />
          <Route path="manageuser" element={<ManageUser />} />
          <Route path="verifyusers" element={<VerifyUsers />} />
          <Route path="managementadmin" element={<ManagementAdmin />} />
          <Route path="userhomepage" element={<UserHomepage />} />
        </Routes>
      </div>

    </UserProvider >
  );
}

export default App;
