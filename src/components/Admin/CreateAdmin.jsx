import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext, url } from "../../bounding/UserContext";
import NavbarTopAdmin from "./NavbarTopAdmin/NavbarTopAdmin";
import styled from "styled-components";

const ContainerAddAdmin = styled.div`
  display: flex;
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
  const { user } = useContext(UserContext);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verified_file_path, setVerified_file_path] = useState("");

  const handleClickSubmit = async () => {
    try {
      const response = await axios.post(
        `${url}/create_admin`,
        {
          firstname: firstname,
          surname: lastname,
          email: email,
          username: username,
          password: password,
          verified_file_path: verified_file_path,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("create_admin successful:", response.data);

      setFirstName("");
      setLastName("");
      setEmail("");
      setUsername("");
      setPassword("");
      setVerified_file_path("");
    } catch (error) {
      console.error("Error create_admin:", error);
    }
  };

  return (
    <>
      <NavbarTopAdmin pageTitle="Add Admin" />

      <ContainerAddAdmin>
        Create admin’s account
        <ContentAddAdmin>
          Firstname :
          <Input
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </ContentAddAdmin>
        <ContentAddAdmin>
          Lastname :
          <Input
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </ContentAddAdmin>
        <ContentAddAdmin>
          Email Address :
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </ContentAddAdmin>
        <ContentAddAdmin>
          Username :
          <Input
            maxLength={20}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </ContentAddAdmin>
        <Maximum20character>Maximum 20 character</Maximum20character>
        <ContentAddAdmin>
          Password :
          <Input
            type="password"
            value={password}
            maxLength={20}
            onChange={(e) => setPassword(e.target.value)}
          />
        </ContentAddAdmin>
        <Maximum20character>Maximum 20 character</Maximum20character>
        <Submit onClick={handleClickSubmit}>Submit</Submit>
      </ContainerAddAdmin>
    </>
  );
};

export default CreateAdmin;
