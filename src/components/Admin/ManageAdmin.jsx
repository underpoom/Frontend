import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavbarTopAdmin } from "./NavbarTopAdmin/NavbarTopAdmin";
import { useNavigate } from "react-router-dom";
import TogglePopup from "./TogglePopup";
import axios from "axios";

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
  z-index: 1;
`;

const LabelHeadUsername = styled.div`
  font: 700 24px/1.5 Inter, sans-serif;
  color: #fff;
`;

const LabelHeadFirstname = styled.div`
  font: 700 24px/1.5 Inter, sans-serif;
  color: #fff;
  margin-left: 110px;
`;

const LabelHeadSurname = styled.div`
  font: 700 24px/1.5 Inter, sans-serif;
  color: #fff;
  margin-left: 120px;
`;

const LabelHeadEmailAddress = styled.div`
  font: 700 24px/1.5 Inter, sans-serif;
  color: #fff;
  margin-left: 225px;
`;

const ContentUser = styled.div`
  align-items: center;
  border-bottom: 1px solid var(--stork, #9f9f9f);
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font: 400 20px/1.5 Inter, sans-serif;
  color: #000;
  padding: 5px 30px;
`;

const [RowUserData, RowUserDataEmail] = [
  styled.div`
    text-align: center;
    font-family: Inter, sans-serif;
    width: 9%;
    word-wrap: break-word;
  `,
  styled.div`
    text-align: center;
    font-family: Inter, sans-serif;
    width: 30%;
  `,
];

const ImgDeleteButton = styled.img`
  cursor: pointer;
`;

const imgDelete =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/18eef55ac0ff935d3d1cc639329aaf0d3ea795f9696368faf6799ced72cdfa6b?apiKey=34584a6259e046a0be0d44044e057cb8&";

export const ManageAdmin = (props) => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/get_admin");
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
  useEffect(() => {
    fetchData();
  }, []);

  const [selectedUser, setSelectedUser] = useState(null);

  const [filteredData, setFilteredData] = useState([]);

  const showFilteredData = (filteredData) => {
    console.log("Filtered Data: ", filteredData);
    setFilteredData(filteredData);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowPopup(true);
    setPopupContent("Do you want to remove this admin ?");
  };

  // ----------------------------------------------------------------
  const handleRemoveClickYes = async () => {
    console.log("Clicked 'Yes' for remove admin :", selectedUser.username);

    try {
      const response = await axios.delete(`http://127.0.0.1:8000/user/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          username: selectedUser.username,
        },
      });
      console.log("successful:", response.data);
      setShowPopup(false);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {showPopup && (
        <TogglePopup
          content={popupContent}
          onClose={() => setShowPopup(false)}
          onYes={handleRemoveClickYes}
        />
      )}

      <NavbarTopAdmin
        pageTitle="Manage Admin"
        currentData={userData}
        filteredData={showFilteredData}
      />
      <ContainerManageUser>
        <LabelHeadContainer>
          <LabelHeadUsername>Username</LabelHeadUsername>
          <LabelHeadFirstname>Firstname</LabelHeadFirstname>
          <LabelHeadSurname>Surname</LabelHeadSurname>
          <LabelHeadEmailAddress>Email Address</LabelHeadEmailAddress>
        </LabelHeadContainer>

        {filteredData.map((user, index) => (
          <ContentUser key={index}>
            <RowUserData>{user.username}</RowUserData>
            <RowUserData>{user.firstname}</RowUserData>
            <RowUserData>{user.surname}</RowUserData>
            <RowUserDataEmail>{user.email}</RowUserDataEmail>
            <ImgDeleteButton
              src={imgDelete}
              onClick={() => handleDeleteClick(user)}
            />
          </ContentUser>
        ))}
      </ContainerManageUser>
    </>
  );
};

export default ManageAdmin;
