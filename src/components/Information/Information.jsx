import React from "react";
import styled from "styled-components";
import MenuTools from "../MenuTools/MenuTools";
import NavbarTop from "../NavbarTop/NavbarTop";
import "./Information.css";

const RightContainer = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
`;
const ContainerInformation = styled.div`
  display: flex;
  width: 133vh;
  height: 76vh;
  border: 1px red solid;

  font: 700 32px Inter, sans-serif;
  padding: 1.5vh 1.5vh 0 1.5vh;

  align-items: center;
  flex-direction: column;
`;

export const Information = () => {
  return (
    <>
      <MenuTools />
      <RightContainer>
        <NavbarTop pageTitle="Information" />
        <ContainerInformation>
          <div className="info">Document</div>

          <div className="div">
            <div className="div-2">
              <div className="column">
                <div className="div-3">
                  <div className="div-4">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f32db4ef39b87efda9d2258e8443d21f1f01d24a9e2774c960c693c1015164e?apiKey=34584a6259e046a0be0d44044e057cb8&"
                      className="img"
                    />
                  </div>
                  <div className="div-5">
                    Drone flight <br />
                    requirements
                  </div>
                  <div className="div-6">
                    <span></span>
                    <span style={{ fontWeight: "bold" }}>About</span>
                    <span> : Speed of drone, </span>

                    <span>Time to fly the drone, Drone camera angle.</span>
                    <br />
                    <span>etc.</span>
                  </div>

                  <button className="div-7">Download</button>
                </div>
              </div>
              <div className="column-2">
                <div className="div-8">
                  <div className="div-9">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/1bd0207a8dfcd20c9a8b2110b179a6468af2bfccef906b8fdfd23eb863253ec8?apiKey=34584a6259e046a0be0d44044e057cb8&"
                      className="img-2"
                    />
                  </div>
                  <div className="div-10">
                    How to
                    <br />
                    use website
                  </div>
                  <div className="div-6">
                    <span style={{ fontWeight: "bold" }}>About</span>
                    <span> : How to add video to website,</span>
                    <span>How to adjust defect in picture, etc. </span>{" "}
                  </div>

                  <button className="div-12">Download</button>
                </div>
              </div>
            </div>
          </div>
        </ContainerInformation>
      </RightContainer>
    </>
  );
};
export default Information;
