import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
const ContainerMenutools = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vh;
  height: 90vh;
  margin: 5vh;
  font-size: 32px;
  color: #fff;
  font-weight: 700;
  padding: 20px 35px;
  border-radius: 20px;
  box-shadow: 0px 4px 9.3px 6px rgba(0, 0, 0, 0.25);
  background-color: var(--Navbar, #2e2e32);
  justify-items: start;
`;

const FactorySpace = styled.div`
  display: flex;
  margin-top: 2vh;
  /* border: 1px solid red; */
  flex-wrap: wrap;
  gap: 2vh;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

const HomePage = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Inter, sans-serif;
  /* border: 1px solid red; */
  align-items: start;
`;

const WhiteLine = styled.div`
  background-color: #fff;
  margin-top: 17px;
  height: 2px;
`;

const BoldArrow = styled.img`
  /* border: 1px solid red; */
`;

const BuildingSpace = styled.div`
  display: flex;
  flex-wrap: wrap;

  &:hover,
  &.selected {
    transform: scale(1.1);
    cursor: pointer;
    border-radius: 10px;
    border: 1px solid var(--stork, #9f9f9f);
    background-color: var(--Important-Button, #0a89ff);
  }

  /* border: 1px solid red; */
  gap: 1.5vh;
  font-size: 25px;
  width: 30vh;
  margin-left: 1vh;
  margin-bottom: 2vh;
  transition: transform 0.3s ease;
  padding: 0 1vh;
`;

const ImgLgInformation = styled.img`
  width: 25px;
  margin-left: auto;
  /* border: 1px solid red; */
`;

const ImgMdInformation = styled.img`
  width: 20px;
  margin-left: auto;
  /* border: 1px solid red; */
`;

const ImgRemoveBuilding = styled.img`
  /* border: 1px solid red; */
`;

export const MenuTools = ({
  onFactoryInformationClick,
  onBuildingInformationClick,
  onNewBuildingClick,
  onFactoryClick,
  onBuildingClick,
}) => {
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
  const imgLgInfornation =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/8ecf12dfcc299c4d77bebc194b8fb77f9bd76b7ced54ffd7c2676c690e6d9678?apiKey=34584a6259e046a0be0d44044e057cb8&";
  const imgMdInformation =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/7b2afe12059a0d6aba177b4eb04cbd5a2f927e443bfd63eec24764d2bb10d9d5?apiKey=34584a6259e046a0be0d44044e057cb8&";
  useEffect(() => {
    fetch("../jsonFile/factories.json")
      .then((response) => response.json())
      .then((data) => setFactories(data))
      .catch((error) => console.error("Error fetching factories:", error));
  }, []);

  const handleFactoryClick = (factory) => {
    setSelectedFactory(factory);
  };

  const handleFactoryInformation = (factory) => {
    onFactoryInformationClick(factory);
  };

  const handleBuildingInformation = (building) => {
    onBuildingInformationClick(building);
  };

  const handleSectionSelect = (building) => {
    setSelectedSection(building);
  };

  const handleAddNewBuilding = (factory) => {
    onNewBuildingClick(factory);
  };

  const handleBuildingSelect = (data) => {
    onBuildingClick(data);
  };

  const handleFactorySelect = (data) => {
    onFactoryClick(data);
  };

  const [selectedSection, setSelectedSection] = useState([]);

  return (
    <ContainerMenutools>
      <HomePage>
        <span style={{ fontSize: "40px" }}>Factories</span>
        <span style={{ fontSize: "24px" }}>& Buildings</span>
      </HomePage>
      <WhiteLine />
      {factories.map((factory) => (
        <FactorySpace
          key={factory.id}
          onClick={() => handleFactoryClick(factory)}
        >
          <img loading="lazy" src={imgFactory} />
          {factory.name}
          <ImgLgInformation
            loading="lazy"
            src={imgLgInfornation}
            onClick={() => handleFactoryInformation(factory)}
          />
          <BoldArrow
            loading="lazy"
            src={selectedFactory === factory ? imgBoldDown : imgBoldLeft}
          />

          {selectedFactory && selectedFactory.id === factory.id && (
            <div>
              {factory.buildings.map((building, index) => (
                <BuildingSpace
                  key={index}
                  selected={building.selected}
                  onClick={() => handleSectionSelect(building)}
                  className={selectedSection == building ? "selected" : ""}
                >
                  <img
                    loading="lazy"
                    src={imgBuilding}
                    onClick={() => {
                      handleFactorySelect(factory);
                      handleBuildingSelect(building);
                    }}
                  />
                  {building}

                  <ImgMdInformation
                    src={imgLgInfornation}
                    onClick={() => handleBuildingInformation(building)}
                  />
                  <ImgRemoveBuilding src={imgRemove} />
                </BuildingSpace>
              ))}

              <BuildingSpace onClick={() => handleAddNewBuilding(factory)}>
                + New Building
              </BuildingSpace>
            </div>
          )}
        </FactorySpace>
      ))}

      {/* <Button color="primary" type="button" size="lg" class>
        Add Building
      </Button> */}
    </ContainerMenutools>
  );
};
export default MenuTools;
