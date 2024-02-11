import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MenuToolsAdmin } from "./MenuToolsAdmin/MenuToolsAdmin";
import { NavbarTopAdmin } from "./NavbarTopAdmin/NavbarTopAdmin";
import { useNavigate } from "react-router-dom";

const ContainerManageUser = styled.div`
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
  background-color: #f6f6f6;
  position: sticky;
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
  margin-left: 292px;
`;
const LabelHeadVF = styled.div`
  font-family: Inter, sans-serif;
  font-size: 24px;
  color: #000;
  font-weight: 700;
  margin-left: 250px;
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
const ImgDeleteButton = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 50px;
  margin: auto 0;
  /* border: 1px solid red; */
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

    console.log(userData);
  };

  const [editedIndex, setEditedIndex] = useState(null);
  const togglePopup = (index) => {
    setEditedIndex(index);
  };

  const closePopup = () => {
    setEditedIndex(null);
  };

  return (
    <>
      <NavbarTopAdmin pageTitle="Manage User" />

      <ContainerManageUser>
        {editedIndex !== null && (
          <PopupContainer>
            <PopupContent>
              <div>
                Do you want to delete <br /> this user?
              </div>
              <ButtonYesNoContainer>
                <ButtonYesNo onClick={props.onYes}>Yes</ButtonYesNo>
                <ButtonYesNo onClick={closePopup}>No</ButtonYesNo>
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
            <ImgDeleteButton src={imgDelete} onClick={togglePopup} />
          </ContentUser>
        ))}
      </ContainerManageUser>
    </>
  );
};

export default ManageUser;
