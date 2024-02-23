import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MenuToolsAdmin.css";
import styled from "styled-components";
import TogglePopup from "../TogglePopup";
import axios from "axios";

const ContainerMenutools = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vh;
  height: 90vh;
  margin: 5vh;
  font-size: 32px;
  color: #fff;
  font-weight: 700;
  padding: 20px 35px;
  border-radius: 20px;
  box-shadow: 0px 4px 9.3px 6px rgba(0, 0, 0, 0.25);
  background-color: var(--Navbar, #2e2e32);
  justify-items: start;
`;

const HomePage = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Inter, sans-serif;
  /* border: 1px solid red; */
  align-items: start;
`;

const WhiteLine = styled.div`
  background-color: #fff;
  margin-top: 17px;
  height: 2px;
`;

const User = styled.div`
  display: flex;
  width: 100%;
  gap: 3vh;
  white-space: nowrap;
  margin: 35px 10px 0 0;
  font-size: 32px;
`;

const imgUser =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/6a8d2208cdd599c9d6f523e568748f8f802922a12dfd70c75e1296f855540b8e?apiKey=34584a6259e046a0be0d44044e057cb8&";
const imgBoldLeft =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/68ba5ea429ea0d68ab27d916dc8ad5ea87a39376ecb128162ac61552e2615687?apiKey=34584a6259e046a0be0d44044e057cb8&";
const imgBoldDown =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/d11a8c74c92fa77afa65db4e92bf04b26bc36b7fd7d9cfa2f4a419aa4898f199?apiKey=34584a6259e046a0be0d44044e057cb8&";
const imgFactory =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/4e5ad0d00ab460ea192b2777c8b4f4210a018fad5ab76df4a8acc1b6e3d1d12a?apiKey=34584a6259e046a0be0d44044e057cb8&";
const imgPermission =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/92b58fe32e3fff2bb6b296857a57e4527a754590de275b0c951b25be680ebc25?apiKey=34584a6259e046a0be0d44044e057cb8&";
const imgLogout =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/18a69ef420c65facab96b2f931e2dad1d16d1c4e0280a6f46d15388f30a80e7e?apiKey=34584a6259e046a0be0d44044e057cb8&";
const imgRemoveFactory =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/a2e88c1a61b33b23b5150e281d3c3707bfa6ebb978c42bddc2484fce78f7d68f?apiKey=34584a6259e046a0be0d44044e057cb8&";
export const MenuToolsAdmin = ({ onSelectSection }) => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [userSelectedSection, setUserSelectedSection] = useState(null);

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    setUserSelectedSection(null);
    onSelectSection(section);
  };

  const handleUserSectionSelect = (section) => {
    setUserSelectedSection(section);
    onSelectSection(section);
  };

  const Section = ({ name, imgSrc, className, children }) => (
    <div
      className={`${className} ${selectedSection === name ? "selected" : ""}`}
      onClick={() => handleSectionSelect(name)}
    >
      <img src={imgSrc} className={`img-${name.toLowerCase()}-edit`} />
      {children}
    </div>
  );

  const ManageUsers = () => {
    return (
      <div
        className={`manage-user ${
          userSelectedSection === "manage-user" ? "selected-child" : ""
        }`}
        onClick={() => handleUserSectionSelect("manage-user")}
      >
        Manage Users
      </div>
    );
  };

  const VerifyUser = () => {
    return (
      <div
        className={`verify-user ${
          userSelectedSection === "verify-user" ? "selected-child" : ""
        }`}
        onClick={() => handleUserSectionSelect("verify-user")}
      >
        Verify User
      </div>
    );
  };

  const AddPermission = () => {
    return (
      <div
        className={`add-permission ${
          userSelectedSection === "add-permission" ? "selected-child" : ""
        }`}
        onClick={() => handleUserSectionSelect("add-permission")}
      >
        Add Permission
      </div>
    );
  };

  const PermissionSummary = () => {
    return (
      <div
        className={`permission-summary ${
          userSelectedSection === "permission-summary" ? "selected-child" : ""
        }`}
        onClick={() => handleUserSectionSelect("permission-summary")}
      >
        Permission Summary
      </div>
    );
  };

  const CreateAdmin = () => {
    return (
      <div
        className={`create-admin ${
          userSelectedSection === "create-admin" ? "selected-child" : ""
        }`}
        onClick={() => handleUserSectionSelect("create-admin")}
      >
        Create Admin
      </div>
    );
  };

  const ManageAdmin = () => {
    return (
      <div
        className={`manage-admin ${
          userSelectedSection === "manage-admin" ? "selected-child" : ""
        }`}
        onClick={() => handleUserSectionSelect("manage-admin")}
      >
        Manage Admin
      </div>
    );
  };

  const navigate = useNavigate();

  const handleRemoveClickYes = () => {
    navigate("/loginsignup");
  };

  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");

  const handleClickLogout = () => {
    setShowPopup(true);
    setPopupContent("Do you want to logout ?");
  };

  return (
    <>
      {showPopup && (
        <TogglePopup
          content={popupContent}
          onClose={() => setShowPopup(false)}
          onYes={handleRemoveClickYes}
        />
      )}

      <ContainerMenutools>
        <HomePage>
          <span style={{ fontSize: "12px" }}>
            {" "}
            <br />
          </span>
          <span style={{ fontSize: "40px" }}>Management</span>
          <span style={{ fontSize: "12px" }}>
            {" "}
            <br />
          </span>
        </HomePage>
        <WhiteLine />

        <Section name="Users" imgSrc={imgUser} className="User">
          Users
          <img
            loading="lazy"
            src={selectedSection === "Users" ? imgBoldDown : imgBoldLeft}
            className="BoldArrow"
          />
        </Section>

        {selectedSection === "Users" && (
          <>
            <ManageUsers />
            <VerifyUser />
          </>
        )}

        <Section name="Admin" imgSrc={imgUser} className="Admin">
          Admin
          <img
            loading="lazy"
            src={selectedSection === "Admin" ? imgBoldDown : imgBoldLeft}
            className="BoldArrow"
          />
        </Section>

        {selectedSection === "Admin" && (
          <>
            <CreateAdmin />
            <ManageAdmin />
          </>
        )}

        <Section name="AddFactory" imgSrc={imgFactory} className="AddFactory">
          Add Factory
        </Section>

        <Section
          name="ManageFactory"
          imgSrc={imgRemoveFactory}
          className="ManageFactory"
        >
          Manage Factory
        </Section>

        <Section
          name="Permission"
          imgSrc={imgPermission}
          className="Permission"
        >
          Permission
          <img
            loading="lazy"
            src={selectedSection === "Permission" ? imgBoldDown : imgBoldLeft}
            className="BoldArrow"
          />
        </Section>

        {selectedSection === "Permission" && (
          <>
            <AddPermission />
            <PermissionSummary />
          </>
        )}

        <div className="Logout" onClick={handleClickLogout}>
          Logout
          <img loading="lazy" src={imgLogout} className="img-logout" />
        </div>
      </ContainerMenutools>
    </>
  );
};
