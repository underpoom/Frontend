import React, { useContext, useEffect, useState } from "react";
import MenuTools from "./MenuTools/MenuTools";
import NavbarTop from "./NavbarTop/NavbarTop";
import styled from "styled-components";
import { EditProfile } from "./EditProfile";
import FactoryDetails from "./FactoryDetails";
import BuildingDetails from "./BuildingDetails";
import Information from "./Information";
import NewBuilding from "./NewBuilding";
import AllDataHistory from "./AllDataHistory";
import { UserContext, url } from "../../bounding/UserContext";

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
    setSelectedSection("FactoryDetails");
  };

  const handleClickBuildingInformation = (building) => {
    setSelectedBuildingData(building);
    setSelectedSection("BuildingDetails");
  };

  const handleNewBuilding = (factory) => {
    setSelectedFactoryData(factory);
    setSelectedSection("NewBuilding");
  };

  const handleFactoryClick = (data) => {
    setSelectedFactoryData(data);
  };

  const handleBuildingClick = (data) => {
    // console.log("Selected section:", building);
    setSelectedBuildingData(data);
    // console.log("fac ",selectedFactoryData)
    // console.log("building ", building);
    setSelectedSection("AllDataHistory");
  };

  const handleNewBuildingClick = (data) => {
    setSelectedBuildingData(data);
    handleFetch(data)
    setSelectedSection("AllDataHistory");
  };

  const [showFactoryDetails, setShowFactoryDetails] = useState(false);
  const [showBuildingDetails, setShowBuildingDetails] = useState(false);
  const [selectedSection, setSelectedSection] = useState("Information");

  const [statePage, setStatePage] = useState([]);

  const handleSelectSection = (section) => {
    setSelectedSection(section);
    console.log("Selected section:", section);
  };

  const { user } = useContext(UserContext);

  const handleFetch = () => {};

  return (
    <>
      <MenuTools
        pageTitle={statePage}
        onFactoryInformationClick={handleClickFactoryInformation}
        onBuildingInformationClick={handleClickBuildingInformation}
        onNewBuildingClick={handleNewBuilding}
        onBuildingClick={handleBuildingClick}
        onFactoryClick={handleFactoryClick}
        ishandleFetch={handleFetch}
      />

      <RightContainer>
        {selectedSection === "Information" && (
          <Information handlepageChange={handleSelectSection} />
        )}
        {selectedSection === "Profile" && (
          <EditProfile handlepageChange={handleSelectSection} />
        )}

        {selectedSection === "FactoryDetails" && (
          <FactoryDetails
            factoryData={selectedFactoryData}
            handlepageChange={handleSelectSection}
          />
        )}

        {selectedSection === "BuildingDetails" && (
          <BuildingDetails
            buildingData={selectedBuildingData}
            handlepageChange={handleSelectSection}
          />
        )}

        {selectedSection === "NewBuilding" && (
          <NewBuilding
            factoryData={selectedFactoryData}
            handlepageChange={handleSelectSection}
            handleNewBuildingClickConfirm={handleNewBuildingClick}
            handleFetch={handleFetch}
          />
        )}

        {selectedSection === "AllDataHistory" && (
          <AllDataHistory
            factoryData={selectedFactoryData}
            buildingData={selectedBuildingData}
            handlepageChange={handleSelectSection}
          />
        )}
      </RightContainer>
    </>
  );
};

export default UserHomepage;
