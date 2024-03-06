import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { UserContext, url } from "../../bounding/UserContext";

const ContainerEditProfile = styled.div`
  position: relative;
  /* display: flex; */
  /* flex-wrap: wrap; */
  width: 674px;
  height: 627px;
  /* border: 1px solid red; */
`;

const ImageWrapper = styled.div`
  width: calc(100% / ${(props) => props.maxX});
  height: calc(100% / ${(props) => props.maxY});
  position: relative;
  border: 1px solid red;
  border: ${(props) => (props.isHovered ? "1px solid red" : "none")};
`;

export const BigRec = ({ hoveredImage, dataHistorySelected }) => {
  const { user } = useContext(UserContext);
  const [selectedImage, setSelectImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [imageListDetail, setImageListDetail] = useState({
    max_x: 1,
    max_y: 1,
  });

  const fetchData = async () => {
    try {
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
      setImageListDetail(response.data[1]);
      const newImageList = response.data[0].map((item) => ({
        ...item,
        image_path: item.image_path.replace("data/", ""),
      }));
      setImageList(newImageList);
      console.log(imageList);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {selectedImage === null ? (
        <>
          {/* Your NavbarTop and other UI components */}
          <ContainerEditProfile>
            {imageList.map((img, index) => {
              const { x_offset, y_offset } = img;

              const { max_x, max_y } = imageListDetail;

              // console.log("uuu",max_x, max_y);
              const scale = 674 / (max_x * 3840); // Adjust the scale according to your needs
              const gridWidth = 674 / max_x;
              const gridHeight = 627 / max_y;
              const gridX = Math.floor(index / max_x);
              const gridY = index % max_x;
              // const left = ;
              // const top = y_offset * gridHeight ;

              return (
                <ImageWrapper
                  key={index}
                  style={{
                    position: "absolute",
                    left: `${x_offset * gridWidth}px`,
                    top: `${y_offset * gridHeight}px`,
                    width: `${gridWidth}px`,
                    height: `${gridHeight}px`,
                    border:
                      hoveredImage != null &&
                      hoveredImage.image_id === img.image_id
                        ? "3px solid red"
                        : "none",
                  }}
                >
                  <img
                    src={img.image_path}
                    alt={`frame_${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </ImageWrapper>
              );
            })}
          </ContainerEditProfile>
        </>
      ) : (
        {
          /* Render selected image details */
        }
      )}
    </>
  );
};

export default BigRec;
