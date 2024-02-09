import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./EditProfile.css";
import MenuTools from "../MenuTools/MenuTools";
import { Link } from "react-router-dom";
import NavbarTop from "../NavbarTop/NavbarTop";
import { useNavigate } from "react-router-dom";
const ButtonEnter = styled.button`
  border-radius: 10px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: var(--Important-Button, #0a89ff);
  justify-content: center;
  color: #fff;
  white-space: nowrap;
  margin: 30px 0 0 209px;
  padding: 19px 12px;
  width: 10%;
  font: 700 24px Inter, sans-serif;
  cursor: pointer;
`;

const ContainerEditProfile = styled.div`
  display: flex;
  width: 133vh;
  height: 76vh;
  border: 1px solid red;
  flex-direction: column;

  font: 700 32px Inter, sans-serif;
  padding: 1.5vh 1.5vh 0 1.5vh;
  padding-left: 10vh;
`;

const PasswordInput = styled.input`
  border-radius: 10px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: var(--light, #fafafa);
  width: 20vh;
  max-width: 100%;
  height: 5vh;
  padding: 0 10px;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 400;

  &:focus {
    outline: none;
  }
`;
const RightContainer = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
`;

export const EditProfile = () => {
  const [username, setUsername] = useState("user no.11");
  const navigate = useNavigate();

  function handleClickLogout(event) {
    navigate("/loginsignup");
  }

  return (
    <>
      <MenuTools />

      <RightContainer>
        <NavbarTop pageTitle="Profile" />

        <ContainerEditProfile>
          <div className="Change-Password">Change Password</div>

          <div className="Container-Username">
            <span className="labelUername">Username :</span>
            <span className="username">{username}</span>
          </div>

          <div className="Container-form-group">
            <div className="form-group">
              <label htmlFor="newPassword" className="labelCurrentPassword">
                Current password :
              </label>
              <PasswordInput
                type="password"
                id="newPassword"
                name="newPassword"
                maxLength={20}
                required
              />
              <div className="Maximum-20-character">Maximum 20 character</div>
            </div>

            <div className="form-group">
              <label htmlFor="newPassword" className="labelNewPassword">
                New Password :
              </label>
              <PasswordInput
                type="password"
                id="newPassword"
                name="newPassword"
                maxLength={20}
                required
              />
              <div className="Maximum-20-character">Maximum 20 character</div>
            </div>
          </div>

          <ButtonEnter>Enter</ButtonEnter>

          <button className="LogoutButton" onClick={handleClickLogout}>
            Logout
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b04dbcb18a6e4bed2210e137ee2f7f381084698eb632cf45116fd30b3e6fdcda?apiKey=34584a6259e046a0be0d44044e057cb8&"
              className="img"
            />
          </button>
        </ContainerEditProfile>
      </RightContainer>
    </>
  );
};
