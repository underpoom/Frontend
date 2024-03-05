import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { NavbarTopAdmin } from "./NavbarTopAdmin/NavbarTopAdmin";
import { useNavigate } from "react-router-dom";
import TogglePopup from "./TogglePopup";
import axios from "axios";
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
  const { user } = useContext(UserContext);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/get_admin`, {
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
      const response = await axios.delete(`${url}/user/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
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
