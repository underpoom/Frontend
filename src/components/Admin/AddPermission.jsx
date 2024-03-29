import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import NavbarTopAdmin from "./NavbarTopAdmin/NavbarTopAdmin";
import PermissionSelected from "./PermissionSelected";

import axios from "axios";
import { UserContext, url } from "../../bounding/UserContext";

const ContainerPermission = styled.div`
  display: flex;
  height: 76vh;
  flex-direction: column;
  aspect-ratio: 1;
  overflow-y: auto;
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

export const AddPermission = () => {
  const [FactorySelected, setFactorySelected] = useState(false);
  const [factoryList, setFactoryList] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/get_admin_manage_factory`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        setFactoryList(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleBackClick = () => {
    setFactorySelected(false);
    setFilteredData(factoryList);
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

  console.log(factoryList);

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
