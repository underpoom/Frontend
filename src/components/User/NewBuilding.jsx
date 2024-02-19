import React, { useState } from "react";
import styled from "styled-components";
import NavbarTop from "./NavbarTop/NavbarTop";

const ContainerFactoryDetails = styled.div`
  display: flex;
  width: 132vh;
  height: 76vh;
  flex-direction: column;
  font: 700 32px Inter, sans-serif;
  padding: 1.5vh 1.5vh 0 1.5vh;
  padding-left: 5vh;
  align-items: start;
  font-size: 24px;
  padding-top: 42px;
`;

const Enteryourbuildingdetail = styled.div`
  color: #000;
  text-align: center;
  font: 700 32px Inter, sans-serif;
`;

const ContainerBuildingDetail = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  color: #000;
  font-weight: 400;
  white-space: nowrap;
  margin: 20px 0 0 17px;
  align-items: center;
`;

const BuildingValueType = styled.div`
  display: flex;
  font-family: Inter, sans-serif;
  justify-content: end;
  width: 200px;
`;

const Meter = styled.div`
  font-family: Inter, sans-serif;
`;

const YourBuilding = styled.div`
  color: #000;
  font-family: Inter, sans-serif;
  font-weight: 700;
  margin-top: 65px;
`;

const Confirm = styled.div`
  font-family: Inter, sans-serif;
  border-radius: 10px;
  background-color: var(--Important-Button, #0a89ff);
  align-self: end;
  margin-top: 147px;
  justify-content: center;
  color: var(--light, #fafafa);
  font-weight: 700;
  white-space: nowrap;
  padding: 15px 26px;
`;

const InputBuildingValue = styled.input`
  font-family: Inter, sans-serif;
  border-radius: 10px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: var(--light, #fafafa);
  justify-content: start;
  padding: 5px 24px 5px 24px;
  width: 300px;
`;

export const NewBuilding = ({ factoryData, handlepageChange }) => {
  const handlepage = (data) => {
    handlepageChange(data);
  };
  //   console.log(factoryData);
  const [buildingName, setBuildingName] = useState("");
  const [buildingLength, setBuildingLength] = useState("");
  const [buildingWidth, setBuildingWidth] = useState("");
  const [buildingLatitude, setBuildingLatitude] = useState("");
  const [buildingLongitude, setBuildingLongitude] = useState("");

  const handleChangeName = (e) => {
    setBuildingName(e.target.value);
  };

  const handleChangeLength = (e) => {
    setBuildingLength(e.target.value);
  };

  const handleChangeWidth = (e) => {
    setBuildingWidth(e.target.value);
  };

  const handleChangeLatitude = (e) => {
    setBuildingLatitude(e.target.value);
  };

  const handleChangeLongitude = (e) => {
    setBuildingLongitude(e.target.value);
  };

  const handleConfirm = () => {
    console.log("BuildingName ", buildingName);
    console.log("Building Length ", buildingLength);
    console.log("Building Width ", buildingWidth);
    console.log("Building Latitude ", buildingLatitude);
    console.log("Building Longitude ", buildingLongitude);
  };

  return (
    <>
      <NavbarTop pageTitle="New Building" changeStatePage={handlepage} />

      <ContainerFactoryDetails>
        <Enteryourbuildingdetail>
          Enter your building detail :
        </Enteryourbuildingdetail>
        <ContainerBuildingDetail>
          <BuildingValueType>Building Name :</BuildingValueType>

          <InputBuildingValue
            type="text"
            placeholder="Your building name"
            value={buildingName}
            onChange={handleChangeName}
          />
        </ContainerBuildingDetail>
        <ContainerBuildingDetail>
          <BuildingValueType>Length : </BuildingValueType>

          <InputBuildingValue
            type="text"
            placeholder="Your building length"
            value={buildingLength}
            onChange={handleChangeLength}
          />

          <Meter>Meter</Meter>
        </ContainerBuildingDetail>
        <ContainerBuildingDetail>
          <BuildingValueType>Width : </BuildingValueType>

          <InputBuildingValue
            type="text"
            placeholder="Your building width"
            value={buildingWidth}
            onChange={handleChangeWidth}
          />

          <Meter>Meter</Meter>
        </ContainerBuildingDetail>
        <YourBuilding>Your building center location </YourBuilding>
        <ContainerBuildingDetail>
          <BuildingValueType>Latitude : </BuildingValueType>

          <InputBuildingValue
            type="text"
            placeholder="Your building latitude"
            value={buildingLatitude}
            onChange={handleChangeLatitude}
          />
        </ContainerBuildingDetail>
        <ContainerBuildingDetail>
          <BuildingValueType>Longitude : </BuildingValueType>

          <InputBuildingValue
            type="text"
            placeholder="Your building longitude"
            value={buildingLongitude}
            onChange={handleChangeLongitude}
          />
        </ContainerBuildingDetail>
        <Confirm onClick={handleConfirm}>Confirm</Confirm>
      </ContainerFactoryDetails>
    </>
  );
};

export default NewBuilding;
