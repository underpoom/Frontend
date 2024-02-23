import React, { useState } from "react";
import styled, { css } from "styled-components";
const ContainerSummary = styled.div`
  display: flex;
  width: 132vh;
  height: 68vh;
  /* border: 1px solid red; */
  flex-direction: row;
  flex-wrap: wrap;
  align-content: start;
  justify-content: space-between;
  font: 700 32px Inter, sans-serif;
  gap: 1vh;
  /* border: 1px solid red; */
  margin-top: 2vh;
`;

const ContainerDFS = styled.div`
  border-radius: 10px;
  border: 2px solid var(--stork, #9f9f9f);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  color: #000;
  width: 400px;
  padding: 36px 0;
  height: fit-content;
`;

const ContainerUv = styled.div`
  border-radius: 10px;
  border: 2px solid var(--stork, #9f9f9f);
  background-color: #ebebeb;
  display: flex;
  flex-direction: column;
  color: #000;
  width: 400px;
  padding: 36px 0;
  height: fit-content;
`;

const ContentDFS = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  padding: 0 27px;
`;

const LabelDFS = styled.div`
  font: 32px Inter, sans-serif;
  align-self: start;
`;

const ValueDFS = styled.div`
  align-self: center;
  margin-top: 20px;
  font: 64px Inter, sans-serif;
  font-weight: 700;
`;

const ValueUV = styled.div`
  align-self: center;
  margin-top: 20px;
  font: 64px Inter, sans-serif;
  font-weight: 700;
  color: #0a89ff;
`;

const Defects = styled.div`
  align-self: end;
  margin-top: 20px;
  font: 24px Inter, sans-serif;
  font-weight: 700;
`;

const ContainerDetails = styled.div`
  display: flex;
  margin-top: 15px;
  flex-direction: column;
  align-items: start;
  font-size: 20px;
  font-weight: 400;
  padding: 0 27px;
`;

const LLine = styled.div`
  background-color: #9f9f9f;
  align-self: stretch;
  height: 1px;
`;

const Detail = styled.div`
  font-family: Inter, sans-serif;
  font-weight: 700;
  margin-top: 25px;
`;

const ItemCount = styled.div`
  font-family: Inter, sans-serif;
`;

const ItemLabel = styled.div`
  font-family: Inter, sans-serif;
  width: 110px;
  /* border: 1px solid red; */
  display: flex;
  justify-content: end;
`;

const ContentItem = styled.div`
  display: flex;
  margin-top: 15px;
  justify-content: space-between;
  gap: 10px;
  /* border: 1px solid red; */
  margin-left: 50px;
`;


export const Summary = () => {

    
  const dataDfs = [
    { label: "Briddrop", count: 235 },
    { label: "Glue", count: 300 },
    { label: "Mud", count: 0 },
    { label: "Rock", count: 46 },
    { label: "Rust", count: 150 },
    { label: "Stain", count: 1000 },
    { label: "Tape", count: 450 },
    { label: "Other", count: 159 },
  ];

  const dataUs = [
    { label: "Briddrop", count: 2305 },
    { label: "Glue", count: 3000 },
    { label: "Mud", count: 0 },
    { label: "Rock", count: 406 },
    { label: "Rust", count: 1500 },
    { label: "Stain", count: 10000 },
    { label: "Tape", count: 4500 },
    { label: "Other", count: 15009 },
  ];


  let ValueNoC = 12340;
  let ValueDfs = 2340;
  let ValueUv = 2040604;

  return (
    <>
      <ContainerSummary>
        <ContainerDFS>
          <ContentDFS>
            <LabelDFS>Number of picture</LabelDFS>
            <ValueDFS>{ValueNoC}</ValueDFS>
            <Defects>defects</Defects>
          </ContentDFS>
        </ContainerDFS>

        <ContainerDFS>
          <ContentDFS>
            <LabelDFS>Detect from system</LabelDFS>
            <ValueDFS>{ValueDfs}</ValueDFS>
            <Defects>defects</Defects>
          </ContentDFS>
          <ContainerDetails>
            <LLine />
            <Detail>Detail</Detail>

            {dataDfs.map((item, index) => (
              <ContentItem key={index}>
                <ItemLabel>{item.label} :</ItemLabel>
                <ItemCount>{item.count}</ItemCount>
              </ContentItem>
            ))}
          </ContainerDetails>
        </ContainerDFS>

        <ContainerUv>
          <ContentDFS>
            <LabelDFS>User verified</LabelDFS>
            <ValueUV>{ValueUv}</ValueUV>
            <Defects>defects</Defects>
          </ContentDFS>
          <ContainerDetails>
            <LLine />
            <Detail>Detail</Detail>

            {dataUs.map((item, index) => (
              <ContentItem key={index}>
                <ItemLabel>{item.label} :</ItemLabel>
                <ItemCount>{item.count}</ItemCount>
              </ContentItem>
            ))}
          </ContainerDetails>
        </ContainerUv>
      </ContainerSummary>
    </>
  );
};

export default Summary;
