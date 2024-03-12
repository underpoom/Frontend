import React, { useContext, useState } from "react";
import styled from "styled-components";
import NavbarTop from "./NavbarTop/NavbarTop";
import { UserContext, url } from "../../bounding/UserContext";
import axios from "axios";
import AlertPopup from "../Admin/AlertPopup";

const ContainerEditProfile = styled.div`
  display: flex;
  width: 132vh;
  height: 68vh;

  flex-direction: row;
  flex-wrap: wrap;
  align-content: start;
  font: 700 32px Inter, sans-serif;
  padding: 1.5vh 0vh 0 1.5vh;
  padding-left: 5vh;
  gap: 1vh;
`;

const Label = styled.div`
  display: flex;
  color: #000;
  gap: 20px;
  font-size: 24px;
  margin-top: 24px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  width: 100%;
  height: 60px;
`;

const ButtonNew = styled.form`
  border-radius: 10px;
  background-color: var(--Important-Button, #0a89ff);
  display: flex;

  color: var(--light, #fafafa);
  font-weight: 700;
  white-space: nowrap;
  padding: 8px 27px;
  margin-left: auto;

  label {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  input[type="file"] {
    display: none;
  }
`;

const Img = styled.img`
  object-fit: auto;
  object-position: center;
  width: 20px;
  fill: #fafafa;
`;
const LabelLg = styled.div`
  color: #9f9f9f;
  font-family: Inter, sans-serif;
`;
const LabelMd = styled.div`
  color: #9f9f9f;
  font-family: Inter, sans-serif;
  margin-top: 40px;
  margin-left: -490px;
`;

const Div = styled.div`
  border-radius: 10px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 21px 16px;
  font-size: 20px;
  margin-top: 15px;
  width: 250px;
`;

const ImgDelete = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 22px;
  stroke-width: 1.5px;
  stroke: #000;
  align-self: start;
`;

const DivLine = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 24px;
  color: var(--light, #fafafa);
  font-weight: 700;
  white-space: nowrap;
`;

const LineBottom = styled.div`
  background-color: #0e1821;
  min-height: 1px;
  width: 100%;
`;

const ButtonProcess = styled.div`
  font-family: Inter, sans-serif;
  border-radius: 10px;
  background-color: var(--Important-Button, #0a89ff);
  align-self: end;
  margin-top: 20px;
  justify-content: center;
  padding: 8px 27px;
  cursor: pointer;
`;

const Progress = styled.div`
  font-family: Inter, sans-serif;
  border-radius: 10px;
  background-color: var(--Important-Button, #0a89ff);
  padding: 5px 20px 15px 20px;
  justify-content: center;
  width: 30%;
  height: 70%;
  margin-top: -55px;
  margin-left: 700px;
  height:90px;
`;

const progressStyle = {
  width: "100%",
  height: "30px", // Adjust height as needed
  marginTop: "-10px",
};

export const ViewUploadFile = ({
  buildingDataW,
  onBackClick,
  handlepageChange,
  dataHistorySelected,
}) => {
  const { user } = useContext(UserContext);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const handlepage = (data) => {
    handlepageChange(data);
  };

  const [showPopupAlert, setShowPopupAlert] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [popupContentAlert, setPopupContentAlert] = useState("");

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const handleFileDelete = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };


  console.log(dataHistorySelected);
  // ----------------------------------------------------------------
  const handleProcessClick = async (event) => {
    setPopupContentAlert("Processing video ... ");
    setShowPopupAlert(true);
    setShowProgress(true);
    event.preventDefault();
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("fileList", file);
    });

    try {
      const uploadResponse = await axios.post(
        `${url}/upload_video_srt_file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            accept: "application/json",
            Authorization: `Bearer ${user.token}`,
          },

          onUploadProgress: (progressEvent) => {
            const percent = (progressEvent.loaded / progressEvent.total) * 100;
            setUploadProgress(percent);
          },
        }
      );
      console.log("Files uploaded successfully:", uploadResponse.data);
      const inputDir = uploadResponse.data.path;
      const outputDir = dataHistorySelected.history_path;

      console.log(inputDir);
      console.log(outputDir);

      try {
        const response = await axios.post(
          `${url}/extract_video`,
          {
            input_dir: inputDir,
            output_dir: outputDir,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        console.log("Process successful:", response.data);
      } catch (error) {
        console.error("Error process:", error);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <>
      {showPopupAlert && (
        <AlertPopup
          content={popupContentAlert}
          onClose={() => {
            setShowPopupAlert(false);
          }}
        />
      )}

      <NavbarTop
        pageTitle={buildingDataW.building_name}
        changeStatePage={handlepage}
        onBackClick={onBackClick}
      />
      <ContainerEditProfile>
        <Label>
          Upload File
          <LabelLg>(Upload only .mp4 and .srt file)</LabelLg>
          <LabelMd>
            Your .srt file must have same name as your .mp4 file.
          </LabelMd>
          <ButtonNew>
            <label>
              <Img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5b7e66065244b64608b7f730498d9aab94fd4597cb181dbb3df8847800e605b?apiKey=34584a6259e046a0be0d44044e057cb8&"
              />
              Upload
              <input
                type="file"
                accept=".mp4,.srt"
                multiple
                onChange={handleFileChange}
              />
            </label>
          </ButtonNew>
        </Label>

        {files.map((file, index) => (
          <Div key={index}>
            {file.name.length > 10
              ? `${file.name.substring(0, 10)}...`
              : file.name}
            <ImgDelete
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c37a1b1202a409c4cc0de55bac3f84cca354a05c7465d097599fe377b80d6f35?apiKey=34584a6259e046a0be0d44044e057cb8&"
              onClick={() => handleFileDelete(index)}
            />
          </Div>
        ))}
      </ContainerEditProfile>
      <DivLine>
        <LineBottom />
        <ButtonProcess onClick={handleProcessClick}>Process</ButtonProcess>


        {showProgress === true && (
          <Progress>
          <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>
          <progress value={uploadProgress} max={100} style={progressStyle} />
        </Progress>
        )}
        
      </DivLine>
    </>
  );
};

export default ViewUploadFile;
