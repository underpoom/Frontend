import React from "react";
import styled from "styled-components";
import { url } from "../../bounding/UserContext";

const ContainerEditProfile = styled.div`
  position: relative;
  width: 674px;
  height: 627px;
`;

const ImageWrapper = styled.div`
  width: calc(100% / ${(props) => props.maxX});
  height: calc(100% / ${(props) => props.maxY});
  position: relative;
  border: 1px solid red;
  border: ${(props) => (props.isHovered ? "1px solid red" : "none")};
`;

export const BigRec = ({ hoveredImage, imageListBigRec }) => {
  return (
    <>
      <ContainerEditProfile>
        {imageListBigRec[0].map((img, index) => {
          const { x_offset, y_offset } = img;
          const { max_x, max_y } = imageListBigRec[1];
          const gridWidth = 674 / max_x;
          const gridHeight = 627 / max_y;

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
                  hoveredImage != null && hoveredImage.image_id === img.image_id
                    ? "3px solid red"
                    : "none",
              }}
            >
              <img
                src={`${url}/get_img/${img.image_id}`}
                // src={img.image_path} // for localhost

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
  );
};

export default BigRec;
