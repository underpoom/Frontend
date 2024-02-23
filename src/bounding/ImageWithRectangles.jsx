import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import TogglePopup from "../components/Admin/TogglePopup";
const ContainerTools = styled.div`
  height: 650px;
  width: 220px;
  margin-left: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
 
`;

const ShowDefectedCount = styled.div`
  justify-content: center;
  align-items: start;
  border-radius: 8px;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  color: #000;
  font-weight: 400;
  padding: 24px 12px;
  width: 240px;
  margin-bottom: auto;
 
`;

const LabelDefectedCount = styled.div`
  color: #3b8135;
  font-family: Inter, sans-serif;
  font-weight: 700;
`;

const ContainerButton = styled.div`
  display: flex;
  font-family: Inter, sans-serif;
  justify-content: space-between;
  /* border: 1px solid red; */
  width: 240px;
  height: 100px;
  margin-top: 300px;
`;

const DefectedCount = styled.div`
  font-family: Inter, sans-serif;
  margin-top: 11px;
  white-space: nowrap;
`;

const InsertDelete = styled.button`
  font-family: Inter, sans-serif;
  border-radius: 10px;
  border: 2px solid var(--Important-Button, #0a89ff);
  background-color: var(--frame-color, #f6f6f6);
  justify-content: center;
  color: var(--Important-Button, #0a89ff);
  width: fit-content;
  height: fit-content;
  padding: 8px 16px;
  font-size: 24px;
`;

const Confirm = styled.div`
  font-family: Inter, sans-serif;
  border-radius: 10px;
  border: 1px solid var(--stork, #9f9f9f);
  background-color: var(--Important-Button, #0a89ff);
  justify-content: center;
  color: var(--light, #fafafa);
  padding: 8px 16px;
  width: fit-content;
  font-size: 24px;
  height: fit-content;
  margin-left: auto;
`;

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

      var x = 1.35;
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
    const canvas = canvasRef.current;
    if (!canvas) return; // Add null check

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // Add null check
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
      }

      // Display class
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
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

  const deleteRectangle = () => {
    if (LastSelectedRectangle !== null) {
      const newRectangles = rectangles.filter(
        (_, index) => index !== LastSelectedRectangle
      );

      setLastSelectedRectangle(null);
      setSelectedRectangle(null);
      setRectangles(newRectangles);
    }
  };

  drawRectangles(rectangles);

  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const handleClickSubmit = () => {
    setShowPopup(true);
    setPopupContent("Do you want to confirm this picture?");
  };

  const handleRemoveClickYes = () => {
    console.log(rectangles);
  };

  return (
    <>
      {showPopup && (
        <TogglePopup
          content={popupContent}
          onClose={() => setShowPopup(false)}
          onYes={handleRemoveClickYes}
        />
      )}

      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      {/* <button onClick={insertRectangle}>Insert Rectangle</button> */}

      {/* <button onClick={saveRectanglesAsJSON}>Save Rectangles as JSON</button> */}
      <ContainerTools>
        <ShowDefectedCount>
          <LabelDefectedCount>Defected : 12 Location</LabelDefectedCount>

          <DefectedCount>Rock : 1</DefectedCount>
          <DefectedCount>Birddrop : 1</DefectedCount>
          <DefectedCount>Glue : 8</DefectedCount>
          <DefectedCount>Mud : 1</DefectedCount>
          <DefectedCount>Other : 1</DefectedCount>
        </ShowDefectedCount>

        <ContainerButton>
          <InsertDelete>Insert</InsertDelete>
          {LastSelectedRectangle !== null && (
            <InsertDelete onClick={deleteRectangle}>Delete</InsertDelete>
          )}
        </ContainerButton>
        <Confirm onClick={handleClickSubmit}>Confirm</Confirm>
      </ContainerTools>
    </>
  );
};

export default ImageWithRectangles;
