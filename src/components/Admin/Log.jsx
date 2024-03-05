import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import NavbarTopAdmin from "./NavbarTopAdmin/NavbarTopAdmin";
import PermissionSelected from "./PermissionSelected";

import axios from "axios";
import { UserContext, url } from "../../bounding/UserContext";

const ContainerLog = styled.div`
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

const Actor = styled.div`
  align-self: center;
  font: 400 24px Inter, sans-serif;
  width: 200px;

`;
const Message = styled.div`
  align-self: center;
  font: 400 24px Inter, sans-serif;
  width: 500px;

`;
const Timestamp = styled.div`
  align-self: center;
  font: 400 24px Inter, sans-serif;
  width: 300px;
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
  position: sticky;
  top: 0;
  z-index: 1;
`;

const LabelLG1 = styled.div`
  margin-left: 38px;
  font: 700 24px Inter, sans-serif;
`;
const LabelLG2 = styled.div`
  font: 700 24px Inter, sans-serif;
  margin-left: 370px;
`;
const LabelLG3 = styled.div`
  font: 700 24px Inter, sans-serif;
  margin-left: 390px;
`;

export const Log = () => {
  const [FactorySelected, setFactorySelected] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [factoryList, setFactoryList] = useState([]);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/log`, {
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
      <NavbarTopAdmin
        pageTitle="Log"
        currentData={factoryList}
        filteredData={showFilteredData}
      />
      <ContainerLog>
        <ContentLabel>
          <LabelLG1>Actor</LabelLG1>
          <LabelLG2>Message</LabelLG2>
          <LabelLG3>Timestamp</LabelLG3>
        </ContentLabel>

        {filteredData.map((data, index) => (
          <FactoryDetail key={index}>
            <Actor>{data.actor}</Actor>
            <Message>{data.message}</Message>
            <Timestamp>{data.timestamp}</Timestamp>
          </FactoryDetail>
        ))}
      </ContainerLog>
    </>
  );
};

export default Log;
