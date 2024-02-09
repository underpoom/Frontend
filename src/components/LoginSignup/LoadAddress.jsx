import React, { useState, useEffect } from "react";

export const LoadAddress = () => {
  const [provinceList, setProvinceList] = useState([]);
  const [amphureList, setAmphureList] = useState([]);
  const [tambonList, setTambonList] = useState([]);

  const [allList, setAllList] = useState([]);


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

      fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setAllList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });

  }, []);

  console.log(allList);

  

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
      console.log("selected province", selectedProvince);

      const newFilteredAmphures = amphureList.filter(
        (amphure) => amphure.province_id === parseInt(selectedProvince)
      );

      setFilteredAmphures(newFilteredAmphures);
      setSelectedAmphure(""); // Reset selected amphure when province changes
    } else {
      setAmphureList([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    console.log(filteredAmphures);
  }, [filteredAmphures]);

  useEffect(() => {
    if (selectedAmphure) {
      console.log("selected amphure", selectedAmphure);

      const newFilteredTambon = tambonList.filter(
        (tambon) => tambon.amphure_id === parseInt(selectedAmphure)
      );

      setFilteredTambons(newFilteredTambon);
      setSelectedTambon(""); // Reset selected tambon when amphure changes
    } else {
      setTambonList([]);
    }
  }, [selectedAmphure]);

  useEffect(() => {
    console.log(filteredTambons);
  }, [filteredTambons]);

  useEffect(() => {
    if (selectedAmphure) {
      console.log("selected amphure", selectedAmphure);
    } else {
      setTambonList([]);
    }
  }, [selectedTambon]);

  return (
    <div>
      <h1>Select a Province</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <select value={selectedProvince} onChange={handleProvinceChange}>
          <option value="">Select a province</option>
          {provinceList.map((province) => (
            <option key={province.id} value={province.id}>
              {province.name_th}
            </option>
          ))}
        </select>
      )}

      <h2>Select a Amphure</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <select value={selectedAmphure} onChange={handleAmphureChange}>
          <option value="">Select a amphure</option>
          {filteredAmphures.map((amphure) => (
            <option key={amphure.id} value={amphure.id}>
              {amphure.name_th}
            </option>
          ))}
        </select>
      )}

      <h2>Select a Tambon</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <select value={selectedTambon} onChange={handleTambonChange}>
          <option value="">Select a tambon</option>
          {filteredTambons.map((tambon) => (
            <option key={tambon.id} value={tambon.id}>
              {tambon.name_th}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default LoadAddress;
