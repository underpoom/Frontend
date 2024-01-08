import React from "react";
// import "./MainMenu.css";
const Mainmenu = () => {
  return (
    <div className="UserView">
      <div className="MainMenu">
        <div className="Menu">
          <div className="Rectangle1706" />
          <div className="Rectangle1704" />

          <div
            className="Rectangle-Factory"
            style={{
              top: 79,
            }}
          >
            <div className="Factory-Text">Factory 1</div>
            <img
              className="Image-Arrow"
              src="https://via.placeholder.com/40x40"
            />
          </div>

          <div className="Rectangle-Factory-Selected">
            <div className="Factory-Text">Factory 2</div>

            <img
              className="Image-Arrow"
              src="https://via.placeholder.com/40x40"
            />

            <div className="Rectangle-Building" style={{ top: 40 }}>
              <div className="Building-Text">Building 1</div>
            </div>

            <div className="Rectangle-Building" style={{ top: 79 }}>
              <div className="Building-Text">Building 2</div>
            </div>

            <div className="Rectangle-Building" style={{ top: 118 }}>
              <div className="Building-Text">Building 3</div>
            </div>

            <div className="Rectangle-Building-Selected">
              <div className="Building-Text-Selected">Building 4</div>
            </div>

            <div className="Bin-Icon" />
            <div className="Edit-Icon" />
          </div>
          
          <div
            className="Rectangle-Factory"
            style={{
              top: 349,
            }}
          >
            <div className="Factory-Text">Factory 3</div>
            <img
              className="Image-Arrow"
              src="https://via.placeholder.com/40x40"
            />
          </div>

          <div
            className="Rectangle-Factory"
            style={{
              top: 404,
            }}
          >
            <div className="Factory-Text">Factory 4</div>
            <img
              className="Image-Arrow"
              src="https://via.placeholder.com/40x40"
            />
          </div>

          <div className="Rectangle-Button">
            <div className="NewFactory-Button">New Building</div>
          </div>

          <div
            className="Ellipse"
            style={{
              left: 880,
              top: -54,
            }}
          >
            <img
              className="Image-Ellipse"
              src="https://via.placeholder.com/67x67"
            />
          </div>

          <div
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
          </div>
        </div>

        <div className="FileSpace">
          <div className="Rectangle-BrowsFile">
            <img
              className="Image-BrowsFile"
              src="https://via.placeholder.com/96x96"
            />
            <div className="BrowsFile-Button">
              <div className="BrowsFile-Text">Brows Files</div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
export default Mainmenu;
