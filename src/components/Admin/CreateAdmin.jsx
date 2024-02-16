import React, { useState, useEffect } from "react";
import NavbarTopAdmin from "./NavbarTopAdmin/NavbarTopAdmin";
import styled from "styled-components";

const ContainerAddFactory = styled.div`
  display: flex;
  height: 76vh;
  border: 1px solid red;
  flex-direction: column;
  overflow-y: auto;
  align-items: center;
  padding-right: 50vh;
  padding-top: 5vh;
`;

export const CreateAdmin = () => {
  return (
    <>
      <NavbarTopAdmin pageTitle="Add Admin" />

      <ContainerAddFactory>
        <ContentFactoryName>
          Factory Name :
          <PasswordInput
            // type="password"
            id="newPassword"
            name="newPassword"
            maxLength={20}
            required
            onChange={handleChange}
          />
          <Maximum20character>Maximum 20 character</Maximum20character>
        </ContentFactoryName>

        <SelectSection>
          Factory Province :
          {loading ? (
            <p>Loading...</p>
          ) : (
            <StyledSelect
              value={selectedProvince}
              onChange={handleProvinceChange}
              loading={loading} // Pass loading state as a prop
            >
              <option value="">Select the province</option>
              {provinceList.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name_th}
                </option>
              ))}
            </StyledSelect>
          )}
        </SelectSection>

        <SelectSection>
          Factory District :
          {loading ? (
            <p>Loading...</p>
          ) : (
            <StyledSelect
              value={selectedAmphure}
              onChange={handleAmphureChange}
            >
              <option value="">Select the district</option>
              {filteredAmphures.map((amphure) => (
                <option key={amphure.id} value={amphure.id}>
                  {amphure.name_th}
                </option>
              ))}
            </StyledSelect>
          )}
        </SelectSection>

        <SelectSection>
          Factory Sub-district :
          {loading ? (
            <p>Loading...</p>
          ) : (
            <StyledSelect value={selectedTambon} onChange={handleTambonChange}>
              <option value="">Select the sub-district</option>
              {filteredTambons.map((tambon) => (
                <option key={tambon.id} value={tambon.id}>
                  {tambon.name_th}
                </option>
              ))}
            </StyledSelect>
          )}
        </SelectSection>

        <Submit onClick={handleSubmit}>Submit</Submit>
      </ContainerAddFactory>
    </>
  );
};

export default CreateAdmin;
