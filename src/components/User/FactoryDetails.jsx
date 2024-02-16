import React, { useState } from "react";
import styled from "styled-components";
import NavbarTop from "./NavbarTop/NavbarTop";

const RightContainer = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
`;

export const FactoryDetails = ({ factoryData }) => {
  const [selectedFactoryData, setSelectedFactoryData] = useState([]);
  const onFactoryInformationClick = (factoey) => {
    setSelectedFactoryData(factoey);
  };

  return (
    <>
      {/* <NavbarTop pageTitle={factoryData} /> */}

      <RightContainer>
        <NavbarTop pageTitle={factoryData.name} />
      </RightContainer>
    </>
  );
};

export default FactoryDetails;
