import React, { useState, useEffect } from "react";
import { MenuToolsAdmin } from "./MenuToolsAdmin";
import { NavbarTopAdmin } from "../NavbarTopAdmin/NavbarTopAdmin";
import ManageUser from "../ManageUser";
import VerifyUsers from "../VerifyUsers";
import styled from "styled-components";
import AddFactory from "../AddFactory";
import AddPermission from "../AddPermission";
import ChangeRoleAndPassword from "../ChangeRoleAndPassword";
import ManageFactory from "../ManageFactory";
import CreateAdmin from "../CreateAdmin";
import ManageAdmin from "../ManageAdmin";
import PermissionSummary from "../PermissionSummary";
import Log from "../Log";
const RightContainer = styled.div`
  display: flex;
  width: 132vh;
  flex-direction: column;
`;

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

        {selectedSection === "create-admin" && <CreateAdmin />}
        {selectedSection === "manage-admin" && <ManageAdmin />}

        {selectedSection === "AddFactory" && <AddFactory />}

        {selectedSection === "ManageFactory" && <ManageFactory />}

        {selectedSection === "add-permission" && <AddPermission />}
        {selectedSection === "permission-summary" && <PermissionSummary />}
        {selectedSection === "Log" && <Log />}
      </RightContainer>
    </>
  );
};
