import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import NavbarTop from "./NavbarTop/NavbarTop";
import TogglePopup from "../Admin/TogglePopup";
import ViewUploadFile from "./ViewUploadFile";
import VerifySummary from "./VerifySummary";
import axios from "axios";
import { UserContext, url } from "../../bounding/UserContext";
import Spinner from "../../bounding/Spinner";

const ContainerEditProfile = styled.div`
  display: flex;
  width: 132vh;
  height: 76vh;

  flex-direction: row;
  flex-wrap: wrap;
  align-content: start;
  font: 700 32px Inter, sans-serif;
  padding: 1.5vh 1.5vh 0 1.5vh;
  padding-left: 5vh;
  gap: 1vh;
`;

const Label = styled.div`
  display: flex;
  color: #000;
  gap: 20px;
  font-size: 24px;
  margin-top: 12px;
  margin-bottom: 12px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  width: 100%;
  height: 60px;
  align-items: center;
`;

const ButtonNew = styled.div`
  border-radius: 10px;
  background-color: var(--Important-Button, #0a89ff);
  display: flex;
  gap: 12px;
  color: var(--light, #fafafa);
  font-weight: 700;
  white-space: nowrap;
  padding: 14px 18px;
  margin-left: auto;
  margin-right: 58px;
  cursor: pointer;
`;

const Img = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 20px;
  fill: #fafafa;
`;

const ContainerDate = styled.div`
  border-radius: 10px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: #fff;
  width: 380px;
  height: 200px;
  padding: 16px 20px;
  gap: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentDate = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  font-size: 24px;
  color: #000;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  gap: 10px;
`;

const LabelDate = styled.div`
  color: var(--stork, #9f9f9f);
  font-family: Inter, sans-serif;
`;

const DateValue = styled.div`
  font-family: Inter, sans-serif;
`;

const ButtonView = styled.div`
  font-family: Inter, sans-serif;
  border-radius: 10px;
  background-color: #0a89ff;
  justify-content: center;
  color: #fff;
  padding: 14px 11px;
  font-size: 24px;
  cursor: pointer;
`;

const ButtonDelete = styled.div`
  font-family: Inter, sans-serif;
  border-radius: 10px;
  border: 2px solid var(--Important-Button, #0a89ff);
  margin-top: 23px;
  justify-content: center;
  color: #0a89ff;
  padding: 15px 11px;
  font-size: 24px;
  cursor: pointer;
`;

const imgButtonNew =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/d5b7e66065244b64608b7f730498d9aab94fd4597cb181dbb3df8847800e605b?apiKey=34584a6259e046a0be0d44044e057cb8&";

export const AllDataHistory = ({
  factoryData,
  buildingData,
  handlepageChange,
}) => {
  const { user } = useContext(UserContext);
  const handlepage = (data) => {
    handlepageChange(data);
  };

  const [loading, setLoading] = useState(true);

  const handleUpload = (data) => {
    setDataHistorySelected(data);
    setUploadedFile(true);
  };

  const handleView = (data) => {
    setDataHistorySelected(data);
    setVerifySummary(true);
  };

  const handleBackClick = (data) => {
    setUploadedFile(false);
    setVerifySummary(false);
    fetchData();
  };

  const [uploadedFile, setUploadedFile] = useState(false);
  const [verifySummary, setVerifySummary] = useState(false);

  useEffect(() => {
    setUploadedFile(false);
    setVerifySummary(false);
    console.log(buildingData);
  }, [buildingData]);

  const handleNewButtonClick = async () => {
    try {
      const response = await axios.post(
        `${url}/post_history`,
        {
          build_id: buildingData.building_id,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("new successful:", response.data);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [historyDataSelected, setHistoryDataSelected] = useState(null);

  const handleDeleteButtonClick = async (data) => {
    setShowPopup(true);
    setPopupContent("Do you want to delete this history?");
    setHistoryDataSelected(data);
  };

  const handleClickYes = async () => {
    try {
      const response = await axios.delete(`${url}/delete_history`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          histo_id: historyDataSelected._id,
        },
      });
      console.log("delete successful:", response.data);
      fetchData();
      setShowPopup(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [dataHistory, setDataHistory] = useState([]);
  const [dataHistorySelected, setDataHistorySelected] = useState([]);

  console.log(buildingData);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${url}/get_history?id_building=${buildingData.building_id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("successful:", response.data);
      setDataHistory(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [buildingData]);
  return (
    <>
      {showPopup && (
        <TogglePopup
          content={popupContent}
          onClose={() => setShowPopup(false)}
          onYes={handleClickYes}
        />
      )}

      {uploadedFile === false && verifySummary === false && (
        <>
          <NavbarTop
            pageTitle="All Data History"
            changeStatePage={handlepage}
          />

          {loading ? (
            <Spinner />
          ) : (
            <ContainerEditProfile>
              <Label>
                {buildingData.building_name}

                <ButtonNew onClick={handleNewButtonClick}>
                  <Img loading="lazy" src={imgButtonNew} />
                  new
                </ButtonNew>
              </Label>

              {dataHistory.map((history, index) => (
                <ContainerDate key={index}>
                  <ContentDate>
                    <LabelDate>Day - Month - Year</LabelDate>
                    <DateValue>{history.create_date}</DateValue>
                    <LabelDate>Time</LabelDate>
                    <DateValue>{history.create_time}</DateValue>
                  </ContentDate>
                  <div>
                    {!history.is_process ? (
                      <ButtonView onClick={() => handleUpload(history)}>
                        Upload
                      </ButtonView>
                    ) : (
                      <ButtonView onClick={() => handleView(history)}>
                        View
                      </ButtonView>
                    )}
                    <ButtonDelete
                      onClick={() => handleDeleteButtonClick(history)}
                    >
                      Delete
                    </ButtonDelete>
                  </div>
                </ContainerDate>
              ))}
            </ContainerEditProfile>
          )}
        </>
      )}

      {uploadedFile === true && (
        <ViewUploadFile
          buildingDataW={buildingData}
          dataHistorySelected={dataHistorySelected}
          onBackClick={handleBackClick}
          handlepageChange={handlepage}
        />
      )}

      {verifySummary === true && (
        <VerifySummary
          buildingDataW={buildingData}
          dataHistorySelected={dataHistorySelected}
          onBackClick={handleBackClick}
          handlepageChange={handlepage}
        />
      )}
    </>
  );
};

export default AllDataHistory;
