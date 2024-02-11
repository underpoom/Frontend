import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MenuToolsAdmin.css";

const imgUser =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/6a8d2208cdd599c9d6f523e568748f8f802922a12dfd70c75e1296f855540b8e?apiKey=34584a6259e046a0be0d44044e057cb8&";
const imgBoldLeft =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/68ba5ea429ea0d68ab27d916dc8ad5ea87a39376ecb128162ac61552e2615687?apiKey=34584a6259e046a0be0d44044e057cb8&";
const imgFactory =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/4e5ad0d00ab460ea192b2777c8b4f4210a018fad5ab76df4a8acc1b6e3d1d12a?apiKey=34584a6259e046a0be0d44044e057cb8&";
const imgPermission =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/92b58fe32e3fff2bb6b296857a57e4527a754590de275b0c951b25be680ebc25?apiKey=34584a6259e046a0be0d44044e057cb8&";
const imgLogout =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/18a69ef420c65facab96b2f931e2dad1d16d1c4e0280a6f46d15388f30a80e7e?apiKey=34584a6259e046a0be0d44044e057cb8&";

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

  const navigate = useNavigate();

  function handleClickLogout(event) {
    navigate("/loginsignup");
  }

  return (
    <div className="Container-menutools">
      <div className="Home-page">
        <span style={{ fontSize: "12px" }}>
          {" "}
          <br />
        </span>
        <span style={{ fontSize: "40px" }}>Management</span>
        <span style={{ fontSize: "12px" }}>
          {" "}
          <br />
        </span>
      </div>
      <div className="White-line" />

      <Section name="Users" imgSrc={imgUser} className="User">
        Users
      </Section>
      {selectedSection === "Users" && (
        <>
          <ManageUsers />
          <VerifyUser />
        </>
      )}

      <Section name="AddFactory" imgSrc={imgFactory} className="AddFactory">
        Add Factory
      </Section>

      <Section name="Permission" imgSrc={imgPermission} className="Permission">
        Permission
      </Section>
      <div className="Logout" onClick={handleClickLogout}>
        Logout
        <img loading="lazy" src={imgLogout} className="img-logout" />
        
      </div>
    </div>
  );
};
