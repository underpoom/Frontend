import React, { useState } from "react";
import styled from "styled-components";
import NavbarTop from "./NavbarTop/NavbarTop";

const ContainerFactoryDetails = styled.div`
  display: flex;
  width: 132vh;
  height: 76vh;
  /* border: 1px solid red; */
  flex-direction: column;
  font: 700 32px Inter, sans-serif;
  padding: 1.5vh 1.5vh 0 1.5vh;
  padding-left: 5vh;
  align-items: start;
`;

const LabelHead = styled.div`
  color: #000;
  text-align: center;
  font: 700 32px Inter, sans-serif;
  align-self: flex-start;
  margin-top: 10px;
`;

const ContentDetails = styled.div`
  border-radius: 20px;
  border: 1px solid var(--stork, #9f9f9f);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: var(--frame-color, #f6f6f6);
  display: flex;
  margin-top: 30px;
  flex-direction: column;
  align-items: start;
  padding: 30px 43px;
  width: 97%;
  height: 62%;
`;

const Label = styled.div`
  font-size: 32px;
  width: 250px;
  /* border: 1px solid red; */
  display: flex;
  justify-content: end;
`;

const Content = styled.div`
  display: flex;
  width: 600px;
  max-width: 100%;
  justify-content: start;
  gap: 10px;
  font-size: 30px;
  color: #000;
  font-weight: 400;
  margin: 25px 0 25px 26px;
  /* border: 1px solid red; */
  align-items: center;
`;

const Address = styled.div`
  font: 700 36px Inter, sans-serif;
`;

export const FactoryDetails = ({ factoryData, handlepageChange }) => {
  const handlepage = (data) => {
    handlepageChange(data);
  };

  return (
    <>
      <NavbarTop pageTitle="Factory Details" changeStatePage={handlepage} />
      <ContainerFactoryDetails>
        <LabelHead>This factory detail :</LabelHead>
        <ContentDetails>
          <Content>
            <Label>Factory Name :</Label> {factoryData.name}
          </Content>

          <Address>Address</Address>

          <Content>
            <Label>Province :</Label> {factoryData.province}
          </Content>
          <Content>
            <Label>District :</Label> {factoryData.district}
          </Content>
          <Content>
            <Label>Sub - District :</Label> {factoryData.subdistrict}
          </Content>
        </ContentDetails>
      </ContainerFactoryDetails>
    </>
  );
};

export default FactoryDetails;
