import React, { useEffect, useRef, useState } from "react";

const ImageWithRectangles = () => {
  const canvasRef = useRef(null);
  const [rectangles, setRectangles] = useState([]);
  const [selectedRectangle, setSelectedRectangle] = useState(null);
  const [hoveredRectangle, setHoveredRectangle] = useState(null);
  const [image, setImage] = useState(new Image());
  const [lastClickTime, setLastClickTime] = useState(0);


  const classNames = {
    0: "birddrop",
    1: "glue",
    2: "mud",
    3: "other",
    4: "rock",
    5: "rust",
    6: "stain",
    7: "stick",
    8: "tape",
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function loadRectanglesFromJSON(jsonData) {
      const rectanglesData = jsonData.map(({ Class, X, Y, W, H }) => ({
        defectClass: classNames[Class],
        x: X * canvas.width,
        y: Y * canvas.height,
        width: W * canvas.width,
        height: H * canvas.height,
      }));
      

      setRectangles(rectanglesData);
      drawRectangles(rectanglesData);
      console.log(rectanglesData)
    }

    async function loadImageAndRectangles() {
      image.src = require("./Assets/006783.jpg");

      await new Promise((resolve) => {
        image.onload = resolve;
      });

      var x = 1.5;
      var newWidth = 738 * x;
      var newHeight = 485 * x;

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(image, 0, 0, newWidth, newHeight);

      fetch("../yolo/006783.json")
        .then((response) => response.json())
        .then((jsonData) => loadRectanglesFromJSON(jsonData))
        .catch((error) => console.error("Error fetching file:", error));
    }

    loadImageAndRectangles();
  }, []);

  const insertRectangle = () => {
    const newRectangles = [
      ...rectangles,
      { x: 100, y: 100, width: 50, height: 50 },
    ];
    setRectangles(newRectangles);
    drawRectangles(newRectangles);
  };

  // still bug
  const deleteRectangle = () => {
    if (selectedRectangle !== null) {
      const newRectangles = rectangles.filter(
        (_, index) => index !== selectedRectangle
      );
      setRectangles(newRectangles);
      setSelectedRectangle(null);
      drawRectangles(newRectangles);
    }
  };

  const saveRectanglesAsJSON = () => {
    const jsonData = rectangles.map(({ Class,x, y, width, height }) => ({
      Class: 8, // test
      X: x / canvasRef.current.width,
      Y: y / canvasRef.current.height,
      W: width / canvasRef.current.width,
      H: height / canvasRef.current.height,
    }));

    const jsonString = JSON.stringify(jsonData, null, 2);

    const filePath = "/yolo/rectangles.json";

    const jsonBlob = new Blob([jsonString], { type: "application/json" });

    const file = new File([jsonBlob], "rectangles.json", {
      type: "application/json",
    });

    // Save the file
    saveAs(file, filePath);
  };

  // save the file
  const saveAs = (file, filePath) => {
    const reader = new FileReader();
    reader.onload = function () {
      const link = document.createElement("a");
      link.download = filePath;
      link.href = reader.result;
      link.click();
    };
    reader.readAsDataURL(file);
  };


  const handleMouseDown = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    let isHovering = false;

    rectangles.forEach(({ Class,x, y, width, height }, index) => {
      if (
        mouseX >= x - width / 2 &&
        mouseX <= x + width / 2 &&
        mouseY >= y - height / 2 &&
        mouseY <= y + height / 2
      ) {
        isHovering = true;
        setSelectedRectangle(index);

        const currentTime = new Date().getTime();
        const timeDiff = currentTime - lastClickTime;
        if (timeDiff < 300) {
          handleDoubleClick();
        } else {
          setLastClickTime(currentTime);
        }
      }
    });
  };

  const handleDoubleClick = () => {
    if (selectedRectangle !== null) {
      const newRectangles = rectangles.filter(
        (_, index) => index !== selectedRectangle
      );
      setRectangles(newRectangles);
      setSelectedRectangle(null);
      drawRectangles(newRectangles);
    }
  };

  const drawRectangles = (rectanglesToDraw) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    ctx.drawImage(
      image,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    rectanglesToDraw.forEach(({ defectClass,x, y, width, height }, index) => {
      ctx.strokeStyle = selectedRectangle === index ? "blue" : "red";

      ctx.lineWidth = 2;
      ctx.strokeRect(x - width / 2, y - height / 2, width, height);

      if (hoveredRectangle === index) {
        ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
        ctx.fillRect(x - width / 2, y - height / 2, width, height);
        canvasRef.current.style.cursor = "pointer";
      }

      // Display class 
      ctx.fillStyle = "black";
      ctx.fillText(`${defectClass}`, x - width / 2, y - height / 2 - 5);
      // console.log(`Class: ${defectClass}`);
    });
  };

  const handleMouseMove = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    let isHovering = false;

    // set cursor
    rectangles.forEach(({ defectClass, x, y, width, height }, index) => {
      if (
        mouseX >= x - width / 2 &&
        mouseX <= x + width / 2 &&
        mouseY >= y - height / 2 &&
        mouseY <= y + height / 2
      ) {
        isHovering = true;
        setHoveredRectangle(index);
      }
    });

    canvasRef.current.style.cursor = isHovering ? "pointer" : "auto";

    if (selectedRectangle !== null) {
      const newRectangles = [...rectangles];
      const selectedRect = newRectangles[selectedRectangle];

      selectedRect.x = mouseX;
      selectedRect.y = mouseY;

      setRectangles(newRectangles);
      drawRectangles(newRectangles);
    }
  };

  const handleMouseUp = () => {
    setSelectedRectangle(null);
  };

  const fs = require("fs");
  const jsonObjects = Object.entries(classNames).map(
    ([class_id, class_name]) => ({
      _id: parseInt(class_id) + 1, // Increment _id by 1 to start from 1
      class_id: parseInt(class_id),
      class_name: class_name,
    })
  );

  console.log(jsonObjects);

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <button onClick={insertRectangle}>Insert Rectangle</button>
      <button onClick={deleteRectangle} disabled={selectedRectangle === null}>
        Delete Rectangle
      </button>

      

      <button onClick={saveRectanglesAsJSON}>Save Rectangles as JSON</button>
    </div>
  );
};


export default ImageWithRectangles;
