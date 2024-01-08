import React from "react";
import styled from "styled-components";
import "../main.css";
import "./EditProfile.css";

const ButtonSave = styled.button`
  margin-top: 20px;
  display: flex;
  width: 115px;
  height: 33px;
  align-items: center;
  justify-content: center;
  color: #fafafa;
  font-size: 16px;
  font-family: Poppins;
  font-weight: 700;
  background-color: rgba(14, 24, 33, 0.6);
  border-radius: 8px;
  outline: 3px #0ae2ff solid;
  cursor: pointer;
`;

const ContainerEditProfile = styled.div`
  display: flex;
  width: 738px;
  height: 485px;
  background-color: white;
  border-radius: 8px;
  border: 2px black solid;
  margin: auto;
  color: black;
  font-size: 30px;
  font-family: Poppins;
  font-weight: 700;
  flex-direction: column;
  align-items: center;
  padding-top: 2%;
  
`;

export const EditProfile = () => {
  return (
    <div className="UserView">
      <div className="BackButton">Back</div>
      <ContainerEditProfile>
        
        
        Edit Profile
        <div className = "Role">Admin</div>
        <div className="ProfilePicture">
          <img src="https://via.placeholder.com/102x102" />
        </div>
        <div className="DisplayUsersPass">
          
          Username
          <div className="input">
            <input type="text" placeholder="Melissa" />
          </div>
        </div>
        <div className="DisplayUsersPass">
          Password
          <div className="input">
            <input type="text" placeholder="********" />
          </div>
        </div>
        <ButtonSave>Save</ButtonSave>
      </ContainerEditProfile>
    </div>
  );
};
