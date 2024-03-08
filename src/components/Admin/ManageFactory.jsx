import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import NavbarTopAdmin from "./NavbarTopAdmin/NavbarTopAdmin";
import TogglePopup from "./TogglePopup";

import axios from "axios";
import { UserContext, url } from "../../bounding/UserContext";

const ContainerRemoveFactory = styled.div`
  display: flex;
  height: 76vh;
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
  margin-left: -60px;
`;

const LabelLG = styled.div`
  margin: auto 0;
  font: 700 24px Inter, sans-serif;
`;

const LabelMd = styled.div`
  font: 400 20px Inter, sans-serif;
`;

export const ManageFactory = () => {
  const [FactorySelected, setFactorySelected] = useState(false);

  const [factoryList, setFactoryList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const { user } = useContext(UserContext);
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

  const handleToggleDisableEnable = async (index) => {
    const facto_id = factoryList[index].factory_id;
    try {
      const response = await axios.put(
        `${url}/put_change_facto_status`,
        {
          facto_id: facto_id,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("successful:", response.data);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [filteredData, setFilteredData] = useState([]);
  const showFilteredData = (filteredData) => {
    console.log("Filtered Data: ", filteredData);
    setFilteredData(filteredData);
  };

  // ----------------------------------------------------------------
  const handleRemoveClickYes = async () => {
    try {
      const response = await axios.delete(`${url}/factory`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          facto_id: FactorySelectedData.factory_id,
        },
      });
      console.log("Delete successful:", response.data);
      setShowPopup(false);
      fetchData();
    } catch (error) {
      console.error("Error Delete:", error);
    }
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

      <ContainerRemoveFactory>
        <ContainerLabel>
          <LabelLG>Factory Name</LabelLG>
          <ContentLabel>
            <LabelLG>Factory Location</LabelLG>
            <LabelMd>SubDistrict - District - Province</LabelMd>
          </ContentLabel>
        </ContainerLabel>
        {filteredData.map((factory, index) => (
          <FactoryDetail key={index}>
            <FactoryName>{factory.factory_name}</FactoryName>
            <LocData>
              {factory.factory_details.replace(/_/g, " - ")}
              {/* {factory.province} - {factory.district} - {factory.subdistrict} */}
            </LocData>
            <Select onClick={() => handleTogglePopupRemove(factory)}>
              Remove
            </Select>

            <DisableEnable
              enabled={factory.is_disable}
              onClick={() => handleToggleDisableEnable(index)}
            >
              {factory.is_disable === false ? "Disable" : "Enable"}
            </DisableEnable>
          </FactoryDetail>
        ))}
      </ContainerRemoveFactory>
    </>
  );
};

export default ManageFactory;
