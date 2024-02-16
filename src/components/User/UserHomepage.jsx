import React, { useState } from "react";
import MenuTools from "./MenuTools/MenuTools";
import NavbarTop from "./NavbarTop/NavbarTop";
import styled from "styled-components";
import { EditProfile } from "./EditProfile";
import FactoryDetails from "./FactoryDetails";
import BuildingDetails from "./BuildingDetails";
const RightContainer = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
`;
export const UserHomepage = () => {
  const [selectedFactoryData, setSelectedFactoryData] = useState([]);
  const [selectedBuildingData, setSelectedBuildingData] = useState([]);

  const handleClickFactoryInformation = (factory) => {
    setSelectedFactoryData(factory);
    console.log("fac after", factory);
    setShowFactoryDetails(true);
    setShowBuildingDetails(false);
  };

   const handleClickBuildingInformation = (building) => {
     setSelectedBuildingData(building);
     console.log("build after", building);
     setShowFactoryDetails(false);
     setShowBuildingDetails(true);
   };

  const [showFactoryDetails, setShowFactoryDetails] = useState(false);
  const [showBuildingDetails, setShowBuildingDetails] = useState(false);

  const [statePage, setStatePage] = useState([]);

  const handlePageState = (statePage) => {
    console.log("curr ", statePage);
    setStatePage(statePage);
    
  };

  return (
    <>
      <MenuTools
        pageTitle={statePage}
        onFactoryInformationClick={handleClickFactoryInformation}
        onBuildingInformationClick={handleClickBuildingInformation}
      />

      {/* <FactoryDetails /> */}

      {showFactoryDetails && (
        <FactoryDetails factoryData={selectedFactoryData} />
      )}

      {showBuildingDetails && (
        <BuildingDetails buildingData={selectedBuildingData} />
      )}

      {/* <RightContainer>
        <NavbarTop
          pageTitle={selectedFactoryData.name}
          changeStatePage={handlePageState}
        />
        <EditProfile />
      </RightContainer> */}
    </>
  );
};

export default UserHomepage;
