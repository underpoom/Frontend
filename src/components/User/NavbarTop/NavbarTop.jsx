import React, { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const ContainerNavbarTop = styled.div`
  display: flex;
  height: 14vh;
  width: 132vh;
  /* border: 1px solid #f24e1e; */
  margin: 5vh 5vh 0 0;
  align-items: center;
  padding-right: 2vh;
`;

const PageTitle = styled.div`
  margin-left: 5vh;
  /* border: 1px solid #f24e1e; */
  font-size: xx-large;
  font-weight: 700;
  margin-right: auto;
  font-size: 40px;
`;
const BlackLine = styled.div`
  background-color: black;
  height: 2px;
`;
const ImgUser = styled.div`
  /* border: 1px solid #f24e1e; */
  margin-right: 2vh;
`;
const ImgInfo = styled.div`
  /* border: 1px solid #f24e1e; */
  margin-right: 2vh;
`;

export const NavbarTop = ({ pageTitle, changeStatePage }) => {
  const handleChangeStatePageClick = (data) => {
    changeStatePage(data);
    // console.log(data);
  };

  return (
    <>
      <ContainerNavbarTop>
        <PageTitle>{pageTitle}</PageTitle>

        <ImgInfo onClick={() => handleChangeStatePageClick("Information")}>
          {pageTitle === "Information" ? (
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e248c2658ec620030d6ddc446de21fd72d27ad14dccf12b65e1697db4a475c8c?apiKey=34584a6259e046a0be0d44044e057cb8&" />
          ) : (
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c92ff2af5b0d173d91d02a058813595b68f797389fe34a0414f346a8747ed68?apiKey=34584a6259e046a0be0d44044e057cb8&" />
          )}
        </ImgInfo>

        <ImgUser onClick={() => handleChangeStatePageClick("Profile")}>
          {pageTitle === "Profile" ? (
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b851efcab4cac9e51d54b81393bd5a08505b8b1d0de83b87cb9a9a4511cf8f8b?apiKey=34584a6259e046a0be0d44044e057cb8&" />
          ) : (
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ba22acfd395cddb5e3dcc608a6e5734b6ab4bff5f82e55298e97962e0f7f9a6?apiKey=34584a6259e046a0be0d44044e057cb8&" />
          )}
        </ImgUser>
      </ContainerNavbarTop>
      <BlackLine />
    </>
  );
};
export default NavbarTop;
