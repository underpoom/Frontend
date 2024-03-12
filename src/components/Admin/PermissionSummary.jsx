import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import NavbarTopAdmin from "./NavbarTopAdmin/NavbarTopAdmin";
import { UserContext, url } from "../../bounding/UserContext";
import axios from "axios";
const ContainerRemoveFactory = styled.div`
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
  font: 400 24px Inter, sans-serif;
`;

const FactoryName = styled.div`
  align-self: center;
  font: 400 24px Inter, sans-serif;
  width: 200px;
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

const LabelHeadFactoryname = styled.div`
  font: 700 24px Inter, sans-serif;
  margin-left: 5px;
`;

const LabelHeadUserCount = styled.div`
  font: 700 24px Inter, sans-serif;
  margin-left: 110px;
`;

const LabelHeadMemberUsername = styled.div`
  font: 700 24px Inter, sans-serif;
  margin-left: 320px;
`;

const Members = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 700px;
  font: 400 20px Inter, sans-serif;

  gap: 20px;
`;

const Member = styled.div`
  width: 100px;
  word-wrap: break-word;
`;

export const PermissionSummary = () => {
  const [factoryList, setFactoryList] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/permission_summary`, {
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
  const [filteredData, setFilteredData] = useState([]);
  const showFilteredData = (filteredData) => {
    console.log("Filtered Data: ", filteredData);
    setFilteredData(filteredData);
  };

  return (
    <>
      <NavbarTopAdmin
        pageTitle="Factory’s Permission Summary"
        currentData={factoryList}
        filteredData={showFilteredData}
      />
      <ContainerRemoveFactory>
        <ContainerLabel>
          <LabelHeadFactoryname>Factory Name</LabelHeadFactoryname>
          <LabelHeadUserCount>User Count</LabelHeadUserCount>
          <LabelHeadMemberUsername>Member’s Username</LabelHeadMemberUsername>
        </ContainerLabel>
        {filteredData.map((factory, index) => (
          <FactoryDetail key={index}>
            <FactoryName>{factory.factory_name}</FactoryName>
            {factory.user_count}
            <Members>
              {factory.user_permis.map((user, userIndex) => (
                <Member key={userIndex}>{user.username}</Member>
              ))}
            </Members>
          </FactoryDetail>
        ))}
      </ContainerRemoveFactory>
    </>
  );
};

export default PermissionSummary;
