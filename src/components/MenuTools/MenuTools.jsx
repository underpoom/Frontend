import React, { useState, useEffect } from "react";
import "./MenuTools.css";
import styled from "styled-components";
const Img = styled.img`
  aspect-ratio: 0.57;
  object-fit: auto;
  object-position: center;
  width: 20px;
  fill: #000;
  margin-right: 2vh;
  cursor: pointer;
`;
export const MenuTools = () => {
  const [factories, setFactories] = useState([]);
  const [selectedFactory, setSelectedFactory] = useState(null);

  const imgFactory =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/4e5ad0d00ab460ea192b2777c8b4f4210a018fad5ab76df4a8acc1b6e3d1d12a?apiKey=34584a6259e046a0be0d44044e057cb8&";
  const imgBoldDown =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/d11a8c74c92fa77afa65db4e92bf04b26bc36b7fd7d9cfa2f4a419aa4898f199?apiKey=34584a6259e046a0be0d44044e057cb8&";
  const imgBuilding =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/23e5971f33dc241d0a4e6fd2b762d4bdc5283f4e6671509b40770709effbec0a?apiKey=34584a6259e046a0be0d44044e057cb8&";
  const imgRemove =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/7b8cf7d19c222e63d8edda7c3d2073475c20b4de59979d4a3176cabc37fcbc44?apiKey=34584a6259e046a0be0d44044e057cb8&";
  const imgBoldLeft =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/53f2669f8bd0a558a048ea57cdba8b791b9ea7be12aabe822bedb6ec70fe786b?apiKey=34584a6259e046a0be0d44044e057cb8&";
  const imgQuestionIcon =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/cc0d1efaa0d1fa35e23f255d7067960837e6f664a2a32dd1b5e537d878c5aa91?apiKey=34584a6259e046a0be0d44044e057cb8&";
  const imgUserIcon =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/2ba22acfd395cddb5e3dcc608a6e5734b6ab4bff5f82e55298e97962e0f7f9a6?apiKey=34584a6259e046a0be0d44044e057cb8&";
  useEffect(() => {
    fetch("../jsonFile/factories.json")
      .then((response) => response.json())
      .then((data) => setFactories(data))
      .catch((error) => console.error("Error fetching factories:", error));
  }, []);

  const handleFactoryClick = (factory) => {
    setSelectedFactory(factory);
  };

  return (
    <div className="Container-menutools">
      <div className="Home-page">
        <span style={{ fontSize: "40px" }}>Factories</span>
        <span style={{ fontSize: "24px" }}>& Buildings</span>
      </div>
      <div className="White-line" />
      {factories.map((factory) => (
        <div
          key={factory.id}
          className="Factory-Space"
          onClick={() => handleFactoryClick(factory)}
        >
          <img loading="lazy" src={imgFactory} alt={`Factory ${factory.id}`} />
          {factory.name}
          <img
            loading="lazy"
            src={selectedFactory === factory ? imgBoldDown : imgBoldLeft}
            alt={`Dropdown icon for ${factory.name}`}
            className="BoldArrow"
          />

          {selectedFactory && selectedFactory.id === factory.id && (
            <div>
              {factory.buildings.map((building, index) => (
                <div key={index} className="Building-Space">
                  <img loading="lazy" src={imgBuilding} />
                  {building}
                  <img loading="lazy" src={imgRemove} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* <div className="Factory-Building-Space">
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle caret>Select Factory</DropdownToggle>
          <DropdownMenu>
            <Input
              type="text"
              placeholder="Search Factory"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {filteredFactories.map((factory) => (
              <DropdownItem
                key={factory.id}
                onClick={() => handleFactorySelect(factory)}
              >
                {factory.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        {selectedFactory && (
          <div className="selected-factory">
            <p>Selected Factory: {selectedFactory.name}</p>
            <div className="buildings">
              {selectedFactory.buildings.map((building) => (
                <DropdownItem
                  key={building}
                  onClick={() => handleBuildingClick(building)}
                >
                  {building}
                </DropdownItem>
              ))}
            </div>
          </div>
        )}
      </div> */}
      {/* <Button color="primary" type="button" size="lg" class>
        Add Building
      </Button> */}
    </div>
  );
};
export default MenuTools;