import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MenuToolsAdmin } from "./MenuToolsAdmin/MenuToolsAdmin";
import { NavbarTopAdmin } from "./NavbarTopAdmin/NavbarTopAdmin";
import { useNavigate } from "react-router-dom";

const ContainerVerifyUsers = styled.div`
  display: flex;
  height: 76vh;
  /* border: 1px solid red; */
  flex-direction: column;
  padding: 0px 0px 39px 0px;
  overflow-y: auto;
`;

const LabelHeadContainer = styled.div`
  padding: 10px 0px 10px 0px;
  display: flex;
  /* border: 1px solid red; */
  justify-content: flex-start;
  gap: 10px;

  position: sticky;
  background: #f6f6f6;
  top: 0;
  z-index: 1;
`;

const LabelHeadUsername = styled.div`
  font-family: Inter, sans-serif;
  font-size: 24px;
  color: #000;
  font-weight: 700;
  margin-left: 115px;
`;

const LabelHeadRole = styled.div`
  font-family: Inter, sans-serif;

  font-size: 24px;
  color: #000;
  font-weight: 700;
  margin-left: 288px;
`;

const LabelHeadVF = styled.div`
  font-family: Inter, sans-serif;
  font-size: 24px;
  color: #000;
  font-weight: 700;
  margin-left: 248px;
`;

const ContentUser = styled.div`
  display: flex;
  border-radius: 10px;
  background-color: #d9d9d9;
  margin-bottom: 25px;
  padding: 23.5px 39px 23.5px 80px;
  flex-direction: row;
  justify-content: space-between;
`;

const RowUsername = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16%;
  /* border: 1px solid red; */
  color: #000;
  font: 400 24px Inter, sans-serif;
`;

const RolRole = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  color: #000;
  font-weight: 400;
  font-family: Inter, sans-serif;
  /* border: 1px solid red; */
  width: 16%;
  align-items: center;
  justify-content: center;
`;

const DownloadAttatchedFileButton = styled.div`
  font-family: Inter, sans-serif;
  border-radius: 10px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: var(--light, #fafafa);
  justify-content: center;
  padding: 18px 10px;
  /* border: 1px solid red; */
  font-size: 20px;
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

const ImgAcceptButton = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 40px;
  align-self: stretch;
  margin-right: -16vh;
  margin-left: -8vh;
  cursor: pointer;
`;

const ImgDeclineButton = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 50px;
  align-self: stretch;
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
      const response = await fetch("../jsonFile/users.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const togglePopupAccept = (index) => {
    setEditedIndexAccept(index);
  };

  const closePopupAccept = () => {
    setEditedIndexAccept(null);
  };
  const togglePopupDecline = (index) => {
    setEditedIndexDecline(index);
  };

  const closePopupDecline = () => {
    setEditedIndexDecline(null);
  };

  return (
    <>
      <NavbarTopAdmin pageTitle="Verify Users" />

      <ContainerVerifyUsers>
        {editedIndexAccept !== null && (
          <PopupContainer>
            <PopupContent>
              <div>
                Do you want to accept <br /> this user?
              </div>
              <ButtonYesNoContainer>
                <ButtonYesNo>Yes</ButtonYesNo>
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
                <ButtonYesNo>Yes</ButtonYesNo>
                <ButtonYesNo onClick={closePopupDecline}>No</ButtonYesNo>
              </ButtonYesNoContainer>
            </PopupContent>
          </PopupContainer>
        )}

        <LabelHeadContainer>
          <LabelHeadUsername>Username</LabelHeadUsername>
          <LabelHeadRole>Role</LabelHeadRole>
          <LabelHeadVF>Verified File</LabelHeadVF>
        </LabelHeadContainer>

        {userData.map((user, index) => (
          <ContentUser key={index}>
            <RowUsername>{user.username}</RowUsername>
            <RolRole>{user.role}</RolRole>
            <DownloadAttatchedFileButton>Download</DownloadAttatchedFileButton>

            <ImgAcceptButton src={imgAccept} onClick={togglePopupAccept} />
            <ImgDeclineButton src={imgDecline} onClick={togglePopupDecline} />
          </ContentUser>
        ))}
      </ContainerVerifyUsers>
    </>
  );
};

export default VerifyUsers;
