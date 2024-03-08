import React from "react";
import styled, { keyframes } from "styled-components";

// Define keyframe animation for spinner
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled component for the spinner
const SpinnerWrapper = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 130px;
  height: 130px;
  animation: ${spin} 2s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Spinner = () => {
  return <SpinnerWrapper />;
};

export default Spinner;
