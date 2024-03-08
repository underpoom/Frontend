import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import NavbarTop from "./NavbarTop/NavbarTop";
import TogglePopup from "../Admin/TogglePopup";
import axios from "axios";
import { UserContext, url } from "../../bounding/UserContext";
import Spinner from "../../bounding/Spinner";

const ContainerFactoryDetails = styled.div`
  display: flex;
  width: 132vh;
  height: 76vh;

  flex-direction: column;
  font: 700 32px Inter, sans-serif;
  padding: 2.5vh 1.5vh 0 1.5vh;
  align-items: start;
`;

const Box = styled.div`
  border-radius: 20px;
  border: 1px solid var(--stork, #9f9f9f);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: #d9d9d9;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: start;
  padding: 49px 80px 49px 33px;
  margin-top: 2.5vh;
`;

const ContentData = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const LabelBuildingName = styled.div`
  font-family: Inter, sans-serif;
  font-size: 24px;
  margin-bottom: 20px;
`;

const BuildingName = styled.div`
  font-family: Inter, sans-serif;
  font-weight: 400;

  font-size: 24px;
`;

const ContainerMeter = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: start;
  font-size: 24px;
  color: #000;
  margin: 20px 0 50px 0;
  width: 350px;
`;

const LabelBuildingWL = styled.div`
  text-align: center;
  font-family: Inter, sans-serif;
  font-weight: 700;
`;

const ContentMeter = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  gap: 20px;
  white-space: nowrap;
`;

const MeterVar = styled.div`
  font-family: Inter, sans-serif;
  border-radius: 10px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: #fff;
  display: flex;
  justify-content: start;
  font-weight: 400;
  padding: 10px 10px 10px 20px;
  width: 220px;
`;

const Meter = styled.div`
  text-align: center;
  font-family: Inter, sans-serif;
  font-weight: 700;
  margin: auto;
`;

const BuildingWL = styled.div`
  display: flex;
`;

const ButtonConfigConfirm = styled.button`
  border-radius: 10px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: var(--Important-Button, #0a89ff);
  align-self: end;
  margin-top: 34px;
  justify-content: center;
  color: var(--light, #fafafa);
  white-space: nowrap;
  padding: 13px 35px;
  font: 700 24px Inter, sans-serif;
`;

export const BuildingDetails = ({ buildingData, handlepageChange }) => {
  const { user } = useContext(UserContext);
  const [valueLenght, setValueLenght] = useState();
  const [valueWidth, setValueWidth] = useState();
  const [valueLatitude, setValueLatitude] = useState();
  const [valueLongitude, setValueLongitude] = useState();

  const [isEditing, setIsEditing] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [loading, setLoading] = useState(true);

  const handleTogglePopupSave = (user) => {
    setShowPopup(true);
    setPopupContent("Are you sure to confirm this configuration?");
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${url}/get_building_info?build_id=${buildingData.building_id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("successful:", response.data);
      setValueLenght(response.data.building_length);
      setValueWidth(response.data.building_width);
      setValueLatitude(response.data.building_latitude);
      setValueLongitude(response.data.building_longitude);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchData();
    setIsEditing(false);
  }, [buildingData]);

  console.log(buildingData);
  // ----------------------------------------------------------------
  const handleSaveClickYes = async () => {
    setShowPopup(false);
    setIsEditing(false);

    console.log("valueLenght :", valueLenght);
    console.log("valueWidth :", valueWidth);
    console.log("valueLatitude :", valueLatitude);
    console.log("valueLongitude :", valueLongitude);

    try {
      const response = await axios.put(
        `${url}/change_building_detail`,
        {
          building_id: buildingData.building_id,
          building_length: valueLenght,
          building_width: valueWidth,
          building_latitude: valueLatitude,
          building_longitude: valueLongitude,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("save successful:", response.data);
      fetchData();
    } catch (error) {
      console.error("Error save:", error);
    }
  };

  const handlepage = (data) => {
    handlepageChange(data);
  };
  return (
    <>
      {showPopup && (
        <TogglePopup
          content={popupContent}
          onClose={() => setShowPopup(false)}
          onYes={handleSaveClickYes}
        />
      )}

      <NavbarTop pageTitle="Building Details" changeStatePage={handlepage} />
      {loading ? (
        <Spinner />
      ) : (
        <ContainerFactoryDetails>
          This building detail :
          <Box>
            <ContentData>
              <LabelBuildingName>Building Name : </LabelBuildingName>
              <BuildingName>{buildingData.building_name}</BuildingName>
            </ContentData>

            <BuildingWL>
              <ContainerMeter>
                <LabelBuildingWL>Building Lenght </LabelBuildingWL>
                <ContentMeter>
                  <MeterVar
                    contentEditable={isEditing}
                    suppressContentEditableWarning={isEditing}
                    onBlur={(e) => setValueLenght(e.target.innerText)}
                  >
                    {valueLenght}
                  </MeterVar>
                  <Meter>Meter</Meter>
                </ContentMeter>
              </ContainerMeter>

              <ContainerMeter>
                <LabelBuildingWL>Building Width </LabelBuildingWL>
                <ContentMeter>
                  <MeterVar
                    contentEditable={isEditing}
                    suppressContentEditableWarning={isEditing}
                    onBlur={(e) => setValueWidth(e.target.innerText)}
                  >
                    {valueWidth}
                  </MeterVar>
                  <Meter>Meter</Meter>
                </ContentMeter>
              </ContainerMeter>
            </BuildingWL>

            <LabelBuildingName>Building center location</LabelBuildingName>

            <BuildingWL>
              <ContainerMeter>
                <LabelBuildingWL>Building latitude </LabelBuildingWL>
                <ContentMeter>
                  <MeterVar
                    contentEditable={isEditing}
                    suppressContentEditableWarning={isEditing}
                    onBlur={(e) => setValueLatitude(e.target.innerText)}
                  >
                    {valueLatitude}
                  </MeterVar>
                </ContentMeter>
              </ContainerMeter>

              <ContainerMeter>
                <LabelBuildingWL>Building longitude </LabelBuildingWL>
                <ContentMeter>
                  <MeterVar
                    contentEditable={isEditing}
                    suppressContentEditableWarning={isEditing}
                    onBlur={(e) => setValueLongitude(e.target.innerText)}
                  >
                    {valueLongitude}
                  </MeterVar>
                </ContentMeter>
              </ContainerMeter>
            </BuildingWL>
          </Box>
          {!isEditing && (
            <ButtonConfigConfirm onClick={() => setIsEditing(true)}>
              Edit
            </ButtonConfigConfirm>
          )}
          {isEditing && (
            <ButtonConfigConfirm onClick={() => handleTogglePopupSave()}>
              Save
            </ButtonConfigConfirm>
          )}
        </ContainerFactoryDetails>
      )}
    </>
  );
};

export default BuildingDetails;
