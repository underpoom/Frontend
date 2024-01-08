import React from "react";
import "./MainMenuTest.css";
import MenuTools from "./MenuTools";

const MainmenuTest = () => {
  return (
    <div className="UserView">
      <div className="MainMenu">
        <MenuTools />

        {/* <div
          className="Ellipse"
          style={{
            left: 1006,
            top: -54,
          }}
        >
          <img
            className="Image-Ellipse"
            src="https://via.placeholder.com/65x65"
          />
        </div> */}

        <div className="FileSpace">
          <div className="Rectangle-BrowsFile">
            <img src="https://via.placeholder.com/96x96" id="Image-BrowsFile" />
            <div className="BrowsFile-Button">Brows Files</div>
          </div>
        </div>

        <div className="Ellipse1">
          <img
            className="Image-Ellipse"
            src="https://via.placeholder.com/67x67"
          />
        </div>

        <div className="Ellipse2">
          <img
            className="Image-Ellipse"
            src="https://via.placeholder.com/65x65"
          />
        </div>

      </div>
    </div>
  );
};
export default MainmenuTest;
