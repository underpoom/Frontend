import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: var(--frame-color, #f6f6f6);
  max-width: 494px;
  font-size: 32px;
  font-weight: 400;
  text-align: center;
  padding: 27px 30px;
  align-items: center;
`;

const ButtonYesNoContainer = styled.button`
  display: flex;
  justify-content: space-between;
  border: 1px solid transparent;
  width: 42vh;
  margin-top: 2vh;
  /* border: 1px solid red; */
`;
const LabelHead = styled.button`
  width: 80%;
`;
const ConfirmEditBuildingDetails = styled.div`
  color: var(--stork, #9f9f9f);
  text-align: center;
  font: 400 20px Inter, sans-serif;
  margin-top: 10px;
`;

const ButtonYesNo = styled.button`
  font-family: Inter, sans-serif;
  border-radius: 10px;
  border: 1px solid var(--Important-Button, #0a89ff);
  justify-content: center;
  align-items: center;
  color: var(--Important-Button, #0a89ff);
  padding: 9px 60px;

  cursor: pointer;

  &:hover {
    color: #e0e0e0;
    background-color: var(--Important-Button, #0a89ff);
  }
`;

const TogglePopup = ({ content, onYes, onClose }) => {
  return (
    <>
      <PopupContainer>
        <PopupContent>
          {content}
          {content === "Are you sure to confirm this configuration?" && (
            <ConfirmEditBuildingDetails>
              *when confirmed, the old value will be lost.
            </ConfirmEditBuildingDetails>
          )}

          <ButtonYesNoContainer>
            <ButtonYesNo onClick={onYes}>Yes</ButtonYesNo>
            <ButtonYesNo onClick={onClose}>No</ButtonYesNo>
          </ButtonYesNoContainer>
        </PopupContent>
      </PopupContainer>
    </>
  );
};

// Export the togglePopup function
export const togglePopup = TogglePopup;

export default TogglePopup; // Export the TogglePopup component as default
