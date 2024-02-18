import React, { useState, useEffect } from "react";
import NavbarTopAdmin from "./NavbarTopAdmin/NavbarTopAdmin";
import styled from "styled-components";

const ContainerAddAdmin = styled.div`
  display: flex;
  /* height: 76vh; */
  height: fit-content;
  border: 1px solid red;
  flex-direction: column;
  overflow-y: auto;
  align-items: start;
  padding: 32px 51px;

  border-radius: 20px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: var(--frame-color, #f6f6f6);
  display: flex;
  margin-top: 30px;
  font: 700 24px Inter, sans-serif;
`;

const ContentAddAdmin = styled.div`
  width: 60vh;
  font: 700 24px Inter, sans-serif;
  font-size: 24px;
  /* border: 1px solid red; */
  margin-top: 2vh;
  display: flex;
  align-items: center;

  justify-content: end;
`;

const Input = styled.input`
  border-radius: 10px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: var(--light, #fafafa);
  width: 39vh;
  max-width: 100%;
  height: 5vh;
  padding: 0 10px;
  font-family: Inter, sans-serif;
  font-size: 24px;
  font-weight: 400;
  margin-left: 1vh;

  &:focus {
    outline: none;
  }
`;

const Maximum20character = styled.div`
  display: flex;

  flex-basis: 0%;
  flex-direction: column;
  font-size: 16px;
  font-weight: 400;
  font-family: Inter, sans-serif;
  margin: 1vh 0 0 32.5vh;
`;

const Submit = styled.div`
  border-radius: 10px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: var(--Important-Button, #0a89ff);
  align-self: end;
  color: #fff;
  white-space: nowrap;
  padding: 21px 25px;
  font: 700 24px Inter, sans-serif;
  cursor: pointer;
`;

export const CreateAdmin = () => {
  const [newAddAdmin, setNewAddAdmin] = useState("");

  const handleChange = (event) => {
    setNewAddAdmin(event.target.value);
  };

  
  const handleClickSubmit = () => {
    console.log("success")
   
  };

  return (
    <>
      <NavbarTopAdmin pageTitle="Add Admin" />

      <ContainerAddAdmin>
        Create admin’s account
        <ContentAddAdmin>
          Firstname :<Input onChange={handleChange} />
        </ContentAddAdmin>
        <ContentAddAdmin>
          Lastname :<Input onChange={handleChange} />
        </ContentAddAdmin>
        <ContentAddAdmin>
          Email Address :<Input onChange={handleChange} />
        </ContentAddAdmin>
        <ContentAddAdmin>
          Username :<Input maxLength={20} onChange={handleChange} />
        </ContentAddAdmin>
        <Maximum20character>Maximum 20 character</Maximum20character>
        <ContentAddAdmin>
          Password :
          <Input type="password" maxLength={20} onChange={handleChange} />
        </ContentAddAdmin>
        <Maximum20character>Maximum 20 character</Maximum20character>
        <Submit onClick={handleClickSubmit}>Submit</Submit>
      </ContainerAddAdmin>
    </>
  );
};

export default CreateAdmin;
