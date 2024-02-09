import React, { createContext, useContext, useState } from "react";
import "./NavbarTopAdmin2.css";
import { Link } from "react-router-dom";

export const NavbarTopAdmin = ({ pageTitle }) => {
  return (
    <>
      <div className={`navbar-top-admin ${pageTitle}`}>
        <div className="page-title-admin">{pageTitle}</div>
      </div>

      <div className="Black-line-admin" />
    </>
  );
};
export default NavbarTopAdmin;
