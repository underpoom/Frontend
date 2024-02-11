import React, { createContext, useContext, useState } from "react";
import styled from "styled-components";

const NavbarTopAdminContainer = styled.div`
  display: flex;
  height: 14vh;
  width: 132vh;
  border: 1px solid #f24e1e;
  margin: 5vh 5vh 0 0;
  align-items: center;
  padding-right: 2vh;
`;

const PageTitleAdmin = styled.div`
  border: 1px solid #f24e1e;
  font-size: xx-large;
  font-weight: 700;
  margin-right: auto;
  font-size: 40px;
`;

const BlacLineAdmin = styled.div`
  background-color: black;
  height: 2px;
`;

export const NavbarTopAdmin = ({ pageTitle }) => {
  return (
    <>
      <NavbarTopAdminContainer>
        <PageTitleAdmin>{pageTitle}</PageTitleAdmin>
      </NavbarTopAdminContainer>

      <BlacLineAdmin />
    </>
  );
};
export default NavbarTopAdmin;
