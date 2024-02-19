import React from "react";
import styled from "styled-components";
import MenuTools from "./MenuTools/MenuTools";
import NavbarTop from "./NavbarTop/NavbarTop";

const ContainerInformation = styled.div`
  display: flex;
  width: 133vh;
  height: 76vh;
  /* border: 1px red solid; */
  font: 700 32px Inter, sans-serif;
  padding: 1.5vh 1.5vh 0 1.5vh;
  align-items: center;
  flex-direction: column;
`;
const Condiv = styled.div`
  margin-top: 8vh;
  width: 811px;
  max-width: 100%;
`;
const Condiv2 = styled.div`
  gap: 15vh;
  display: flex;
`;
const Concolumn = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 50%;
  margin-left: -6vh;
`;
const Condiv3 = styled.div`
  border-radius: 20px;
  border: 1px solid var(--stork, #9f9f9f);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 46px 36px;
`;
const Condiv4 = styled.div`
  border-radius: 20px;
  border: 1px solid var(--stork, #9f9f9f);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: var(--Important-Button, #0a89ff);
  z-index: 10;
  display: flex;
  margin-top: 50px;
  width: 242px;
  max-width: 100%;
  justify-content: center;
  align-items: center;
  padding: 44px 51px;
`;
const Condiv5 = styled.div`
  color: #000;
  text-align: center;
  margin-top: 25px;
  width: 271px;
  font: 700 24px Inter, sans-serif;
`;
const Condiv6 = styled.div`
  color: var(--stork, #9f9f9f);
  text-align: center;
  align-self: stretch;
  margin-top: 17px;
  font: 400 16px Inter, sans-serif;
`;
const Condiv7 = styled.div`
  border-radius: 10px;
  border: 2px solid var(--stork, #9f9f9f);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: var(--Important-Button, #0a89ff);
  margin-top: 23px;
  justify-content: center;
  color: #fff;
  white-space: nowrap;
  text-align: center;
  padding: 19px 22px;
  font: 700 16px Inter, sans-serif;
`;
const Condiv10 = styled.div`
  color: #000;
  text-align: center;
  margin-top: 26px;
  font: 700 24px Inter, sans-serif;
`;

const Condiv12 = styled.div`
  border-radius: 10px;
  border: 2px solid var(--stork, #9f9f9f);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: #54ad58;
  align-self: center;
  margin-top: 23px;
  justify-content: center;
  color: #fff;
  white-space: nowrap;
  text-align: center;
  padding: 19px 22px;
  font: 700 16px Inter, sans-serif;
`;
const Concolumn2 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 50%;
  margin-left: 5vh;
`;
const Condiv8 = styled.div`
  border-radius: 20px;
  border: 1px solid var(--stork, #9f9f9f);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  padding: 0 60px 36px;
`;
const Condiv9 = styled.div`
  border-radius: 20px;
  border: 1px solid var(--stork, #9f9f9f);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: #54ad58;
  z-index: 10;
  display: flex;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
  padding: 42px 51px;
`;
const Conimg2 = styled.div`
  color: #000;
  text-align: center;
  font: 400 32px Inter, sans-serif;
  margin-right: auto;
  margin-left: 4vh;
`;
const Info = styled.div`
  color: #000;
  text-align: center;
  font: 400 32px Inter, sans-serif;
  margin-right: auto;
  margin-left: 4vh;
`;

const Img1 = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 100%;
  stroke-width: 4px;
  stroke: #fff;
`;

const Img2 = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 140px;
`;

const Information = ({handlepageChange}) => {

  const handlepage = (data) => {
    handlepageChange(data);
  };
  return (
    <>
     
        <NavbarTop pageTitle="Information" changeStatePage={handlepage} />
        <ContainerInformation>
          <Info>Document</Info>

          <Condiv>
            <Condiv2>
              <Concolumn>
                <Condiv3>
                  <Condiv4>
                    <Img1 src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f32db4ef39b87efda9d2258e8443d21f1f01d24a9e2774c960c693c1015164e?apiKey=34584a6259e046a0be0d44044e057cb8&" />
                  </Condiv4>
                  <Condiv5>
                    Drone flight <br />
                    requirements
                  </Condiv5>
                  <Condiv6>
                    <span style={{ fontWeight: "bold" }}>About</span>
                    <span> : Speed of drone, </span>

                    <span>Time to fly the drone, Drone camera angle.</span>
                    <br />
                    <span>etc.</span>
                  </Condiv6>

                  <Condiv7>Download</Condiv7>
                </Condiv3>
              </Concolumn>
              <Concolumn2>
                <Condiv8>
                  <Condiv9>
                    <Img2 src="https://cdn.builder.io/api/v1/image/assets/TEMP/1bd0207a8dfcd20c9a8b2110b179a6468af2bfccef906b8fdfd23eb863253ec8?apiKey=34584a6259e046a0be0d44044e057cb8&" />
                  </Condiv9>
                  <Condiv10>
                    How to
                    <br />
                    use website
                  </Condiv10>
                  <Condiv6>
                    <span style={{ fontWeight: "bold" }}>About</span>
                    <span> : How to add video to website,</span>
                    <span>How to adjust defect in picture, etc. </span>{" "}
                  </Condiv6>

                  <Condiv12>Download</Condiv12>
                </Condiv8>
              </Concolumn2>
            </Condiv2>
          </Condiv>
        </ContainerInformation>
     
    </>
  );
};
export default Information;
