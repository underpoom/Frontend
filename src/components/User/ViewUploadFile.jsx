import { upload } from "@testing-library/user-event/dist/upload";
import React, { useState } from "react";
import styled from "styled-components";
import NavbarTop from "./NavbarTop/NavbarTop";
import TogglePopup from "../Admin/TogglePopup";

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
const LabelLg = styled.div`
  color: #9f9f9f;
  font-family: Inter, sans-serif;
`;
const LabelMd = styled.div`
  color: #9f9f9f;
  font-family: Inter, sans-serif;
  margin-top: 40px;
  margin-left: -490px;

`;

const Div = styled.div`
  border-radius: 10px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 21px 16px;
  font-size: 20px;
  margin-top: 15px;
  width: 250px;

`;



const ImgDelete = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 22px;
  stroke-width: 1.5px;
  stroke: #000;
  align-self: start;
`;

export const ViewUploadFile = () => {
  return (
    <>
      <ContainerEditProfile>
        <Label>
          Upload File
          <LabelLg>(Upload only .mp4 and .srt file)</LabelLg>
          <LabelMd>
            Your .srt file must have same name as your .mp4 file.
          </LabelMd>
          <ButtonNew>
            <Img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5b7e66065244b64608b7f730498d9aab94fd4597cb181dbb3df8847800e605b?apiKey=34584a6259e046a0be0d44044e057cb8&"
            />
            Upload
          </ButtonNew>
        </Label>

        <Div>
          DJI_040.mp4
          <ImgDelete
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c37a1b1202a409c4cc0de55bac3f84cca354a05c7465d097599fe377b80d6f35?apiKey=34584a6259e046a0be0d44044e057cb8&"
          />
        </Div>

        <Div>
          DJI_040.mp4
          <ImgDelete
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c37a1b1202a409c4cc0de55bac3f84cca354a05c7465d097599fe377b80d6f35?apiKey=34584a6259e046a0be0d44044e057cb8&"
          />
        </Div>
      </ContainerEditProfile>
    </>
  );
};

export default ViewUploadFile;
