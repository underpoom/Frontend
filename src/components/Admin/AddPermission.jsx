import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavbarTopAdmin from "./NavbarTopAdmin/NavbarTopAdmin";
import PermissionSelected from "./PermissionSelected";

import axios from "axios";
const url = "http://127.0.0.1:8000";

const ContainerPermission = styled.div`
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

const FactoryName = styled.div`
  align-self: center;
  font: 400 24px Inter, sans-serif;
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
  width: 600px;
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

const ContentLabel = styled.div`
  border-bottom: 1px solid var(--stork, #9f9f9f);
  background-color: var(--stork, #9f9f9f);
  display: flex;
  margin-top: 20px;
  color: #fff;
  padding: 16px 60px;
  font-weight: 700;
  font-size: 24px;
  color: rgba(255, 255, 255, 1);
`;

const ContainerLabel = styled.div`
  font: 400 20px Inter, sans-serif;
  margin-left: 350px;
`;

const LabelLG = styled.div`
  margin: auto 0;
  font: 700 24px Inter, sans-serif;
  
`;

const LabelMd = styled.div`
  font: 400 20px Inter, sans-serif;
`;

const SearchUserContainer = styled.div`
  margin: 0 12vh 0 auto;
  input[type="text"] {
    height: 6.5vh;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    font-size: 24px;
  }
`;

const imgRemove =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/3f4c9b5db1e7a6ff8ec6827ec31de5c2c1e83625984ea6446bcdc670a3524c4b?apiKey=34584a6259e046a0be0d44044e057cb8&";
const imgAdd =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/d1573c1f4387e34454945052c6340580dd716ebf34149be2676f645bc373c6de?apiKey=34584a6259e046a0be0d44044e057cb8&";
const imgBack =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/de6a5fb1856d3b714a3c91e51d65fea4bc8b861e6dda41a96cdbd213fbbf6ef4?apiKey=34584a6259e046a0be0d44044e057cb8&";
export const AddPermission = () => {
  const [FactorySelected, setFactorySelected] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [factoryList, setFactoryList] = useState([]);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/get_admin_manage_factory`);
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
    setFilteredData(factoryList)
  };

  const [FactorySelectedData, setFactorySelectedData] = useState([]);

  const handleFactorySelected = (factory) => {
    setFactorySelected(!FactorySelected);
    setFactorySelectedData(factory);
  };

  const [filteredData, setFilteredData] = useState([]);

  const showFilteredData = (filteredData) => {
    console.log("Filtered Data: ", filteredData);
    setFilteredData(filteredData);
  };

  console.log(factoryList)

  return (
    <>
      {FactorySelected === false ? (
        <>
          <NavbarTopAdmin
            pageTitle="Add Factory’s Permission"
            currentData={factoryList}
            filteredData={showFilteredData}
          />
          <ContainerPermission>
            <ContentLabel>
              <LabelLG>Factory Name</LabelLG>
              <ContainerLabel>
                <LabelLG>Factory Location</LabelLG>
                <LabelMd>SubDistrict - District - Province</LabelMd>
              </ContainerLabel>
            </ContentLabel>
            {filteredData.map((factory, index) => (
              <FactoryDetail key={index}>
                <FactoryName>{factory.factory_name}</FactoryName>
                <LocData>
                  {/* {factory.province} - {factory.district} -{factory.subdistrict} */}
                  {factory.factory_details.replace(/_/g, " - ")}
                </LocData>

                <Select onClick={() => handleFactorySelected(factory)}>
                  Select
                </Select>
              </FactoryDetail>
            ))}
          </ContainerPermission>
        </>
      ) : (
        <>
          <PermissionSelected
            factoryData={FactorySelectedData}
            onBackClick={handleBackClick}
          ></PermissionSelected>
        </>
      )}
    </>
  );
};

export default AddPermission;
