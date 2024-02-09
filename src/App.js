import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Loginsignup from './components/LoginSignup/LoginSignup';
import MultipleFileUploader from './components/LoginSignup/MultipleFileUploader';
import { EditProfile } from './components/EditProfile/EditProfile';
import ImgDraw from './bounding/ImgDraw';
import LoadAddress from './components/LoginSignup/LoadAddress';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import { Button } from "reactstrap";
import Information from './components/Information/Information';
import { ManageUser } from './components/Admin/ManageUser/ManageUser';
import MyComponentTW from './components/Admin/VerifyUser/MyComponentTW';
function App() {
  return (

    <div className='App'>
      
      <MyComponentTW/>
      <Routes>
        {/* <Route path="/" element={<MainMenuTest />} /> */}
        <Route path="loginsignup" element={<Loginsignup />} />
        <Route path="editprofile" element={<EditProfile />} />
        <Route path="information" element={<Information />} />
        <Route path="manageuser" element={<ManageUser />} />
        
        



        
        {/* <Route path="about" element={<About />} /> */}
      </Routes>



      {/* <LoadAddress/> */}


      {/* <ReadTxtFile/> */}
      {/* <MultipleFileUploader /> */}
      {/* <AdminMainMenu/> */}
      {/* <Instruction /> */}
      {/* <ImgDraw /> */}


    </div>




  );
}


export default App;
