import { upload } from "@testing-library/user-event/dist/upload";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import NavbarTop from "./NavbarTop/NavbarTop";
import TogglePopup from "../Admin/TogglePopup";
import ImageWithRectangles from "../../bounding/ImageWithRectangles";
import LabelImage from "./LabelImage";
import Summary from "./Summary";

const ContainerEditProfile = styled.div`
  display: flex;
  width: 132vh;
  height: 68vh;
  /* border: 1px solid red; */
  flex-direction: row;
  flex-wrap: wrap;
  align-content: start;
  justify-content: start;
  font: 700 32px Inter, sans-serif;
  gap: 1vh;
  border: 1px solid red;
  margin-top: 2vh;
`;

const BigRec = styled.img`
  border: 1px solid red;
  width: 600px;
  height: 657px;
`;

const ContainerSmallRec = styled.div`
  display: flex;
  padding: 20px 30px;
  gap: 30px;
  width: 658px;
  justify-content: space-between;
  height: 658px;
  border: 1px solid blue;
  flex-wrap: wrap;
  flex-direction: row;
  overflow-y: auto;
`;

const ContentSmallRec = styled.div`
  border: 1px solid blue;
  width: 269px;
  /* height: 181px; */
  height: fit-content;

  cursor: pointer;
  position: relative;
`;

const SmallRec = styled.div`
  border: 1px solid red;
  width: 269px;
  height: 151px;
  cursor: pointer;
`;

const Img = styled.img`
  width: 50px;
  fill: #0a89ff;
  position: absolute;
  top: 0;
  right: 0;
`;

const HeadVS = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: 700;
`;

const Line1 = styled.div`
  border-bottom: 1px solid #000;
  width: 130px;
`;

const ContentVerified = styled.div`
  font-family: Inter, sans-serif;
  border-radius: 10px 0px 0px 0px;
  border-top: 1px solid #000;
  border-right: 1px solid #000;
  border-left: 1px solid #000;
  border-bottom: 1px solid #000;
  background-color: var(--frame-color, #f6f6f6);
  justify-content: center;
  padding: 10px 20px;
  color: #9f9f9f;
  ${(props) =>
    props.isSelected &&
    css`
      color: #000;
      border-bottom: none;

      /* background-color: #000; */
    `}
  cursor: pointer;
  transition: all 0.5s ease;
`;

const ContentSummary = styled.div`
  font-family: Inter, sans-serif;
  border-radius: 0px 10px 0px 0px;
  border-top: 1px solid #000;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  background-color: var(--frame-color, #f6f6f6);
  color: #9f9f9f;
  padding: 10px 20px;
  ${(props) =>
    props.isSelected &&
    css`
      color: #000;
      border-bottom: none;
      /* background-color: #000; */
    `}
  cursor: pointer;
  transition: all 0.5s ease;
`;

const Line2 = styled.div`
  border-bottom: 1px solid #000;
  width: 100%;
`;

const Div = styled.div`
  font-family: Inter, sans-serif;
  background-color: #000;
  color: white;
  font-size: 24px;
`;

const imgBack =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/de6a5fb1856d3b714a3c91e51d65fea4bc8b861e6dda41a96cdbd213fbbf6ef4?apiKey=34584a6259e046a0be0d44044e057cb8&";
const imgVerified =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/8136dc1d4a7187d64fad29f59cd3285157f97f06b9257a37205da26bd618700f?apiKey=34584a6259e046a0be0d44044e057cb8&";

export const VerifySummary = ({
  buildingDataW,
  onBackClick,
  handlepageChange,
}) => {
  const [selectedSection, setSelectSection] = useState("Verify");

  const [selectedImage, setSelectImage] = useState(null);

  const handleSection = (section) => {
    setSelectSection(section);
  };

  const handleSelectedImage = (data) => {
    setSelectImage(data);
  };

  const onBackClickThis = () => {
    setSelectImage(null);
  };

  const handlepage = (data) => {
    handlepageChange(data);
  };

  return (
    <>
      {selectedImage === null ? (
        <>
          <NavbarTop
            pageTitle={buildingDataW}
            changeStatePage={handlepage}
            onBackClick={onBackClick}
          />

          <HeadVS>
            <Line1 />
            <ContentVerified
              isSelected={selectedSection === "Verify"}
              onClick={() => handleSection("Verify")}
            >
              Verify
            </ContentVerified>

            <ContentSummary
              isSelected={selectedSection === "Summary"}
              onClick={() => handleSection("Summary")}
            >
              Summary
            </ContentSummary>
            <Line2 />
          </HeadVS>

          {selectedSection === "Verify" && (
            <ContainerEditProfile>
              <BigRec />

              <ContainerSmallRec>
                <ContentSmallRec>
                  <SmallRec onClick={() => handleSelectedImage("/img1")} />
                  <Img src={imgVerified} />
                  <Div>Defect : 40</Div>
                </ContentSmallRec>

                
              </ContainerSmallRec>
            </ContainerEditProfile>
          )}

          {selectedSection === "Summary" && (
            <>
              <Summary />
            </>
          )}
        </>
      ) : (
        <>
          <LabelImage
            imgData={selectedImage}
            onBackClick={onBackClickThis}
            handlepageChange={handlepage}
          />
        </>
      )}
    </>
  );
};

export default VerifySummary;
