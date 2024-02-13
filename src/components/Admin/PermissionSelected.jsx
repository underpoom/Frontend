import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TogglePopup from "./TogglePopup";

const ContainerFactoryPermission = styled.div`
  display: flex;
  height: 76vh;
  /* border: 1px solid red; */
  flex-direction: row;
  aspect-ratio: 1;
  flex-wrap: wrap;
`;

const CurrentUserGetPermissionContainer = styled.div`
  border-radius: 20px;
  height: 33vh;
  background-color: #eaeaea;
  display: flex;
  margin-top: 30px;
  flex-direction: row;
  font-weight: 400;
  flex-wrap: wrap;
  align-content: start;
  gap: 4px;
  overflow-y: auto;
  width: 100%;
`;

const CurrentUserGetPermissionLabel = styled.div`
  display: flex;
  width: 100%;
  color: #000;
  height: 4vh;
  font: 700 24px Inter, sans-serif;
  position: sticky;
  background-color: #f6f6f6;
  top: 0;
  z-index: 1;
  /* border: 1px solid red; */
  padding: 30px 22px;
  align-items: center;
`;

const OtherUserLabel = styled.div`
  display: flex;
  width: 100%;
  color: #000;
  height: 4vh;
  font: 700 24px Inter, sans-serif;
  position: sticky;
  background-color: #f6f6f6;
  top: 0;
  /* border: 1px solid red; */
  padding: 33px 0px 33px 22px;
  align-items: center;
`;

const UserContent = styled.div`
  display: flex;
  height: 10vh;
  justify-content: space-between;
  gap: 20px;
  margin-top: 18px;
  /* border: 1px solid red; */
  padding: 33px 33px 33px 5px;
  align-items: center;
  background-color: #d9d9d9;
  border: 1px solid var(--stork, #9f9f9f);
  border-radius: 10px;
  margin-left: 22px;
  width: 40.2vh;
`;

const UserNameLabel = styled.div`
  color: #000;
  text-align: center;
  font: 20px Inter, sans-serif;
  width: 15vh;
`;

const UserFile = styled.div`
  border-radius: 10px;
  border: 1px solid var(--Important-Button, #0a89ff);
  background-color: var(--light, #fafafa);
  color: var(--Important-Button, #0a89ff);
  padding: 13px 28px;
  font: 16px Inter, sans-serif;
  cursor: pointer;
`;

const ImgRemoveAdd = styled.img`
  width: 30px;
  cursor: pointer;
`;

const OtherUserContainer = styled.div`
  border-radius: 20px;
  height: 33vh;
  background-color: #f6f6f6;
  display: flex;
  margin-top: 30px;
  flex-direction: row;
  font-weight: 400;
  flex-wrap: wrap;
  align-content: start;
  gap: 4px;
  overflow-y: auto;
  width: 100%;
`;

const SearchUserContainer = styled.div`
  margin: 0 12vh 0 auto;
  input[type="text"] {
    height: 6.5vh;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    font-size: 24px;
  }
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

const BlacLineAdmin = styled.div`
  background-color: black;
  height: 2px;
`;

const imgRemove =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/3f4c9b5db1e7a6ff8ec6827ec31de5c2c1e83625984ea6446bcdc670a3524c4b?apiKey=34584a6259e046a0be0d44044e057cb8&";
const imgAdd =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/d1573c1f4387e34454945052c6340580dd716ebf34149be2676f645bc373c6de?apiKey=34584a6259e046a0be0d44044e057cb8&";
const imgBack =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/de6a5fb1856d3b714a3c91e51d65fea4bc8b861e6dda41a96cdbd213fbbf6ef4?apiKey=34584a6259e046a0be0d44044e057cb8&";
export const PermissionSelected = ({ factoryData, onBackClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userCurrentPermission, setUserCurrentPermission] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../jsonFile/users.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserCurrentPermission(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredUsers = userCurrentPermission.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [userSelectedData, setUserSelectedData] = useState([]);
  const [isRemoveAction, setIsRemoveAction] = useState();

  const handleTogglePopupRemove = (user) => {
    setShowPopup(true);
    setPopupContent("Do you want to remove permission this user?");
    setUserSelectedData(user);
    setIsRemoveAction(true);
  };

  const handleTogglePopupAdd = (user) => {
    setShowPopup(true);
    setPopupContent("Do you want to add permission this user?");
    setUserSelectedData(user);
    setIsRemoveAction(false);
  };

  // ----------------------------------------------------------------
  const handleRemoveClickYes = () => {
    if (isRemoveAction) {
      console.log(
        "Clicked 'Yes' for remove permision",
        userSelectedData.username,
        "from",
        factoryData.name
      );
    } else {
      console.log(
        "Clicked 'Yes' for add permision",
        userSelectedData.username,
        "to",
        factoryData.name
      );
    }
    setShowPopup(false);
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

      <>
        <NavbarTopAdminContainer>
          <Img src={imgBack} onClick={onBackClick}></Img>
          <PageTitleAdmin>{factoryData.name}</PageTitleAdmin>
        </NavbarTopAdminContainer>

        <BlacLineAdmin />

        <ContainerFactoryPermission>
          <CurrentUserGetPermissionContainer>
            <CurrentUserGetPermissionLabel>
              Current user get permission :
            </CurrentUserGetPermissionLabel>

            {userCurrentPermission.map((user, index) => (
              <UserContent key={index}>
                <UserNameLabel>{user.username}</UserNameLabel>
                <UserFile>File</UserFile>
                <ImgRemoveAdd
                  onClick={() => handleTogglePopupRemove(user)}
                  src={imgRemove}
                  isRemoveAction={true}
                />
              </UserContent>
            ))}
          </CurrentUserGetPermissionContainer>

          <OtherUserContainer>
            <OtherUserLabel>
              Other User :
              <SearchUserContainer>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search users..."
                  maxLength={20}
                />
              </SearchUserContainer>
            </OtherUserLabel>
            {filteredUsers.map((user, index) => (
              <UserContent key={index}>
                <UserNameLabel>{user.username}</UserNameLabel>
                <UserFile>File</UserFile>
                <ImgRemoveAdd
                  onClick={() => handleTogglePopupAdd(user)}
                  src={imgAdd}
                  isRemoveAction={false} // For add action
                />
              </UserContent>
            ))}
          </OtherUserContainer>
        </ContainerFactoryPermission>
      </>
    </>
  );
};

export default PermissionSelected;
