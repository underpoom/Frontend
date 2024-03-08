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

const ButtonOk = styled.button`
  font-family: Inter, sans-serif;
  border-radius: 10px;
  border: 1px solid var(--Important-Button, #0a89ff);
  justify-content: center;
  align-items: center;
  color: var(--Important-Button, #0a89ff);
  padding: 9px 60px;
  margin-top:20px;

  cursor: pointer;

  &:hover {
    color: #e0e0e0;
    background-color: var(--Important-Button, #0a89ff);
  }
`;

export const AlertPopup = ({ content, onYes, onClose }) => {
  return (
    <>
      <PopupContainer>
        <PopupContent>
          {content}


          
            <ButtonOk onClick={onClose}>Ok</ButtonOk>
         
        </PopupContent>
      </PopupContainer>
    </>
  );
};


export default AlertPopup; 
