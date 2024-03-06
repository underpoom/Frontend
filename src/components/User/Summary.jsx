import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import { UserContext, url } from "../../bounding/UserContext";

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

export const Summary = ({ dataHistorySelected }) => {
  const { user } = useContext(UserContext);
  const [summaryData, setSummaryData] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${url}/get_summary_user_verified?histo_id=${dataHistorySelected._id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("sum successful:", response.data);
      setSummaryData(response.data[0]);

      console.log(response.data[0]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (summaryData !== null) {
    console.log("summm", summaryData.summary_user[0]);
  }
  return (
    <>
      {summaryData !== null && (
        <ContainerSummary>
          <ContainerDFS>
            <ContentDFS>
              <LabelDFS>Number of picture</LabelDFS>
              <ValueDFS>{summaryData.photo_count}</ValueDFS>
              <Defects>pictures</Defects>
            </ContentDFS>
          </ContainerDFS>

          <ContainerDFS>
            <ContentDFS>
              <LabelDFS>Detect from system</LabelDFS>
              <ValueDFS>
                {summaryData.summary_systems[0].summary_defect}
              </ValueDFS>
              <Defects>defects</Defects>
            </ContentDFS>
            <ContainerDetails>
              <LLine />
              <Detail>Detail</Detail>

              {Object.entries(summaryData.summary_systems[0]).map(
                ([key, value], index) =>
                  key !== "summary_defect" && (
                    <ContentItem key={index}>
                      <ItemLabel>{key} :</ItemLabel>
                      <ItemCount>{value}</ItemCount>
                    </ContentItem>
                  )
              )}
            </ContainerDetails>
          </ContainerDFS>
          <ContainerUv>
            <ContentDFS>
              <LabelDFS>User verified</LabelDFS>
              <ValueUV>{summaryData.summary_user[0].summary_defect}</ValueUV>
              <Defects>defects</Defects>
            </ContentDFS>
            <ContainerDetails>
              <LLine />
              <Detail>Detail</Detail>

              {Object.entries(summaryData.summary_user[0]).map(
                ([key, value], index) =>
                  key !== "summary_defect" && (
                    <ContentItem key={index}>
                      <ItemLabel>{key} :</ItemLabel>
                      <ItemCount>{value}</ItemCount>
                    </ContentItem>
                  )
              )}
            </ContainerDetails>
          </ContainerUv>
        </ContainerSummary>
      )}
    </>
  );
};

export default Summary;
