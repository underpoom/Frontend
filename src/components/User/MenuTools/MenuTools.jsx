import React, { useContext, useState, useEffect, useCallback } from "react";
import { UserContext, url } from "../../../bounding/UserContext";
import styled from "styled-components";
import TogglePopup from "../../Admin/TogglePopup";
import axios from "axios";

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

  align-items: start;
`;

const WhiteLine = styled.div`
  background-color: #fff;
  margin-top: 17px;
  height: 2px;
`;

const BoldArrow = styled.img``;

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
`;

const ImgMdInformation = styled.img`
  width: 20px;
  margin-left: auto;
`;

const ImgRemoveBuilding = styled.img``;

export const MenuTools = ({
  onFactoryInformationClick,
  onBuildingInformationClick,
  onNewBuildingClick,
  onFactoryClick,
  onBuildingClick,
  ishandleFetch,
}) => {
  const [factories, setFactories] = useState([]);
  const [selectedFactory, setSelectedFactory] = useState(null);
  const { user } = useContext(UserContext);

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
  const imgLgInfornation =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/8ecf12dfcc299c4d77bebc194b8fb77f9bd76b7ced54ffd7c2676c690e6d9678?apiKey=34584a6259e046a0be0d44044e057cb8&";
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${url}/get_user_factory?username=${user.username}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("successful:", response.data);
      setFactories(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [user.token, user.username]);
  useEffect(() => {
    fetchData();
  }, [fetchData, ishandleFetch]);

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

  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");

  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const handleClickSubmit = (data) => {
    setShowPopup(true);
    setPopupContent("Do you want to remove this building?");
    setSelectedBuilding(data);
  };
  const handleClickYes = async () => {
    console.log(selectedBuilding.building_id);
    try {
      const response = await axios.delete(`${url}/building`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          build_id: selectedBuilding.building_id,
        },
      });
      console.log("delete successful:", response.data);

      setSelectedBuilding(null);
      setShowPopup(false);
      fetchData();
    } catch (error) {
      console.error("Error delete:", error);
    }
  };

  return (
    <>
      {showPopup && (
        <TogglePopup
          content={popupContent}
          onClose={() => setShowPopup(false)}
          onYes={handleClickYes}
        />
      )}
      <ContainerMenutools>
        <HomePage>
          <span style={{ fontSize: "40px" }}>Factories</span>
          <span style={{ fontSize: "24px" }}>& Buildings</span>
        </HomePage>
        <WhiteLine />
        {factories.map((factory, index_f) => (
          <FactorySpace
            key={index_f}
            onClick={() => handleFactoryClick(factory)}
          >
            <img loading="lazy" src={imgFactory} alt="Factory" />
            {factory.factory_name}
            <ImgLgInformation
              loading="lazy"
              src={imgLgInfornation}
              onClick={() => handleFactoryInformation(factory)}
            />
            <BoldArrow
              loading="lazy"
              src={selectedFactory === factory ? imgBoldDown : imgBoldLeft}
            />

            {selectedFactory &&
              selectedFactory.factory_id === factory.factory_id && (
                <div>
                  {factory.buildings.map((building, index) => (
                    <BuildingSpace
                      key={index}
                      selected={building.selected}
                      onClick={() => handleSectionSelect(building)}
                      className={selectedSection === building ? "selected" : ""}
                    >
                      <img
                        loading="lazy"
                        src={imgBuilding}
                        alt="Building" // Add alt prop
                        onClick={() => {
                          handleFactorySelect(factory);
                          handleBuildingSelect(building);
                        }}
                      />

                      {building.building_name.length > 10
                        ? `${building.building_name.substring(0, 10)}...`
                        : building.building_name}

                      <ImgMdInformation
                        src={imgLgInfornation}
                        onClick={() => handleBuildingInformation(building)}
                        alt="Medium Information" // Add alt prop
                      />
                      <ImgRemoveBuilding
                        src={imgRemove}
                        onClick={() => handleClickSubmit(building)}
                        alt="Remove Building" // Add alt prop
                      />
                    </BuildingSpace>
                  ))}

                  <BuildingSpace onClick={() => handleAddNewBuilding(factory)}>
                    + New Building
                  </BuildingSpace>
                </div>
              )}
          </FactorySpace>
        ))}
      </ContainerMenutools>
    </>
  );
};
export default MenuTools;
