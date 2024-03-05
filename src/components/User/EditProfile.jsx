import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import MenuTools from "./MenuTools/MenuTools";
import { Link } from "react-router-dom";
import NavbarTop from "./NavbarTop/NavbarTop";
import TogglePopup from "../Admin/TogglePopup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext, url } from "../../bounding/UserContext";

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
  width: 132vh;
  height: 76vh;
  /* border: 1px solid red; */
  flex-direction: column;

  font: 700 32px Inter, sans-serif;
  padding: 1.5vh 1.5vh 0 1.5vh;
  padding-left: 10vh;
`;

const PasswordInput = styled.input`
  border-radius: 10px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: var(--light, #fafafa);
  width: 26vh;
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

const ChangePassword = styled.div`
  margin-bottom: 4vh;
  align-self: flex-start;
`;

const ContainerUsername = styled.div`
  display: flex;
  font-size: 24px;
  height: 80px;
  width: 60vh;
  background: transparent;
  padding-top: 5px;
  font: 700 24px Inter, sans-serif;
`;

const LabelUsername = styled.span`
  margin-left: 10.5vh;
`;

const Username = styled.span`
  margin-left: 5vh;
`;

const FormGroup = styled.div`
  /* border: 1px solid red; */
  width: 60vh;
  height: 100px;
  flex-grow: 1;
  font: 700 24px Inter, sans-serif;
  align-content: start;
`;

const Maximum20Character = styled.div`
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
  font-size: 16px;
  font-weight: 400;
  font-family: Inter, sans-serif;
  margin: 15px 0 0 24vh;
`;

const LogoutButton = styled.button`
  border-radius: 10px;
  border: 2px solid var(--Important-Button, #0a89ff);
  background-color: var(--frame-color, #f6f6f6);
  align-self: end;
  display: flex;
  font-size: 32px;
  color: var(--Important-Button, #0a89ff);
  font-weight: 700;
  white-space: nowrap;
  padding: 16px 6px 16px 23px;
  margin-top: 17vh;
`;

const LabelCurrentPassword = styled.label`
  margin-bottom: 0.5rem;
  margin-right: 5vh;
  margin-left: -4vh;
`;
const LabelNewPassword = styled.label`
  margin-bottom: 0.5rem;
  margin-right: 5vh;
`;

export const EditProfile = ({ handlepageChange }) => {
  const [username, setUsername] = useState("user no.11");
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const { user } = useContext(UserContext);

  function handleClickLogout(event) {
    navigate("/loginsignup");
  }

  const handlepage = (data) => {
    handlepageChange(data);
  };

  const handleClickSubmit = () => {
    setShowPopup(true);
    setPopupContent("Do you want to change password?");
  };

  const handleClickYes = async () => {
    try {
      const response = await axios.put(
        `${url}/put_change_password`,
        {
          username: user.username,
          old_password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("change_password successful:", response.data);
      // setCurrentPassword("");
      // setNewPassword("");
      setShowPopup(false);
    } catch (error) {
      console.error("Error change_password:", error);
    }
  };

  console.log(newPassword)

  return (
    <>
      {showPopup && (
        <TogglePopup
          content={popupContent}
          onClose={() => setShowPopup(false)}
          onYes={handleClickYes}
        />
      )}
      <NavbarTop pageTitle="Profile" changeStatePage={handlepage} />
      <ContainerEditProfile>
        <ChangePassword>Change Password</ChangePassword>

        <ContainerUsername>
          <LabelUsername>Username :</LabelUsername>
          <Username>{user.username}</Username>
        </ContainerUsername>

        <FormGroup>
          <LabelCurrentPassword>Current password :</LabelCurrentPassword>
          <PasswordInput
            type="password"
            maxLength={20}
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Maximum20Character>Maximum 20 character</Maximum20Character>
        </FormGroup>

        <FormGroup>
          <LabelNewPassword>New Password :</LabelNewPassword>
          <PasswordInput
            type="password"
            maxLength={20}
            required
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Maximum20Character>Maximum 20 character</Maximum20Character>
        </FormGroup>

        <ButtonEnter onClick={handleClickSubmit}>Enter</ButtonEnter>

        <LogoutButton onClick={handleClickLogout}>
          Logout
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b04dbcb18a6e4bed2210e137ee2f7f381084698eb632cf45116fd30b3e6fdcda?apiKey=34584a6259e046a0be0d44044e057cb8&" />
        </LogoutButton>
      </ContainerEditProfile>
    </>
  );
};
