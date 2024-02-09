import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./ManageUser.css";
import { Link } from "react-router-dom";
import { MenuToolsAdmin } from "../MenuToolsAdmin/MenuToolsAdmin";
import { NavbarTopAdmin } from "../NavbarTopAdmin/NavbarTopAdmin";
import { useNavigate } from "react-router-dom";

const RightContainer = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
`;

export const ManageUser = () => {
  const [username, setUsername] = useState("user no.11");
  const navigate = useNavigate();

  function handleClickLogout(event) {
    navigate("/loginsignup");
  }

  return (
    <>
      <MenuToolsAdmin />

      <RightContainer>
        <NavbarTopAdmin pageTitle="Manage User" />
      </RightContainer>
    </>
  );
};

export default ManageUser;
