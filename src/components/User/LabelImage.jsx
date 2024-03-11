import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import NavbarTop from "./NavbarTop/NavbarTop";
import TogglePopup from "../Admin/TogglePopup";
import { UserContext, url } from "../../bounding/UserContext";
import axios from "axios";
import AlertPopup from "../Admin/AlertPopup";
import Spinner from "../../bounding/Spinner";

const ContainerLabelImage = styled.div`
  display: flex;
  width: 132vh;
  height: 76vh;

  flex-wrap: wrap;
  justify-content: start;
  align-content: center;
  align-items: center;
  font: 700 32px Inter, sans-serif;
`;
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
const InsertDeleteDis = styled.button`
  font-family: Inter, sans-serif;
  border-radius: 10px;
  border: 2px solid var(--Important-Button, #9f9f9f);
  background-color: var(--frame-color, #f6f6f6);
  justify-content: center;
  color: var(--Important-Button, #9f9f9f);
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
  cursor: pointer;
`;

const StyledSelect = styled.select`
  font-family: Inter, sans-serif;
  font-size: 16px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-top: auto;
  width: 100%;
`;

export const LabelImage = ({ imgData, onBackClick, handlepageChange }) => {
  const handlepage = (data) => {
    handlepageChange(data);
  };

  const canvasRef = useRef(null);
  const [rectangles, setRectangles] = useState([]);
  const [selectedRectangle, setSelectedRectangle] = useState(null);
  const [hoveredRectangle, setHoveredRectangle] = useState(null);
  const [image, setImage] = useState(new Image());
  const [LastSelectedRectangle, setLastSelectedRectangle] = useState(null);
  const [defectData, setDefectData] = useState(null);
  const { user } = useContext(UserContext);
  const [canvasWidth, setCanvasWidth] = useState(null);
  const [canvasHeight, setCanvasHeight] = useState(null);
  const [defectClasses, setDefectClasses] = useState(null);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Add null check
    const ctx = canvas.getContext("2d");

    function loadRectanglesFromJSON(jsonData) {
      setCanvasWidth(canvas.width);
      setCanvasHeight(canvas.height);

      const rectanglesData = jsonData.map(
        ({ class_name, class_type, x, y, w, h, image_id }) => ({
          defectClass: class_name,
          class_type: class_type,
          x: x * canvas.width,
          y: y * canvas.height,
          width: w * canvas.width,
          height: h * canvas.height,
          image_id: image_id,
        })
      );

      setRectangles(rectanglesData);
      drawRectangles(rectanglesData);
      console.log(rectanglesData);
    }

    async function loadImageAndRectangles() {
      image.src = imgData.image_path;

      await new Promise((resolve) => {
        image.onload = resolve;
      });

      var x = 1.35;
      var newWidth = 738 * x;
      var newHeight = 485 * x;

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(image, 0, 0, newWidth, newHeight);
    }

    async function fetchData() {
      try {
        const response = await axios.get(
          `${url}/get_defectLocation?image_id=${imgData.image_id}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log("successful:", response.data);
        setDefectData(response.data);

        loadRectanglesFromJSON(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
      try {
        const response = await axios.get(`${url}/get_defect`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        console.log("successful defect class:", response.data);
        setDefectClasses(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
    loadImageAndRectangles();
  }, []);

  const handleInsertClick = () => {
    if (selectedDefectClass === null) {
      setShowPopupAlert(true);
      setPopupContentAlert("Please select defect class");
    } else {
      setDrawingAllowed(true);
    }
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
    });

    if (
      drawing &&
      startX !== null &&
      startY !== null &&
      endX !== null &&
      endY !== null
    ) {
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        Math.min(startX, endX),
        Math.min(startY, endY),
        Math.abs(endX - startX),
        Math.abs(endY - startY)
      );
    }
  };
  const [drawingAllowed, setDrawingAllowed] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [startX, setStartX] = useState(null);
  const [endX, setEndX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [endY, setEndY] = useState(null);

  const handleMouseDown = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    if (drawingAllowed === true && selectedDefectClass !== null) {
      setDrawing(true);
      setStartX(event.clientX - rect.left);
      setStartY(event.clientY - rect.top);
    }

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

    if (drawing && selectedDefectClass !== null) {
      const rect = canvasRef.current.getBoundingClientRect();
      setEndX(event.clientX - rect.left);
      setEndY(event.clientY - rect.top);
    }
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
    if (drawing && selectedDefectClass !== null) {
      setDrawing(false);
      setDrawingAllowed(false);
      setDrawingEnded(true);
      const selectedDefect = defectClasses.find(
        (defectClass) => defectClass.defect_class_name === selectedDefectClass
      );
      if (selectedDefect) {
        console.log("ypyp", selectedDefect.defect_class);
      }

      const rectWidth = Math.abs(endX - startX);
      const rectHeight = Math.abs(endY - startY);
      const newRectangle = {
        x: Math.min(startX, endX) + rectWidth / 2,
        y: Math.min(startY, endY) + rectHeight / 2,
        width: rectWidth,
        height: rectHeight,
        defectClass: selectedDefectClass,
        class_type: selectedDefect.defect_class,
      };
      setRectangles([...rectangles, newRectangle]);
      setStartX(null);
      setStartY(null);
      setEndX(null);
      setEndY(null);
      drawRectangles(rectangles);
      console.log(rectangles);
      console.log("sel", selectedDefectClass);
    } else {
      setSelectedRectangle(null);
      drawRectangles(rectangles);
    }
  };

  const [selectedDefectClass, setSelectedDefectClass] = useState(null);
  const [drawingEnded, setDrawingEnded] = useState(false);

  const renderClassSelector = () => {
    if (defectClasses !== null) {
      return (
        <StyledSelect
          value={selectedDefectClass}
          onChange={(event) => setSelectedDefectClass(event.target.value)}
        >
          <option value="" disabled hidden>
            Select a defect class
          </option>
          {defectClasses.map((defectClass) => (
            <option key={defectClass._id} value={defectClass.defect_class_name}>
              {defectClass.defect_class_name}
            </option>
          ))}
        </StyledSelect>
      );
    }
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

  const [showPopupAlert, setShowPopupAlert] = useState(false);
  const [popupContentAlert, setPopupContentAlert] = useState("");

  const handleClickSubmit = () => {
    setShowPopup(true);
    setPopupContent("Do you want to confirm this picture?");
  };

  const handleClickYes = async () => {
    const convertedData = convertToJSON(rectangles);
    console.log("converted : ", convertedData);

    try {
      const response = await axios.delete(`${url}/delete_for_renew`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          image_id: imgData.image_id,
        },
      });
      console.log("successful:", response.data);

      try {
        const response = await axios.post(
          `${url}/post_defectLocation_for_redefine`,
          convertedData,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log("successful:", response.data);
        onBackClick();
      } catch (error) {
        console.error("Error:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setShowPopup(false);
  };

  let totalDefected;
  let defectCounts;
  if (defectData !== null) {
    totalDefected = defectData.length;
    defectCounts = defectData.reduce((counts, { class_name }) => {
      counts[class_name] = (counts[class_name] || 0) + 1;
      return counts;
    }, {});
  }

  function convertToJSON(jsonData) {
    const defectlos = jsonData.map(
      ({ class_name, x, y, width, height, class_type }) => ({
        class_type: class_type,
        x: x / canvasWidth,
        y: y / canvasHeight,
        w: width / canvasWidth,
        h: height / canvasHeight,
        is_user_verified: false,
      })
    );

    return { defectlos, Image_post_id: imgData.image_id };
  }

  return (
    <>
      <NavbarTop changeStatePage={handlepage} onBackClick={onBackClick} />

      {loading ? (
        <Spinner />
      ) : (
        <ContainerLabelImage>
          <>
            {showPopupAlert && (
              <AlertPopup
                content={popupContentAlert}
                onClose={() => setShowPopupAlert(false)}
              />
            )}

            {showPopup && (
              <TogglePopup
                content={popupContent}
                onClose={() => setShowPopup(false)}
                onYes={handleClickYes}
              />
            )}

            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            />

            <ContainerTools>
              {defectData !== null && (
                <ShowDefectedCount>
                  <LabelDefectedCount>
                    Defected : {totalDefected} Location
                  </LabelDefectedCount>

                  {Object.entries(defectCounts).map(([defectType, count]) => (
                    <DefectedCount key={defectType}>
                      {defectType.charAt(0).toUpperCase() + defectType.slice(1)}
                      : {count}
                    </DefectedCount>
                  ))}
                </ShowDefectedCount>
              )}
              {renderClassSelector()}
              <ContainerButton>
                <InsertDelete onClick={handleInsertClick}>Insert</InsertDelete>
                {LastSelectedRectangle !== null ? (
                  <InsertDelete onClick={deleteRectangle}>Delete</InsertDelete>
                ) : (
                  <InsertDeleteDis>Delete</InsertDeleteDis>
                )}
              </ContainerButton>
              <Confirm onClick={handleClickSubmit}>Confirm</Confirm>
            </ContainerTools>
          </>
        </ContainerLabelImage>
      )}
    </>
  );
};

export default LabelImage;
