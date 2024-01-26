// import React, { useEffect, useRef, useState } from "react";

// const ImageWithRectangles = () => {
//   const canvasRef = useRef(null);
//   const [rectangles, setRectangles] = useState([]);
//   const [selectedRectangle, setSelectedRectangle] = useState(null);

//   const insertRectangle = () => {
//     const newRectangles = [
//       ...rectangles,
//       { x: 50, y: 50, width: 50, height: 50 },
//     ];
//     setRectangles(newRectangles);
//     drawRectangles(newRectangles);
//   };

//   const deleteRectangle = () => {
//     if (selectedRectangle !== null) {
//       const newRectangles = rectangles.filter(
//         (_, index) => index !== selectedRectangle
//       );
//       setRectangles(newRectangles);
//       setSelectedRectangle(null);
//       drawRectangles(newRectangles);
//     }
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     function handleMouseDown(event) {
//       const rect = canvas.getBoundingClientRect();
//       const mouseX = event.clientX - rect.left;
//       const mouseY = event.clientY - rect.top;

//       rectangles.forEach(({ x, y, width, height }, index) => {
//         if (
//           mouseX >= x - width / 2 &&
//           mouseX <= x + width / 2 &&
//           mouseY >= y - height / 2 &&
//           mouseY <= y + height / 2
//         ) {
//           setSelectedRectangle(index);
//         }
//       });
//     }

//     function handleMouseMove(event) {
//       if (selectedRectangle !== null) {
//         const rect = canvas.getBoundingClientRect();
//         const mouseX = event.clientX - rect.left;
//         const mouseY = event.clientY - rect.top;

//         const newRectangles = [...rectangles];
//         const selectedRect = newRectangles[selectedRectangle];

//         selectedRect.x = mouseX;
//         selectedRect.y = mouseY;

//         setRectangles(newRectangles);
//         drawRectangles(newRectangles);
//       }
//     }

//     function handleMouseUp() {
//       setSelectedRectangle(null);
//     }

//     // ... (rest of the useEffect code)

//     canvas.addEventListener("mousedown", handleMouseDown);
//     canvas.addEventListener("mousemove", handleMouseMove);
//     canvas.addEventListener("mouseup", handleMouseUp);

//     return () => {
//       canvas.removeEventListener("mousedown", handleMouseDown);
//       canvas.removeEventListener("mousemove", handleMouseMove);
//       canvas.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [rectangles, selectedRectangle]);

//   const drawRectangles = (rectanglesToDraw) => {
//     const ctx = canvasRef.current.getContext("2d");
//     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

//     rectanglesToDraw.forEach(({ x, y, width, height }, index) => {
//       ctx.strokeStyle = selectedRectangle === index ? "blue" : "red";
//       ctx.lineWidth = 2;
//       ctx.strokeRect(x - width / 2, y - height / 2, width, height);
//     });
//   };

//   return (
//     <div>
//       <canvas ref={canvasRef} />
//       <button onClick={insertRectangle}>Insert Rectangle</button>
//       <button onClick={deleteRectangle} disabled={selectedRectangle === null}>
//         Delete Rectangle
//       </button>
//     </div>
//   );
// };

// export default ImageWithRectangles;

// import React, { useEffect, useRef, useState } from "react";

// const ImageWithRectangles = () => {
//   const canvasRef = useRef(null);
//   const [rectangles, setRectangles] = useState([]);
//   const [selectedRectangle, setSelectedRectangle] = useState(null);
//   const [hoveredRectangle, setHoveredRectangle] = useState(null);
//   const [image, setImage] = useState(new Image());

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     function loadRectanglesFromJSON(jsonData) {
//       const rectanglesData = jsonData.map(({ X, Y, W, H }) => ({
//         x: X * canvas.width,
//         y: Y * canvas.height,
//         width: W * canvas.width,
//         height: H * canvas.height,
//       }));

//       setRectangles(rectanglesData);
//       drawRectangles(rectanglesData);
//     }

//     async function loadImageAndRectangles() {
//       image.src = require("./Assets/006783.jpg");

//       await new Promise((resolve) => {
//         image.onload = resolve;
//       });

//       var x = 1.5;
//       var newWidth = 738 * x;
//       var newHeight = 485 * x;

//       canvas.width = newWidth;
//       canvas.height = newHeight;

//       ctx.drawImage(image, 0, 0, newWidth, newHeight);

//       fetch("./yolo/006783.json")
//         .then((response) => response.json())
//         .then((jsonData) => loadRectanglesFromJSON(jsonData))
//         .catch((error) => console.error("Error fetching file:", error));
//     }

//     loadImageAndRectangles();
//   }, []);

//   const handleClickOnRectangle = (index) => {
//     if (selectedRectangle === index) {
//       // If the clicked rectangle is already selected, delete it
//       const newRectangles = rectangles.filter((_, i) => i !== index);
//       setRectangles(newRectangles);
//       setSelectedRectangle(null);
//       drawRectangles(newRectangles);
//     } else {
//       // Otherwise, select the clicked rectangle
//       setSelectedRectangle(index);
//     }
//   };

//   const drawRectangles = (rectanglesToDraw) => {
//     const ctx = canvasRef.current.getContext("2d");
//     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

//     ctx.drawImage(
//       image,
//       0,
//       0,
//       canvasRef.current.width,
//       canvasRef.current.height
//     );

//     rectanglesToDraw.forEach(({ x, y, width, height }, index) => {
//       ctx.strokeStyle = selectedRectangle === index ? "blue" : "red";
//       ctx.lineWidth = 2;
//       ctx.strokeRect(x - width / 2, y - height / 2, width, height);

//       if (hoveredRectangle === index) {
//         ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
//         ctx.fillRect(x - width / 2, y - height / 2, width, height);
//       }

//       // Create a clickable UI on each rectangle
//       ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
//       ctx.fillRect(x - width / 2, y - height / 2, width, height);

//       // Add text inside the rectangle
//       ctx.fillStyle = "black";
//       ctx.font = "12px Arial";
//       ctx.fillText(
//         `Rectangle ${index + 1}`,
//         x - width / 2 + 5,
//         y - height / 2 + 15
//       );
//     });
//   };

//   const handleMouseMove = (event) => {
//     const rect = canvasRef.current.getBoundingClientRect();
//     const mouseX = event.clientX - rect.left;
//     const mouseY = event.clientY - rect.top;

//     let isHovering = false;

//     rectangles.forEach(({ x, y, width, height }, index) => {
//       if (
//         mouseX >= x - width / 2 &&
//         mouseX <= x + width / 2 &&
//         mouseY >= y - height / 2 &&
//         mouseY <= y + height / 2
//       ) {
//         isHovering = true;
//         setHoveredRectangle(index);
//       }
//     });

//     if (!isHovering) {
//       setHoveredRectangle(null);
//     }

//     if (selectedRectangle !== null) {
//       const newRectangles = [...rectangles];
//       const selectedRect = newRectangles[selectedRectangle];

//       selectedRect.x = mouseX;
//       selectedRect.y = mouseY;

//       setRectangles(newRectangles);
//       drawRectangles(newRectangles);
//     }
//   };

//   return (
//     <div>
//       <canvas
//         ref={canvasRef}
//         onMouseMove={handleMouseMove}
//         onClick={() => handleClickOnRectangle(hoveredRectangle)}
//       />
//     </div>
//   );
// };

// export default ImageWithRectangles;
