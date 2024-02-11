import React, { useState, useEffect } from "react";
import { MenuToolsAdmin } from "./MenuToolsAdmin/MenuToolsAdmin";
import { NavbarTopAdmin } from "./NavbarTopAdmin/NavbarTopAdmin";
import ManageUser from "./ManageUser";
import VerifyUsers from "./VerifyUsers";
import styled from "styled-components";
import AddFactory from "./AddFactory";
import Permission from "./Permission";
const RightContainer = styled.div`
  display: flex;
  width: 132vh;
  flex-direction: column;
`;

// Users manage-user verify-user AddFactory Permission
export const ManagementAdmin = () => {
  const [selectedSection, setSelectedSection] = useState([]);

  const handleSelectSection = (section) => {
    setSelectedSection(section);
    console.log("Selected section:", section);
  };

  return (
    <>
      <MenuToolsAdmin onSelectSection={handleSelectSection} />
      <RightContainer>
        {selectedSection === "manage-user" && <ManageUser />}
        {selectedSection === "verify-user" && <VerifyUsers />}
        {selectedSection === "AddFactory" && <AddFactory />}
        {selectedSection === "Permission" && <Permission />}
      </RightContainer>
    </>
  );
};
