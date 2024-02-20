
import React, { useState } from "react";
import styled from "styled-components";
import NavbarTop from "./NavbarTop/NavbarTop";
import ImageWithRectangles from "../../bounding/ImageWithRectangles";
import TogglePopup from "../Admin/TogglePopup";

const ContainerEditProfile = styled.div`
  display: flex;
  width: 132vh;
  height: 76vh;
  /* border: 1px solid red; */
  flex-wrap: wrap;
  justify-content: start;
  align-content: center;
  align-items: center;
  font: 700 32px Inter, sans-serif;
  /* border: 1px solid red; */

`;

const imgBack =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/de6a5fb1856d3b714a3c91e51d65fea4bc8b861e6dda41a96cdbd213fbbf6ef4?apiKey=34584a6259e046a0be0d44044e057cb8&";
export const LabelImage = ({ imgData, onBackClick, handlepageChange }) => {
  const handlepage = (data) => {
    handlepageChange(data);
  };
  return (
    <>
      <NavbarTop
        pageTitle={imgData}
        changeStatePage={handlepage}
        onBackClick={onBackClick}
      />
 

      <ContainerEditProfile>
        <ImageWithRectangles />
      </ContainerEditProfile>
    </>
  );
};

export default LabelImage;
