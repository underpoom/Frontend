import React, { useState, useContext } from "react";
import styled from "styled-components";

import TogglePopup from "./TogglePopup";
import axios from "axios";
import { UserContext, url } from "../../bounding/UserContext";

const ContainerChangePassword = styled.div`
  display: flex;
  max-height: 100%;

  flex-direction: column;
  padding: 0px 0px 39px 0px;
  overflow-y: auto;
`;

const ContentChangePassword = [
  styled.div`
    border-radius: 20px;
    border: 1px solid var(--stork, #9f9f9f);
    background-color: var(--frame-color, #f6f6f6);
    display: flex;
    margin-top: 30px;
    flex-direction: column;
    padding: 39px 48px;
    font: 700 24px Inter, sans-serif;
    align-items: start;
  `,
  styled.div`
    border-radius: 20px;
    border: 1px solid var(--stork, #9f9f9f);
    background-color: var(--frame-color, #f6f6f6);
    display: flex;
    margin-top: 30px;
    flex-direction: column;
    padding: 39px 48px;
    font: 700 24px Inter, sans-serif;
    align-items: start;
  `,
];

const UsernameContent = styled.div`
  display: flex;
  margin-top: 5vh;
  gap: 20px;
  font-size: 24px;
  white-space: nowrap;
  font-weight: 700;
`;

const UsernameData = styled.div`
  font-family: Inter, sans-serif;
  font-weight: 400;
  flex-grow: 1;
`;

const NewPasswordContent = styled.div`
  display: flex;
  margin-top: 3vh;
  max-width: 100%;
  justify-content: space-between;
  gap: 20px;
  white-space: nowrap;
  flex-grow: 1;
  font: 700 24px Inter, sans-serif;
`;

const PasswordInputContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
  font-size: 16px;
  font-weight: 400;
`;

const Submit = styled.div`
  border-radius: 10px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: var(--Important-Button, #0a89ff);
  align-self: end;

  justify-content: center;
  color: #fff;
  white-space: nowrap;
  padding: 21px 25px;
  font: 700 24px Inter, sans-serif;
  cursor: pointer;
`;

const PasswordInput = styled.input`
  margin-top: -1vh;
  border-radius: 10px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: var(--light, #fafafa);
  width: 39vh;
  max-width: 100%;
  height: 5vh;
  padding: 0 10px;
  font-family: Inter, sans-serif;
  font-size: 24px;
  font-weight: 400;
  margin-left: 1vh;

  &:focus {
    outline: none;
  }
`;

const Maximum20character = styled.div`
  display: flex;

  flex-basis: 0%;
  flex-direction: column;
  font-size: 16px;
  font-weight: 400;
  font-family: Inter, sans-serif;
  margin: 15px 0 0 0vh;
`;

const NavbarTopAdminContainer = styled.div`
  display: flex;
  height: 14vh;
  width: 132vh;
  /* border: 1px solid #f24e1e; */
  margin: 5vh 5vh 0 0;
  align-items: center;
  padding-right: 2vh;
`;

const PageTitleAdmin = styled.div`
  /* border: 1px solid #f24e1e; */
  font-size: xx-large;
  font-weight: 700;
  margin-right: auto;
  font-size: 40px;
`;

const Img = styled.img`
  aspect-ratio: 0.57;
  object-fit: auto;
  object-position: center;
  width: 20px;
  fill: #000;
  margin-right: 2vh;
  cursor: pointer;
`;

const BlackLine = styled.div`
  background-color: black;
  height: 2px;
`;

const imgBack =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/de6a5fb1856d3b714a3c91e51d65fea4bc8b861e6dda41a96cdbd213fbbf6ef4?apiKey=34584a6259e046a0be0d44044e057cb8&";

export const ChangeRoleAndPassword = ({ userData, onBackClick }) => {
  const { user } = useContext(UserContext);

  const [newPassword, setNewPassword] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");

  const handleClickSubmit = () => {
    setShowPopup(true);
    setPopupContent("Do you want to change this user’s password?");

  };

  // ----------------------------------------------------------------

  const handleClickYes = async () => {
    try {
      const response = await axios.put(
        `${url}/admin_change_password`,
        {
          username: userData.username,

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
      setShowPopup(false);
    } catch (error) {
      console.error("Error change_password:", error);
    }
  };

  return (
    <>
      {showPopup && (
        <TogglePopup
          content={popupContent}
          onClose={() => setShowPopup(false)}
          onYes={handleClickYes}
        />
      )}

      <NavbarTopAdminContainer>
        <Img src={imgBack} onClick={onBackClick}></Img>
        <PageTitleAdmin>Change Password</PageTitleAdmin>
      </NavbarTopAdminContainer>

      <BlackLine />

      <ContainerChangePassword>
        <ContentChangePassword>
          Change user’s password
          <UsernameContent>
            Username :<UsernameData>{userData.username}</UsernameData>
          </UsernameContent>
          <NewPasswordContent>
            New password :
            <PasswordInputContent>
              <PasswordInput
                type="password"
                id="newPassword"
                name="newPassword"
                maxLength={20}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Maximum20character>Maximum 20 character</Maximum20character>
            </PasswordInputContent>
          </NewPasswordContent>
          <Submit onClick={handleClickSubmit}>Submit</Submit>
        </ContentChangePassword>

      </ContainerChangePassword>
    </>
  );
};

export default ChangeRoleAndPassword;
