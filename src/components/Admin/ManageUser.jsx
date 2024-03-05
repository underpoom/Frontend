import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MenuToolsAdmin } from "./MenuToolsAdmin/MenuToolsAdmin";
import { NavbarTopAdmin } from "./NavbarTopAdmin/NavbarTopAdmin";
import { useNavigate } from "react-router-dom";
import ChangeRoleAndPassword from "./ChangeRoleAndPassword";
import TogglePopup from "./TogglePopup";
import axios from "axios";
import { handleDownload } from "../../utils/downloadUtils";
import { UserContext, url } from "../../bounding/UserContext";

const ContainerManageUser = styled.div`
  display: flex;
  height: 76vh;
  flex-direction: column;
  padding: 0px 0px 39px 0px;
  overflow-y: auto;
`;

const LabelHeadContainer = styled.div`
  align-items: center;
  border-bottom: 1px solid var(--stork, #9f9f9f);
  background-color: var(--stork, #9f9f9f);
  display: flex;
  margin-top: 25px;
  font-size: 24px;
  color: #fff;
  font-weight: 700;
  padding: 11px 26px;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const LabelHeadUsername = styled.div`
  font: 700 24px/1.5 Inter, sans-serif;
  color: #fff;
`;

const LabelHeadFirstname = styled.div`
  font: 700 24px/1.5 Inter, sans-serif;
  color: #fff;
  margin-left: 44px;
`;

const LabelHeadSurname = styled.div`
  font: 700 24px/1.5 Inter, sans-serif;
  color: #fff;
  margin-left: 48px;
`;

const LabelHeadEmailAddress = styled.div`
  font: 700 24px/1.5 Inter, sans-serif;
  color: #fff;
  margin-left: 150px;
`;

const LabelHeadChangePassword = styled.div`
  font: 700 24px/1.5 Inter, sans-serif;
  color: #fff;
  margin-left: 130px;
  width: 120px;
`;

const LabelHeadVF = styled.div`
  font: 700 24px/1.5 Inter, sans-serif;
  color: #fff;
  margin-left: 40px;
  width: 85px;
`;

const ContentUser = styled.div`
  align-items: center;
  border-bottom: 1px solid var(--stork, #9f9f9f);
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 20px;
  color: #000;
  font-weight: 400;
  padding: 5px 30px;
`;

const [RowUserData, RowUserDataEmail] = [
  styled.div`
    text-align: center;
    font-family: Inter, sans-serif;
    /* border: 1px solid red; */
    width: 9%;
    word-wrap: break-word;
  `,
  styled.div`
    text-align: center;
    font-family: Inter, sans-serif;
    /* border: 1px solid red; */
    width: 30%;
  `,
];

const [DownloadAttatchedFileButton, ChangePasswordButton] = [
  styled.div`
    border-radius: 10px;
    border: 1px solid var(--Important-Button, #0a89ff);
    background-color: var(--light, #fafafa);
    justify-content: center;
    color: #0a89ff;
    padding: 10px 15px;
    font: 16px Inter, sans-serif;
    cursor: pointer;
    width: fit-content;
  `,
  styled.div`
    border-radius: 10px;
    border: 1px solid var(--Important-Button, #0a89ff);
    background-color: var(--light, #fafafa);
    justify-content: center;
    color: #0a89ff;
    padding: 10px 15px;
    font: 16px Inter, sans-serif;
    cursor: pointer;
    width: fit-content;
  `,
];

const ImgDeleteButton = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  cursor: pointer;
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: var(--frame-color, #f6f6f6);
  max-width: 494px;
  font-size: 32px;
  font-weight: 400;
  text-align: center;
  padding: 27px 14px;
  justify-content: space-between;
`;

const ButtonYesNoContainer = styled.button`
  display: flex;
  justify-content: space-between;
  border: 1px solid transparent;
  width: 42vh;
  margin-top: 2vh;
`;

const ButtonYesNo = styled.button`
  font-family: Inter, sans-serif;
  border-radius: 10px;
  border: 1px solid var(--Important-Button, #0a89ff);
  justify-content: center;
  align-items: center;
  color: var(--Important-Button, #0a89ff);
  padding: 9px 60px;

  cursor: pointer;

  &:hover {
    color: #e0e0e0; /* Add your desired background color */
    background-color: var(--Important-Button, #0a89ff);
  }
`;

const imgDelete =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/18eef55ac0ff935d3d1cc639329aaf0d3ea795f9696368faf6799ced72cdfa6b?apiKey=34584a6259e046a0be0d44044e057cb8&";

export const ManageUser = (props) => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/get_user_verified`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log("successful:", response.data);
      setUserData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [editedIndex, setEditedIndex] = useState(null);

  const togglePopup = (index) => {
    setEditedIndex(index);
  };

  const closePopup = () => {
    setEditedIndex(null);
  };

  const [selectedUser, setSelectedUser] = useState(null);
  const [showChangeRoleAndPassword, setShowChangeRoleAndPassword] =
    useState(false);

  const handleChangeRoleButtonClick = (user) => {
    setSelectedUser(user);
    setShowChangeRoleAndPassword(true);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
    setShowChangeRoleAndPassword(false);
    setFilteredData(userData);
  };

  const [filteredData, setFilteredData] = useState([]);
  const showFilteredData = (filteredData) => {
    console.log("Filtered Data: ", filteredData);
    setFilteredData(filteredData);
  };

  const [userSelected, setUserSelected] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");

  const handleDeleteClick = (user) => {
    setShowPopup(true);
    setPopupContent("Do you want to delete this user?");
    setUserSelected(user.username);
  };

  const handleClickYes = async () => {
    try {
      const response = await axios.delete(`${url}/user/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          username: userSelected,
        },
      });
      console.log("successful:", response.data);
      setShowPopup(false);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDownloadClick = (userData) => {
    handleDownload(userData, user.token);
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

      {showChangeRoleAndPassword ? (
        <ChangeRoleAndPassword
          userData={selectedUser}
          onBackClick={handleBackClick}
        />
      ) : (
        <>
          <NavbarTopAdmin
            pageTitle="Manage User"
            currentData={userData}
            filteredData={showFilteredData}
          />
          <ContainerManageUser>
            <LabelHeadContainer>
              <LabelHeadUsername>Username</LabelHeadUsername>
              <LabelHeadFirstname>Firstname</LabelHeadFirstname>
              <LabelHeadSurname>Surname</LabelHeadSurname>
              <LabelHeadEmailAddress>Email Address</LabelHeadEmailAddress>
              <LabelHeadChangePassword>Change Password</LabelHeadChangePassword>
              <LabelHeadVF>Verified File</LabelHeadVF>
            </LabelHeadContainer>

            {filteredData.map((user, index) => (
              <ContentUser key={index}>
                {/* <RowUsername>{user.username}</RowUsername>
                <RolRole>{user.role}</RolRole> */}
                <RowUserData>{user.username}</RowUserData>

                <RowUserData>{user.firstname}</RowUserData>
                <RowUserData>{user.surname}</RowUserData>
                <RowUserDataEmail>{user.email}</RowUserDataEmail>

                <ChangePasswordButton
                  onClick={() => handleChangeRoleButtonClick(user)}
                >
                  Change
                </ChangePasswordButton>
                <DownloadAttatchedFileButton
                  onClick={() => handleDownloadClick(user)}
                >
                  Download
                </DownloadAttatchedFileButton>
                <ImgDeleteButton
                  src={imgDelete}
                  onClick={() => handleDeleteClick(user)}
                />
              </ContentUser>
            ))}
          </ContainerManageUser>
        </>
      )}
    </>
  );
};

export default ManageUser;
