import React from 'react'

export const MenuTools = () => {
  return (
    <div className="Rectangle1706">
      <div className="NewBuilding-Button">New Building</div>

      <div className="Rectangle1704">
        <div className="Rectangle-Factory">
          <div className="Factory-Text">Factory 1</div>
          <img
            className="Image-Arrow"
            src="https://via.placeholder.com/40x40"
          />
        </div>

        <div className="Rectangle-Factory-Selected">
          Factory 2<div className="Rectangle-Building">Building 1</div>
          <div className="Rectangle-Building">Building 2</div>
          <div className="Rectangle-Building">Building 3</div>
          <div className="Rectangle-Building-Selected">
            <div className="Building-Selected">Building 4</div>
            <div className="Edit-Icon" />
            <div className="Bin-Icon" />
          </div>
          {/* <img
                className="Image-Arrow"
                src="https://via.placeholder.com/40x40"
              /> */}
        </div>

        <div className="Rectangle-Factory">
          Factory 3
          <img
            className="Image-Arrow"
            src="https://via.placeholder.com/40x40"
          />
        </div>

        <div className="Rectangle-Factory">
          Factory 4
          <img
            className="Image-Arrow"
            src="https://via.placeholder.com/40x40"
          />
        </div>
      </div>
    </div>
  );
}
export default MenuTools;
