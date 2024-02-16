import React, { useState } from "react";
import styled from "styled-components";
import NavbarTop from "./NavbarTop/NavbarTop";

const RightContainer = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
`;

export const BuildingDetails = ({ buildingData }) => {

    console.log("affff ter ",buildingData)
  return (
    <>
      <RightContainer>
        <NavbarTop pageTitle={buildingData} />
      </RightContainer>
    </>
  );
};

export default BuildingDetails;
