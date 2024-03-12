import React, { useContext, useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import NavbarTop from "./NavbarTop/NavbarTop";
import LabelImage from "./LabelImage";
import Summary from "./Summary";
import axios from "axios";
import { BigRec } from "./BigRec";
import { UserContext, url } from "../../bounding/UserContext";
import Spinner from "../../bounding/Spinner";

const ContainerEditProfile = styled.div`
  display: flex;
  width: 132vh;
  height: 68vh;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: start;
  justify-content: start;
  font: 700 32px Inter, sans-serif;
  gap: 1vh;
  margin-top: 2vh;
`;

const ContainerSmallRec = styled.div`
  display: flex;
  padding: 3px 10px;
  gap: 20px;
  width: 590px;
  justify-content: space-between;
  height: 627px;
  flex-wrap: wrap;
  flex-direction: row;
  overflow-y: auto;
`;

const ContentSmallRec = styled.div`
  width: 242px;
  height: 136px;
  cursor: pointer;
  position: relative;
  margin-bottom: 40px;
`;

const SmallRec = styled.div`
  width: 242px;
  height: 136px;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.imgSrc});
  img {
    width: 100%;
    height: 100%;
  }
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  fill: #0a89ff;
  position: absolute;
  right: 0;
`;

const HeadVS = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: 700;
`;

const Line1 = styled.div`
  border-bottom: 1px solid #000;
  width: 130px;
`;

const ContentVerified = styled.div`
  font-family: Inter, sans-serif;
  border-radius: 10px 0px 0px 0px;
  border-top: 1px solid #000;
  border-right: 1px solid #000;
  border-left: 1px solid #000;
  border-bottom: 1px solid #000;
  background-color: var(--frame-color, #f6f6f6);
  justify-content: center;
  padding: 10px 20px;
  color: #9f9f9f;
  ${(props) =>
    props.isSelected &&
    css`
      color: #000;
      border-bottom: none;
    `}
  cursor: pointer;
  transition: all 0.5s ease;
`;

const ContentSummary = styled.div`
  font-family: Inter, sans-serif;
  border-radius: 0px 10px 0px 0px;
  border-top: 1px solid #000;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  background-color: var(--frame-color, #f6f6f6);
  color: #9f9f9f;
  padding: 10px 20px;
  ${(props) =>
    props.isSelected &&
    css`
      color: #000;
      border-bottom: none;
    `}
  cursor: pointer;
  transition: all 0.5s ease;
`;

const Line2 = styled.div`
  border-bottom: 1px solid #000;
  width: 100%;
`;

const DefectCount = styled.div`
  font-family: Inter, sans-serif;
  background-color: #000;
  color: white;
  font-size: 24px;
  width: 242px;
`;

const imgVerified =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/8136dc1d4a7187d64fad29f59cd3285157f97f06b9257a37205da26bd618700f?apiKey=34584a6259e046a0be0d44044e057cb8&";

export const VerifySummary = ({
  buildingDataW,
  onBackClick,
  handlepageChange,
  dataHistorySelected,
}) => {
  const [selectedSection, setSelectSection] = useState("Verify");
  const [selectedImage, setSelectImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [imageListBigRec, setImageListBigRec] = useState([]);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${url}/get_image?history_id=${dataHistorySelected._id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("successful:", response.data);
      setImageListBigRec(response.data);
      setImageList(response.data[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [dataHistorySelected._id, user.token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSection = (section) => {
    setSelectSection(section);
  };

  const handleSelectedImage = (data) => {
    setSelectImage(data);
  };

  const onBackClickThis = () => {
    setSelectImage(null);
    fetchData();
  };

  const handlepage = (data) => {
    handlepageChange(data);
  };

  const [hoveredImage, setHoveredImage] = useState(null);

  const handleMouseEnter = (img) => {
    setHoveredImage(img);
    console.log("Hovered Image:", img);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  return (
    <>
      {selectedImage === null ? (
        <>
          <NavbarTop
            pageTitle={buildingDataW.building_name}
            changeStatePage={handlepage}
            onBackClick={onBackClick}
          />

          <HeadVS>
            <Line1 />
            <ContentVerified
              isSelected={selectedSection === "Verify"}
              onClick={() => handleSection("Verify")}
            >
              Verify
            </ContentVerified>

            <ContentSummary
              isSelected={selectedSection === "Summary"}
              onClick={() => handleSection("Summary")}
            >
              Summary
            </ContentSummary>
            <Line2 />
          </HeadVS>

          {selectedSection === "Verify" && (
            <>
              {loading ? (
                <Spinner />
              ) : (
                <ContainerEditProfile>
                  <BigRec
                    hoveredImage={hoveredImage}
                    dataHistorySelected={dataHistorySelected}
                    imageListBigRec={imageListBigRec}
                  />

                  <ContainerSmallRec>
                    {imageList.map((img, index) => (
                      <ContentSmallRec key={index}>
                        {img.is_verified && <Img src={imgVerified} />}

                        <SmallRec
                          onMouseEnter={() => handleMouseEnter(img)}
                          onMouseLeave={handleMouseLeave}
                          onClick={() => handleSelectedImage(img)}
                          imgSrc={`${url}/get_img/${img.image_id}`}
                          // imgSrc={img.image_path} // for localhost
                        />
                        <DefectCount>Defect : {img.defect_count}</DefectCount>
                      </ContentSmallRec>
                    ))}
                  </ContainerSmallRec>
                </ContainerEditProfile>
              )}
            </>
          )}

          {selectedSection === "Summary" && (
            <Summary dataHistorySelected={dataHistorySelected} />
          )}
        </>
      ) : (
        <LabelImage
          imgData={selectedImage}
          onBackClick={onBackClickThis}
          handlepageChange={handlepage}
        />
      )}
    </>
  );
};

export default VerifySummary;
