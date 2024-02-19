import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavbarTopAdmin from "./NavbarTopAdmin/NavbarTopAdmin";
import TogglePopup from "./TogglePopup";

const ContainerRemoveFactory = styled.div`
  display: flex;
  height: 76vh;
  /* border: 1px solid red; */
  flex-direction: column;
  aspect-ratio: 1;
  overflow-y: auto;
  /* flex-wrap: wrap; */
  column-gap: 38px;
`;

const FactoryDetail = styled.div`
  justify-content: space-between;
  border-bottom: 1px solid var(--stork, #9f9f9f);
  background-color: #fff;
  display: flex;
  flex-direction: row;
  font-size: 20px;
  color: #000;
  font-weight: 700;
  width: 100%;
  /* height: 35vh; */
  padding: 10px 30px;
  margin-top: 5px;
  border-radius: 8px;
`;

const ContainerLabel = styled.div`
  border-bottom: 1px solid var(--stork, #9f9f9f);
  background-color: var(--stork, #9f9f9f);
  display: flex;
  margin-top: 20px;
  color: #fff;
  padding: 16px 24px;
  font-weight: 700;
  font-size: 24px;
  color: rgba(255, 255, 255, 1);
  padding-left: 50px;
`;

const ContentLabel = styled.div`
  font: 400 20px Inter, sans-serif;
  margin-left: 280px;
`;

const FactoryName = styled.div`
  align-self: center;
  font: 400 24px Inter, sans-serif;
  /* border: 1px solid red; */
  width: 200px;
`;

const LocData = styled.div`
  display: flex;
  justify-content: center;
  white-space: nowrap;
  font: 400 20px Inter, sans-serif;
  margin-left: 5px;
  align-items: center;
  /* border: 1px solid red; */
  width: 450px;
`;

const Select = styled.div`
  font-family: Inter, sans-serif;
  border-radius: 10px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: var(--Important-Button, #0a89ff);
  justify-content: center;
  color: #fff;
  white-space: nowrap;
  text-align: center;
  padding: 6px 9px;
  cursor: pointer;
`;

const DisableEnable = styled.div`
  font-family: Inter, sans-serif;
  border-radius: 10px;
  justify-content: center;
  color: ${(props) => (props.enabled ? "blue" : "var(--stork, #9f9f9f)")};
  border: ${(props) =>
    props.enabled
      ? "2px solid var(--Important-Button, #0a89ff)"
      : "2px solid var(--stork, #9f9f9f)"};
  text-align: center;
  padding: 6px 9px;
  cursor: pointer;
  width: 100px;
  margin-left: -140px;
`;

const LabelLG = styled.div`
  margin: auto 0;
  font: 700 24px Inter, sans-serif;
`;

const LabelMd = styled.div`
  font: 400 20px Inter, sans-serif;
`;

const imgRemove =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/3f4c9b5db1e7a6ff8ec6827ec31de5c2c1e83625984ea6446bcdc670a3524c4b?apiKey=34584a6259e046a0be0d44044e057cb8&";
const imgAdd =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/d1573c1f4387e34454945052c6340580dd716ebf34149be2676f645bc373c6de?apiKey=34584a6259e046a0be0d44044e057cb8&";
const imgBack =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/de6a5fb1856d3b714a3c91e51d65fea4bc8b861e6dda41a96cdbd213fbbf6ef4?apiKey=34584a6259e046a0be0d44044e057cb8&";

export const ManageFactory = () => {
  const [FactorySelected, setFactorySelected] = useState(false);

  const [factoryList, setFactoryList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../jsonFile/factories.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFactoryList(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleBackClick = () => {
    setFactorySelected(false);
  };

  const [FactorySelectedData, setFactorySelectedData] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");

  const handleTogglePopupRemove = (factory) => {
    setShowPopup(true);
    setPopupContent("Are you sure for removing this factory ?");
    setFactorySelectedData(factory);
  };

  const handleToggleDisableEnable = (index) => {
    const updatedFactoryList = [...factoryList];
    updatedFactoryList[index].enabled = !updatedFactoryList[index].enabled;
    setFactoryList(updatedFactoryList);
  };

  const [filteredData, setFilteredData] = useState([]);
  const showFilteredData = (filteredData) => {
    console.log("Filtered Data: ", filteredData);
    setFilteredData(filteredData);
  };

  // ----------------------------------------------------------------
  const handleRemoveClickYes = () => {
    console.log("you remove :", FactorySelectedData.name);
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <TogglePopup
          content={popupContent}
          onClose={() => setShowPopup(false)}
          onYes={handleRemoveClickYes}
        />
      )}

      <NavbarTopAdmin
        pageTitle="Manage Factory "
        currentData={factoryList}
        filteredData={showFilteredData}
      />
      <ContainerLabel>
        <LabelLG>Factory Name</LabelLG>
        <ContentLabel>
          <LabelLG>Factory Location</LabelLG>
          <LabelMd>SubDistrict - District - Province</LabelMd>
        </ContentLabel>
      </ContainerLabel>
      <ContainerRemoveFactory>
        {filteredData.map((factory, index) => (
          <FactoryDetail key={index}>
            <FactoryName>{factory.name}</FactoryName>
            <LocData>
              {factory.province} - {factory.district} - {factory.subdistrict}
            </LocData>
            <Select onClick={() => handleTogglePopupRemove(factory)}>
              Remove
            </Select>
            <DisableEnable
              enabled={factory.enabled}
              onClick={() => handleToggleDisableEnable(index)}
            >
              {factory.enabled ? "Enable" : "Disable"}
            </DisableEnable>
          </FactoryDetail>
        ))}
      </ContainerRemoveFactory>
    </>
  );
};

export default ManageFactory;