import React, { useEffect, useRef, useState } from "react";

const ImageWithRectangles = () => {
  const canvasRef = useRef(null);
  const [rectangles, setRectangles] = useState([]);
  const [selectedRectangle, setSelectedRectangle] = useState(null);
  const [hoveredRectangle, setHoveredRectangle] = useState(null);
  const [image, setImage] = useState(new Image());
  const [LastSelectedRectangle, setLastSelectedRectangle] = useState(null);

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
      console.log(rectanglesData);
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
    let startX = null;
    let startY = null;
    let tempRectangle = null;

    const handleMouseDown = (event) => {
      const rect = canvasRef.current.getBoundingClientRect();
      startX = event.clientX - rect.left;
      startY = event.clientY - rect.top;
    };

    const handleMouseMove = (event) => {
      if (startX !== null && startY !== null) {
        const rect = canvasRef.current.getBoundingClientRect();
        const currentX = event.clientX - rect.left;
        const currentY = event.clientY - rect.top;

        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);

        const x = Math.min(startX, currentX);
        const y = Math.min(startY, currentY);

        tempRectangle = { x, y, width, height };

        drawRectangles([...rectangles, tempRectangle]);
      }
    };

    const handleMouseUp = (event) => {
      if (startX !== null && startY !== null) {
        const rect = canvasRef.current.getBoundingClientRect();
        const endX = event.clientX - rect.left;
        const endY = event.clientY - rect.top;

        const width = Math.abs(endX - startX);
        const height = Math.abs(endY - startY);

        const x = Math.min(startX, endX);
        const y = Math.min(startY, endY);

        const newRectangle = { x, y, width, height };

        setRectangles([...rectangles, newRectangle]);

        startX = null;
        startY = null;
        tempRectangle = null;
      }
    };

    canvasRef.current.addEventListener("mousedown", handleMouseDown);
    canvasRef.current.addEventListener("mousemove", handleMouseMove);
    canvasRef.current.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvasRef.current.removeEventListener("mousedown", handleMouseDown);
      canvasRef.current.removeEventListener("mousemove", handleMouseMove);
      canvasRef.current.removeEventListener("mouseup", handleMouseUp);
    };
  };

  const deleteRectangle = () => {
    if (LastSelectedRectangle !== null) {
      const newRectangles = rectangles.filter(
        (_, index) => index !== LastSelectedRectangle
      );

      setLastSelectedRectangle(null);
      setSelectedRectangle(null);
      console.log(newRectangles);

      setRectangles(newRectangles);
      setTimeout(() => {
        drawRectangles(newRectangles);
      }, 10);
    }
  };

  const saveRectanglesAsJSON = () => {
    const jsonData = rectangles.map(({ Class, x, y, width, height }) => ({
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

    rectanglesToDraw.forEach(({ defectClass, x, y, width, height }, index) => {
      // ctx.strokeStyle = selectedRectangle === index ? "blue" : "red";
      if (LastSelectedRectangle === index) {
        ctx.strokeStyle = "blue";
        console.log("index :", index);
      } else {
        ctx.strokeStyle = "red";
      }

      ctx.lineWidth = 2;
      ctx.strokeRect(x - width / 2, y - height / 2, width, height);

      if (LastSelectedRectangle === index) {
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

  const handleMouseDown = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    let isHovering = false;

    rectangles.forEach(({ x, y, width, height }, index) => {
      if (
        mouseX >= x - width / 2 &&
        mouseX <= x + width / 2 &&
        mouseY >= y - height / 2 &&
        mouseY <= y + height / 2
      ) {
        console.log(
          "Selected Rectangle:",
          selectedRectangle,
          "Current Index:",
          index,
          "Lastest Selected Rectangle:",
          LastSelectedRectangle
        );
        isHovering = true;
        setSelectedRectangle(index);
        setLastSelectedRectangle(index);
        drawRectangles(rectangles);
      }
    });
  };

  const handleMouseMove = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    let isHovering = false;

    // set cursor
    rectangles.forEach(({ x, y, width, height }, index) => {
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

    drawRectangles(rectangles);
    console.log("up ! :", LastSelectedRectangle);
    console.log("SelectedRectangle :", selectedRectangle);
    console.log("LastSelectedRectangle :", LastSelectedRectangle);
    console.log("hove :", hoveredRectangle);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <button onClick={insertRectangle}>Insert Rectangle</button>
      {LastSelectedRectangle !== null && (
        <button onClick={deleteRectangle}>Delete Rectangle</button>
      )}
      <button onClick={saveRectanglesAsJSON}>Save Rectangles as JSON</button>
    </div>
  );
};

export default ImageWithRectangles;
