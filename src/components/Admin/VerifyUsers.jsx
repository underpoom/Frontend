import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MenuToolsAdmin } from "./MenuToolsAdmin/MenuToolsAdmin";
import { NavbarTopAdmin } from "./NavbarTopAdmin/NavbarTopAdmin";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleDownload } from "../../utils/downloadUtils";

const ContainerVerifyUsers = styled.div`
  display: flex;
  height: 76vh;
  /* border: 1px solid red; */
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
  margin-left: 60px;
`;

const LabelHeadSurname = styled.div`
  font: 700 24px/1.5 Inter, sans-serif;
  color: #fff;
  margin-left: 60px;
`;

const LabelHeadEmailAddress = styled.div`
  font: 700 24px/1.5 Inter, sans-serif;
  color: #fff;
  margin-left: 170px;
`;

const LabelHeadVF = styled.div`
  font: 700 24px/1.5 Inter, sans-serif;
  color: #fff;
  margin-left: 145px;
  width: 130px;
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

const [DownloadAttatchedFileButton] = [
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

const ImgAcceptButton = styled.img`
  object-fit: auto;
  object-position: center;
  cursor: pointer;
  margin-right: -4vh;
`;

const ImgDeclineButton = styled.img`
  object-fit: auto;
  object-position: center;
  cursor: pointer;
`;

const imgDelete =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/18eef55ac0ff935d3d1cc639329aaf0d3ea795f9696368faf6799ced72cdfa6b?apiKey=34584a6259e046a0be0d44044e057cb8&";
const imgAccept =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/2e70134ea7583f3f1d7b1f61bd3b7d793544a6a43126197227c7e9262e37a42f?apiKey=34584a6259e046a0be0d44044e057cb8&";
const imgDecline =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/62677d4b6ebc244193baff60fc84f6e49eadd3dfb8518eec2f2ec25565916ec2?apiKey=34584a6259e046a0be0d44044e057cb8&";

export const VerifyUsers = (props) => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [editedIndexAccept, setEditedIndexAccept] = useState(null);
  const [editedIndexDecline, setEditedIndexDecline] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/get_user_unverified");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUserData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const closePopupAccept = () => {
    setEditedIndexAccept(null);
  };

  const closePopupDecline = () => {
    setEditedIndexDecline(null);
  };

  const togglePopupDecline = (user) => {
    setEditedIndexDecline(user);
    setUserSelected(user.username);
  };
  const togglePopupAccept = (user) => {
    setEditedIndexAccept(user);
    setUserSelected(user.username);
  };

  const handleAcceptClickYes = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/put_verified`, {
        verified: true,
        username: userSelected,
      });
      console.log("Delete successful:", response.data);
      
      closePopupAccept();
      fetchData();
    } catch (error) {
      console.error("Error Delete:", error);
    }
   
  };

  const handleDeclineClickYes = async () => {

    try {
      const response = await axios.delete(`http://127.0.0.1:8000/user/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          username: userSelected,
        },
      });
      console.log("successful:", response.data);
      fetchData();
      closePopupDecline();
    } catch (error) {
      console.error("Error:", error);
    }
    
  };

  const [userSelected, setUserSelected] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const showFilteredData = (filteredData) => {
    console.log("Filtered Data: ", filteredData);
    setFilteredData(filteredData);
  };

  return (
    <>
      <NavbarTopAdmin
        pageTitle="Verify Users"
        currentData={userData}
        filteredData={showFilteredData}
      />

      <ContainerVerifyUsers>
        {editedIndexAccept !== null && (
          <PopupContainer>
            <PopupContent>
              <div>
                Do you want to accept <br /> this user?
              </div>
              <ButtonYesNoContainer>
                <ButtonYesNo onClick={handleAcceptClickYes}>Yes</ButtonYesNo>
                <ButtonYesNo onClick={closePopupAccept}>No</ButtonYesNo>
              </ButtonYesNoContainer>
            </PopupContent>
          </PopupContainer>
        )}

        {editedIndexDecline !== null && (
          <PopupContainer>
            <PopupContent>
              <div>
                Do you want to decline <br /> this user?
              </div>
              <ButtonYesNoContainer>
                <ButtonYesNo onClick={handleDeclineClickYes}>Yes</ButtonYesNo>
                <ButtonYesNo onClick={closePopupDecline}>No</ButtonYesNo>
              </ButtonYesNoContainer>
            </PopupContent>
          </PopupContainer>
        )}

        <LabelHeadContainer>
          <LabelHeadUsername>Username</LabelHeadUsername>
          <LabelHeadFirstname>Firstname</LabelHeadFirstname>
          <LabelHeadSurname>Surname</LabelHeadSurname>
          <LabelHeadEmailAddress>Email Address</LabelHeadEmailAddress>
          <LabelHeadVF>Verified File</LabelHeadVF>
        </LabelHeadContainer>

        {filteredData.map((user, index) => (
          <ContentUser key={index}>
            <RowUserData>{user.username}</RowUserData>

            <RowUserData>{user.firstname}</RowUserData>
            <RowUserData>{user.surname}</RowUserData>
            <RowUserDataEmail>{user.email}</RowUserDataEmail>
            <DownloadAttatchedFileButton onClick={() => handleDownload(user)}>
              Download
            </DownloadAttatchedFileButton>

            <ImgAcceptButton
              src={imgAccept}
              onClick={() => togglePopupAccept(user)}
            />
            <ImgDeclineButton
              src={imgDecline}
              onClick={() => togglePopupDecline(user)}
            />
          </ContentUser>
        ))}
      </ContainerVerifyUsers>
    </>
  );
};

export default VerifyUsers;
