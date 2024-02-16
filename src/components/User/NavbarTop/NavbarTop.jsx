import React, { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ContainerNavbarTop = styled.div`
  display: flex;
  height: 14vh;
  width: 133vh;
  border: 1px solid #f24e1e;
  margin: 5vh 5vh 0 0;
  align-items: center;
  padding-right: 2vh;
`;

const PageTitle = styled.div`
  margin-left: 5vh;
  border: 1px solid #f24e1e;
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
  border: 1px solid #f24e1e;
  margin-right: 2vh;
`;
const ImgInfo = styled.div`
  border: 1px solid #f24e1e;
  margin-right: 2vh;
`;

export const NavbarTop = ({ pageTitle, changeStatePage }) => {
  const handleChangeStatePageClick = (data) => {
    changeStatePage(data);
    console.log(data);
  };

  return (
    <>
      <ContainerNavbarTop>
        <PageTitle>{pageTitle}</PageTitle>

        {pageTitle !== "Information" ? (
          <ImgUser onClick={() => handleChangeStatePageClick({pageTitle})}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ba22acfd395cddb5e3dcc608a6e5734b6ab4bff5f82e55298e97962e0f7f9a6?apiKey=34584a6259e046a0be0d44044e057cb8&" />
          </ImgUser>
        ) : (
          <div></div>
        )}
        {/* <ImgUser onclick={() => handleChangeStatePageClick("yoyo")}>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ba22acfd395cddb5e3dcc608a6e5734b6ab4bff5f82e55298e97962e0f7f9a6?apiKey=34584a6259e046a0be0d44044e057cb8&" />
        </ImgUser> */}
        {/* <ImgUser onClick={() => handleChangeStatePageClick("Edit Profile")}>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ba22acfd395cddb5e3dcc608a6e5734b6ab4bff5f82e55298e97962e0f7f9a6?apiKey=34584a6259e046a0be0d44044e057cb8&" />
        </ImgUser> */}

        {/* {pageTitle !== "Profile" ? (
          <Link to="/information">
            <ImgInfo>
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc0d1efaa0d1fa35e23f255d7067960837e6f664a2a32dd1b5e537d878c5aa91?apiKey=34584a6259e046a0be0d44044e057cb8&" />
            </ImgInfo>
          </Link>
        ) : (
          <></>
        )} */}
      </ContainerNavbarTop>
      <BlackLine />
    </>
  );
};
export default NavbarTop;
