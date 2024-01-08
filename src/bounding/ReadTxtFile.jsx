import React, { useEffect } from "react";
//image.src = require("./Assets/004980.jpg");
//.txt = "./Assets/004980.txt";

const ReadTxtFile = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "/yolo/004980.txt"
        );

        // Check if the response status is OK (200)
        if (response.ok) {
          const text = await response.text();
          console.log(text);
        } else {
          console.error("Failed to fetch. Status:", response.status);
        }
      } catch (error) {
        console.error("Error reading the file:", error);
      }
    };

    fetchData();
  }, []);

  return <div>Check the console for file content</div>;
};

export default ReadTxtFile;
