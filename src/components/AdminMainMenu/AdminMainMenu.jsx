import React from "react";
import "./AdminMainMenu.css";
import "../MainMenuTest/MainMenuTest.css";
import MenuTools from "../MainMenuTest/MenuTools";
import { useEffect, useState } from "react";

export const AdminMainMenu = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    fetch("../jsonFile/users.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  function User({ username, role }) {
    return (
      <div className="UserDetails">
        <img className="ImgIconUser" src="https://via.placeholder.com/55x55" />
        <div className="DetailsText">{username}</div>
        <div className="DetailsText">{role}</div>
        <img className="ImgEditUser" src="https://via.placeholder.com/35x35" />
        <img
          className="ImgDeleteUser"
          src="https://via.placeholder.com/22x22"
        />
      </div>
    );
  }

  return (
    <div className="UserView">
      <div className="MainMenu">
        <MenuTools />

        <div className="FileSpace">
          <div className="UserNameRole">
            <div>Username</div>
            <div>Role</div>
            <div>Attatched file</div>
          </div>
          {userData.map((user, index) => (
            <User key={index} username={user.username} role={user.role} />
          ))}
        </div>
      </div>
    </div>
  );
};
