import React, { useState } from "react";
import styled from "styled-components";
import NavbarTop from "./NavbarTop/NavbarTop";
import TogglePopup from "../Admin/TogglePopup";
import ViewUploadFile from "./ViewUploadFile";
const ContainerEditProfile = styled.div`
  display: flex;
  width: 132vh;
  height: 76vh;
  /* border: 1px solid red; */
  flex-direction: row;
  flex-wrap: wrap;
  align-content: start;
  font: 700 32px Inter, sans-serif;
  padding: 1.5vh 1.5vh 0 1.5vh;
  padding-left: 5vh;
  gap: 1vh;
`;

const Label = styled.div`
  display: flex;
  color: #000;
  gap: 20px;
  font-size: 24px;
  margin-top: 24px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  width: 100%;
  height: 60px;
  /* border: 1px solid red; */
`;

const ButtonNew = styled.div`
  border-radius: 10px;
  background-color: var(--Important-Button, #0a89ff);
  display: flex;
  gap: 12px;
  color: var(--light, #fafafa);
  font-weight: 700;
  white-space: nowrap;
  padding: 14px 18px;
  margin-left: auto;
  margin-right: 58px;
`;

const Img = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 20px;
  fill: #fafafa;
`;

const ContainerDate = styled.div`
  border-radius: 10px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: #fff;
  width: 380px;
  height: 200px;
  padding: 16px 20px;
  gap: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentDate = styled.div`
  /* border: 1px solid red; */
  display: flex;

  flex-direction: column;
  align-items: center;
  font-size: 24px;
  color: #000;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  gap: 10px;
`;

const LabelDate = styled.div`
  color: var(--stork, #9f9f9f);
  font-family: Inter, sans-serif;
`;

const Date = styled.div`
  font-family: Inter, sans-serif;
`;

const ContainerButton = styled.div`
  width: 30%;
  font-size: 24px;
`;

const ButtonView = styled.div`
  font-family: Inter, sans-serif;
  border-radius: 10px;
  background-color: #0a89ff;
  justify-content: center;
  color: #fff;
  padding: 14px 11px;
  font-size: 24px;
  cursor: pointer;
`;

const ButtonDelete = styled.div`
  font-family: Inter, sans-serif;
  border-radius: 10px;
  border: 2px solid var(--Important-Button, #0a89ff);
  margin-top: 23px;
  justify-content: center;
  color: #0a89ff;
  padding: 15px 11px;
  font-size: 24px;
`;

export const AllDataHistory = ({
  factoryData,
  buildingData,
  handlepageChange,
  showUploadFile,
}) => {
  const handlepage = (data) => {
    handlepageChange(data);
  };

  const handleUpload = (data) => {
    // setUploadFile(data);
    setUploadFile(true);
  };

  const [uploadFile, setUploadFile] = useState(false);

  return (
    <>
      <NavbarTop pageTitle={buildingData} changeStatePage={handlepage} />
      {uploadFile === false ? (
        <>
          <ContainerEditProfile>
            <Label>
              All data history
              
              <ButtonNew>
                <Img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5b7e66065244b64608b7f730498d9aab94fd4597cb181dbb3df8847800e605b?apiKey=34584a6259e046a0be0d44044e057cb8&"
                />
                new
              </ButtonNew>
            </Label>

            <ContainerDate>
              <ContentDate>
                <LabelDate>day - month - year</LabelDate>
                <Date>30 - 12 - 24</Date>
                <LabelDate>Time</LabelDate>
                <Date>13 : 04</Date>
              </ContentDate>

              <ContainerButton>
                <ButtonView onClick={handleUpload}>Upload</ButtonView>
                <ButtonDelete>Delete</ButtonDelete>
              </ContainerButton>
            </ContainerDate>
          </ContainerEditProfile>
        </>
      ) : (
        <ViewUploadFile />
      )}
    </>
  );
};

export default AllDataHistory;
