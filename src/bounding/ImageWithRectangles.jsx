//image.src = require("./Assets/004980.jpg");
//.txt = "./Assets/004980.txt";
import React, { useEffect, useRef } from "react";

const ImageWithRectangles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const image = new Image();

    
    image.src = require("./Assets/004980.jpg");

    function loadRectanglesFromFile(fileContent) {
      console.log(fileContent);
      const lines = fileContent.split("\n");
      console.log(lines);

      const rectanglesData = lines.map((line) => {
        const [label, x, y, width, height] = line.split(" ").map(parseFloat);
        return `${x} ${y} ${width} ${height}`;
      });

      // image.width; image.height;
      var newWidth = 738; // Adjust value 
      var newHeight = 485; 

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(image, 0, 0, newWidth, newHeight);
      // ctx.drawImage(image, 0, 0, newWidth, newHeight);

      rectanglesData.forEach((rectangleData) => {
        const [x, y, width, height] = rectangleData.split(" ").map(parseFloat);

        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(
          x * canvas.width - (width * canvas.width) / 2,
          y * canvas.height - (height * canvas.height) / 2,
          width * canvas.width,
          height * canvas.height
        );
      });
    }
    fetch("./yolo/004980.txt")
      .then((response) => response.text())
      //.then((text) => console.log(text))
      .then((text) => loadRectanglesFromFile(text))
      .catch((error) => console.error("Error fetching file:", error));
  }, []);

  return <canvas ref={canvasRef} />;
};

export default ImageWithRectangles;
