import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import TogglePopup from "./TogglePopup";
import { handleDownload } from "../../utils/downloadUtils";

import axios from "axios";
import { UserContext, url } from "../../bounding/UserContext";

const ContainerFactoryPermission = styled.div`
  display: flex;
  height: 76vh;
  /* border: 1px solid red; */
  flex-direction: column;
`;

const CurrentUserGetPermissionContainer = styled.div`
  border-radius: 20px;
  height: 33vh;
  background-color: #eaeaea;
  margin-top: 30px;
  font-weight: 400;
  flex-wrap: wrap;
  align-content: start;
  overflow-y: auto;
  width: 100%;
  padding-left: 22px;
`;

const CurrentUserGetPermissionLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  color: #000;
  background-color: #eaeaea;
  padding-top: 10px;
  font: 700 24px Inter, sans-serif;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const LabelHeadContainer = styled.div`
  align-items: center;
  border-bottom: 1px solid var(--stork, #9f9f9f);
  background-color: var(--stork, #9f9f9f);
  display: flex;
  margin-top: 10px;
  font-size: 24px;
  color: #fff;
  font-weight: 700;
  padding: 11px 26px;
  width: 100%;
`;

const LabelHeadUsername = styled.div`
  font: 700 24px/1.5 Inter, sans-serif;
  color: #fff;
`;

const LabelHeadFirstname = styled.div`
  font: 700 24px/1.5 Inter, sans-serif;
  color: #fff;
  margin-left: 64px;
`;

const LabelHeadSurname = styled.div`
  font: 700 24px/1.5 Inter, sans-serif;
  color: #fff;
  margin-left: 80px;
`;

const LabelHeadEmailAddress = styled.div`
  font: 700 24px/1.5 Inter, sans-serif;
  color: #fff;
  margin-left: 170px;
`;

const LabelHeadVF = styled.div`
  font: 700 24px/1.5 Inter, sans-serif;
  color: #fff;
  width: 140px;
  margin-left: 145px;
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
  width: 100%;
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

const UserFile = styled.div`
  border-radius: 10px;
  border: 2px solid var(--Important-Button, #0a89ff);
  background-color: var(--light, #fafafa);
  color: var(--Important-Button, #0a89ff);
  padding: 10px 10px;
  font: 16px Inter, sans-serif;
  cursor: pointer;
`;

const ImgRemoveAdd = styled.img`
  width: 30px;
  cursor: pointer;
`;

const OtherUserContainer = styled.div`
  border-radius: 20px;
  height: 35vh;
  font-weight: 400;
  flex-wrap: wrap;
  align-content: start;
  overflow-y: auto;
  width: 100%;
  padding-left: 22px;
  margin-top: 20px;
`;

const OtherUserLabel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #000;
  font: 700 24px Inter, sans-serif;
  background-color: #f6f6f6;
  position: sticky;
  top: 0;
  z-index: 1;
  padding-top: 10px;
  align-items: start;
`;

const SearchUserContainer = styled.div`
  margin: -35px 10px 0 auto;
  input[type="text"] {
    height: 5.5vh;
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
  margin: 5vh 5vh 0 0;
  align-items: center;
  padding-right: 2vh;
`;

const PageTitleAdmin = styled.div`
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
  const [userOtherPermission, setUserOtherPermission] = useState([]);
  const { user } = useContext(UserContext);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${url}/get_permission_factory?facto_id=${factoryData.factory_id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("successful UserCurrent:", response.data);
      setUserCurrentPermission(response.data);
    } catch (error) {
      console.error("Error UserCurrent:", error);
    }

    try {
      const response = await axios.get(
        `${url}/get_not_permission_factory?facto_id=${factoryData.factory_id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("successful UserOther:", response.data);
      setUserOtherPermission(response.data);
    } catch (error) {
      console.error("Error UserOther:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredUsers = userOtherPermission.filter((user) =>
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
  const handleRemoveClickYes = async () => {
    if (isRemoveAction) {
      console.log(
        "Clicked 'Yes' for remove permision",
        userSelectedData._id,
        "from",
        factoryData.factory_id
      );
      try {
        const response = await axios.delete(`${url}/del_permission`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          data: {
            user_id: userSelectedData._id,
            fac_id: factoryData.factory_id,
          },
        });
        console.log("Delete successful:", response.data);
        setShowPopup(false);
        fetchData();
      } catch (error) {
        console.error("Error Delete:", error);
      }
    } else {
      try {
        const response = await axios.post(
          `${url}/post_permission`,
          {
            username: userSelectedData.username,
            factory_name: factoryData.factory_name,
            factory_details: factoryData.factory_details,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log("successful:", response.data);
        setShowPopup(false);
        fetchData();
      } catch (error) {
        console.error("Error:", error);
      }
    }
    setShowPopup(false);
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
          onYes={handleRemoveClickYes}
        />
      )}

      <>
        <NavbarTopAdminContainer>
          <Img src={imgBack} onClick={onBackClick}></Img>
          <PageTitleAdmin>{factoryData.factory_name}</PageTitleAdmin>
        </NavbarTopAdminContainer>
        <BlacLineAdmin />

        <ContainerFactoryPermission>
          <CurrentUserGetPermissionContainer>
            <CurrentUserGetPermissionLabel>
              Current user get permission :
              <LabelHeadContainer>
                <LabelHeadUsername>Username</LabelHeadUsername>
                <LabelHeadFirstname>Firstname</LabelHeadFirstname>
                <LabelHeadSurname>Surname</LabelHeadSurname>
                <LabelHeadEmailAddress>Email Address</LabelHeadEmailAddress>
                <LabelHeadVF>Verified File</LabelHeadVF>
              </LabelHeadContainer>
            </CurrentUserGetPermissionLabel>

            {userCurrentPermission.map((user, index) => (
              <ContentUser key={index}>
                <RowUserData>{user.username}</RowUserData>

                <RowUserData>{user.firstName}</RowUserData>
                <RowUserData>{user.surname}</RowUserData>
                <RowUserDataEmail>{user.email}</RowUserDataEmail>
                <UserFile onClick={() => handleDownloadClick(user)}>
                  Download
                </UserFile>
                <ImgRemoveAdd
                  onClick={() => handleTogglePopupRemove(user)}
                  src={imgRemove}
                  isRemoveAction={true}
                />
              </ContentUser>
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
                  placeholder="Filter username..."
                  maxLength={20}
                />
              </SearchUserContainer>
              <LabelHeadContainer>
                <LabelHeadUsername>Username</LabelHeadUsername>
                <LabelHeadFirstname>Firstname</LabelHeadFirstname>
                <LabelHeadSurname>Surname</LabelHeadSurname>
                <LabelHeadEmailAddress>Email Address</LabelHeadEmailAddress>
                <LabelHeadVF>Verified File</LabelHeadVF>
              </LabelHeadContainer>
            </OtherUserLabel>

            {filteredUsers.map((user, index) => (
              <ContentUser key={index}>
                <RowUserData>{user.username}</RowUserData>

                <RowUserData>{user.firstname}</RowUserData>
                <RowUserData>{user.surname}</RowUserData>
                <RowUserDataEmail>{user.email}</RowUserDataEmail>
                <UserFile onClick={() => handleDownloadClick(user)}>
                  Download
                </UserFile>
                <ImgRemoveAdd
                  onClick={() => handleTogglePopupAdd(user)}
                  src={imgAdd}
                  isRemoveAction={false} // For add action
                />
              </ContentUser>
            ))}
          </OtherUserContainer>
        </ContainerFactoryPermission>
      </>
    </>
  );
};

export default PermissionSelected;
