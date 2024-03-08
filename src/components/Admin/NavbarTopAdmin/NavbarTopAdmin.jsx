import React from "react";
import styled from "styled-components";

const NavbarTopAdminContainer = styled.div`
  display: flex;
  height: 14vh;
  width: 132vh;
  /* border: 1px solid #f24e1e; */
  margin: 5vh 5vh 0 0;
  align-items: center;
  padding-right: 2vh;
`;

const PageTitleAdmin = styled.div`
  /* border: 1px solid #f24e1e; */
  font-size: xx-large;
  font-weight: 700;
  margin-right: auto;
  font-size: 40px;
`;

const SearchUserContainer = styled.div`
  margin-left: auto;
  input[type="text"] {
    height: 6.5vh;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    font-size: 24px;
  }
`;

const BlacLineAdmin = styled.div`
  background-color: black;
  height: 2px;
`;

export const NavbarTopAdmin = ({ pageTitle, currentData, filteredData }) => {
  let Term;

  if (pageTitle === "Manage User" || pageTitle === "Verify Users") {
    Term = "username";
  } else if (
    pageTitle === "Add Factory’s Permission" ||
    pageTitle === "Remove Factory" ||
    pageTitle === "Factory’s Permission Summary"
  ) {
    Term = "factory_name";
  }
  else if(pageTitle === "Log"){
    Term = "timestamp";
  }
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    const filterData = currentData.filter((data) =>
      data[Term].toLowerCase().includes(searchTerm.toLowerCase())
    );
    filteredData(filterData);
  };

  return (
    <>
      <NavbarTopAdminContainer>
        <PageTitleAdmin>{pageTitle}</PageTitleAdmin>
        {Term === "username" && (
          <SearchUserContainer>
            <input
              type="text"
              onChange={handleSearchChange}
              placeholder="Filter username..."
              maxLength={20}
            />
          </SearchUserContainer>
        )}
        {Term === "factory_name" && (
          <SearchUserContainer>
            <input
              type="text"
              onChange={handleSearchChange}
              placeholder="Filter factory..."
            />
          </SearchUserContainer>
        )}
        {Term === "timestamp" && (
          <SearchUserContainer>
            <input
              type="text"
              onChange={handleSearchChange}
              placeholder="Filter timestamp..."
            />
          </SearchUserContainer>
        )}
      </NavbarTopAdminContainer>

      <BlacLineAdmin />
    </>
  );
};
export default NavbarTopAdmin;
