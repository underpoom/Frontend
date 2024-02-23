import React, { useState, useEffect } from "react";
import NavbarTopAdmin from "./NavbarTopAdmin/NavbarTopAdmin";
import styled from "styled-components";

import axios from "axios";
const url = "http://127.0.0.1:8000";

const ContainerAddFactory = styled.div`
  display: flex;
  height: 76vh;
  /* border: 1px solid red; */
  flex-direction: column;
  overflow-y: auto;
  align-items: center;
  padding-right: 50vh;
  padding-top: 5vh;
`;
const SelectSection = styled.div`
  white-space: nowrap;
  font: 700 24px Inter, sans-serif;
  /* border: 1px solid red; */
  margin-bottom: 5vh;
`;

const StyledSelect = styled.select`
  border-radius: 10px;
  border: 2px solid var(--stork, #0a89ff);
  color: var(--Important-Button, #000000);
  font-weight: bold;
  margin-left: 1vh;
  padding-left: 1vh;
  padding-right: 1vh;
  opacity: ${(props) => (props.loading ? "0.5" : "1")};
  pointer-events: ${(props) => (props.loading ? "none" : "auto")};
`;

const PasswordInput = styled.input`
  border-radius: 10px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: var(--light, #fafafa);
  width: 39vh;
  max-width: 100%;
  height: 5vh;
  padding: 0 10px;
  font-family: Inter, sans-serif;
  font-size: 24px;
  font-weight: 400;
  margin-left: 1vh;

  &:focus {
    outline: none;
  }
`;

const ContentFactoryName = styled.div`
  width: 60vh;
  font: 700 24px Inter, sans-serif;
  align-content: start;
  font-size: 24px;
  /* border: 1px solid red; */
  margin-left: 15vh;
  margin-bottom: 2vh;
`;

const Maximum20character = styled.div`
  display: flex;

  flex-basis: 0%;
  flex-direction: column;
  font-size: 16px;
  font-weight: 400;
  font-family: Inter, sans-serif;
  margin: 15px 0 0 20vh;
`;

const Submit = styled.div`
  border-radius: 10px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: var(--Important-Button, #0a89ff);
  margin-top: 25px;
  color: #fff;
  white-space: nowrap;
  padding: 21px 25px;
  font: 700 24px Inter, sans-serif;
  box-shadow: 0px 4px 4px 0px #525761;
  cursor: pointer;
`;

export const AddFactory = () => {
  const [provinceList, setProvinceList] = useState([]);
  const [amphureList, setAmphureList] = useState([]);
  const [tambonList, setTambonList] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedAmphure, setSelectedAmphure] = useState("");
  const [selectedTambon, setSelectedTambon] = useState("");
  const [filteredAmphures, setFilteredAmphures] = useState([]);
  const [filteredTambons, setFilteredTambons] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setProvinceList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });

    fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setAmphureList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });

    fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setTambonList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };
  const handleAmphureChange = (event) => {
    setSelectedAmphure(event.target.value);
  };
  const handleTambonChange = (event) => {
    setSelectedTambon(event.target.value);
  };
  useEffect(() => {
    if (selectedProvince) {
      console.log("selected province ", selectedProvince);

      const newFilteredAmphures = amphureList.filter(
        (amphure) => amphure.province_id === parseInt(selectedProvince)
      );
      setFilteredAmphures(newFilteredAmphures);
      setSelectedAmphure("");
      setSelectedTambon("");
      setFactoryLocation(null);
    }
  }, [selectedProvince]);
  useEffect(() => {
    console.log(filteredAmphures);
  }, [filteredAmphures]);
  useEffect(() => {
    console.log(filteredTambons);
  }, [filteredTambons]);
  useEffect(() => {
    if (selectedAmphure) {
      console.log("selected amphure ", selectedAmphure);

      const newFilteredTambon = tambonList.filter(
        (tambon) => tambon.amphure_id === parseInt(selectedAmphure)
      );

      setFilteredTambons(newFilteredTambon);
      setSelectedTambon("");
      setFactoryLocation(null);
    }
  }, [selectedAmphure]);

  const [factoryLocation, setFactoryLocation] = useState([]);
  useEffect(() => {
    if (selectedTambon) {
      console.log("selected tambon ", selectedTambon);

      const foundProvince = provinceList.find(
        (item) => item.id === parseInt(selectedProvince)
      ).name_en;

      const foundAmphure = amphureList.find(
        (item) => item.id === parseInt(selectedAmphure)
      ).name_en;

      const foundTambon = tambonList.find(
        (item) => item.id === parseInt(selectedTambon)
      ).name_en;

      const Location = foundProvince + "_" + foundAmphure + "_" + foundTambon;
      setFactoryLocation(Location);
    }
  }, [selectedTambon]);

  // ----------------------------------------------------------------
  const handleSubmit = async () => {
    if (factoryLocation !== null) {
      // console.log("You craet", newFactoryName, "at ", factoryLocation);
      try {
        const response = await axios.post(`${url}/post_factory`, {
          factory_name: newFactoryName,
          factory_details: factoryLocation,
        });
        console.log("post_factory successful:", response.data);
        setNewFactoryName("")
        setSelectedProvince("")
        setSelectedAmphure("")
        setSelectedTambon("")
      } catch (error) {
        console.error("Error post_factory:", error);
      }
    }
  };

  const [newFactoryName, setNewFactoryName] = useState("");

  const handleChange = (event) => {
    setNewFactoryName(event.target.value);
  };

  return (
    <>
      <NavbarTopAdmin pageTitle="Add Factory" />

      <ContainerAddFactory>
        <ContentFactoryName>
          Factory Name :
          <PasswordInput
            // maxLength={20}
            value={newFactoryName}
            onChange={(e) => setNewFactoryName(e.target.value)}
          />
          <Maximum20character>Maximum 20 character</Maximum20character>
        </ContentFactoryName>

        <SelectSection>
          Factory Province :
          {loading ? (
            <p>Loading...</p>
          ) : (
            <StyledSelect
              value={selectedProvince}
              onChange={handleProvinceChange}
              loading={loading} // Pass loading state as a prop
            >
              <option value="">Select the province</option>
              {provinceList.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name_th}
                </option>
              ))}
            </StyledSelect>
          )}
        </SelectSection>

        <SelectSection>
          Factory District :
          {loading ? (
            <p>Loading...</p>
          ) : (
            <StyledSelect
              value={selectedAmphure}
              onChange={handleAmphureChange}
            >
              <option value="">Select the district</option>
              {filteredAmphures.map((amphure) => (
                <option key={amphure.id} value={amphure.id}>
                  {amphure.name_th}
                </option>
              ))}
            </StyledSelect>
          )}
        </SelectSection>

        <SelectSection>
          Factory Sub-district :
          {loading ? (
            <p>Loading...</p>
          ) : (
            <StyledSelect value={selectedTambon} onChange={handleTambonChange}>
              <option value="">Select the sub-district</option>
              {filteredTambons.map((tambon) => (
                <option key={tambon.id} value={tambon.id}>
                  {tambon.name_th}
                </option>
              ))}
            </StyledSelect>
          )}
        </SelectSection>

        <Submit onClick={handleSubmit}>Submit</Submit>
      </ContainerAddFactory>
    </>
  );
};

export default AddFactory;
