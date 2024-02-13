import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavbarTopAdmin from "./NavbarTopAdmin/NavbarTopAdmin";
import TogglePopup from "./TogglePopup";

const ContainerRemoveFactory = styled.div`
  display: flex;
  height: 76vh;
  /* border: 1px solid red; */
  flex-direction: row;
  aspect-ratio: 1;
  overflow-y: auto;
  flex-wrap: wrap;
  column-gap: 38px;
`;

const FactoryDetail = styled.div`
  border-radius: 10px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: #d9d9d9;
  display: flex;

  flex-direction: column;
  font-size: 20px;
  color: #000;
  font-weight: 700;
  width: 30vh;
  height: 35vh;
  padding: 3vh 2vh 2vh 2vh;
  margin-top: 2vh;
`;

const FactoryName = styled.div`
  align-self: center;
  font: 400 24px Inter, sans-serif;
  margin-bottom: 5vh;
`;

const LocLabel = styled.div`
  display: flex;
  align-items: center;
  font-family: Inter, sans-serif;
  margin-top: 13px;
  white-space: nowrap;
`;

const LocData = styled.div`
  display: flex;
  justify-content: center;
  font-family: Inter, sans-serif;
  white-space: nowrap;
  font: 400 20px Inter, sans-serif;
  margin-left: 5px;
  /* border: 1px solid red; */
`;

const Select = styled.div`
  border-radius: 10px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: var(--Important-Button, #0a89ff);
  align-self: center;
  margin-top: 21px;
  justify-content: center;
  color: #fff;
  white-space: nowrap;
  padding: 14px 31px;
  font: 24px Inter, sans-serif;
  cursor: pointer;
`;

const imgRemove =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/3f4c9b5db1e7a6ff8ec6827ec31de5c2c1e83625984ea6446bcdc670a3524c4b?apiKey=34584a6259e046a0be0d44044e057cb8&";
const imgAdd =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/d1573c1f4387e34454945052c6340580dd716ebf34149be2676f645bc373c6de?apiKey=34584a6259e046a0be0d44044e057cb8&";
const imgBack =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/de6a5fb1856d3b714a3c91e51d65fea4bc8b861e6dda41a96cdbd213fbbf6ef4?apiKey=34584a6259e046a0be0d44044e057cb8&";

export const RemoveFactory = () => {
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

      <NavbarTopAdmin pageTitle="Remove Factory" />
      <ContainerRemoveFactory>
        {factoryList.map((factory, index) => (
          <FactoryDetail key={index}>
            <FactoryName>{factory.name}</FactoryName>
            <LocLabel>
              Province : <LocData>{factory.province}</LocData>
            </LocLabel>
            <LocLabel>
              District : <LocData>{factory.district}</LocData>
            </LocLabel>
            <LocLabel>
              Sub-District : <LocData>{factory.subdistrict}</LocData>
            </LocLabel>

            <Select onClick={() => handleTogglePopupRemove(factory)}>
              Remove
            </Select>
          </FactoryDetail>
        ))}
      </ContainerRemoveFactory>
    </>
  );
};

export default RemoveFactory;
