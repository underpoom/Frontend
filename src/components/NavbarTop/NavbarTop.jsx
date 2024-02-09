import React, { createContext, useContext, useState } from "react";
import "./NavbarTop.css";
import { Link } from "react-router-dom";

export const NavbarTop = ({ pageTitle }) => {
  return (
    <>
      <div className={`navbar-top ${pageTitle}`}>
        <div className="page-title">{pageTitle}</div>

        {pageTitle === "Information" ? (
          <Link to="/editprofile" className="img-User">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ba22acfd395cddb5e3dcc608a6e5734b6ab4bff5f82e55298e97962e0f7f9a6?apiKey=34584a6259e046a0be0d44044e057cb8&"
              alt="Profile"
            />
          </Link>
        ) : (
          <div></div>
        )}

        {pageTitle === "Profile" ? (
          <Link to="/information" className="img-Info">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc0d1efaa0d1fa35e23f255d7067960837e6f664a2a32dd1b5e537d878c5aa91?apiKey=34584a6259e046a0be0d44044e057cb8&"
            />
          </Link>
        ) : (
          <div></div>
        )}

        
      </div>
      <div className="Black-line" />
    </>
  );
};
export default NavbarTop;
