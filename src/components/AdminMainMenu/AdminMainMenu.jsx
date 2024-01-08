import React from "react";
import "./AdminMainMenu.css";
import "../MainMenuTest/MainMenuTest.css";
import MenuTools from "../MainMenuTest/MenuTools";
export const AdminMainMenu = () => {
  return (
    <div className="UserView">
      <div className="MainMenu">
        <MenuTools />

        <div className="FileSpace">
          <div className="UserNameRole">
            <div>Username</div>
            <div>Role</div>
          </div>

          <div className="UserDetails">
            <img
              className="ImgIconUser"
              src="https://via.placeholder.com/55x55"
            />

            <div className="DetailsText">userno1</div>
            <div className="DetailsText">User</div>
            <img
              className="ImgEditUser"
              src="https://via.placeholder.com/35x35"
            />
            <img
              className="ImgDeleteUser"
              src="https://via.placeholder.com/22x22"
            />
          </div>

          <div className="UserDetails">
            <img
              className="ImgIconUser"
              src="https://via.placeholder.com/55x55"
            />

            <div className="DetailsText">userno1</div>
            <div className="DetailsText">User</div>
            <img
              className="ImgEditUser"
              src="https://via.placeholder.com/35x35"
            />
            <img
              className="ImgDeleteUser"
              src="https://via.placeholder.com/22x22"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
