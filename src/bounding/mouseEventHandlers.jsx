export const handleMouseDown = (
  event,
  canvasRef,
  rectangles,
  setSelectedRectangle,
  setLastSelectedRectangle,
  selectedRectangle,
  LastselectedRectangle,
  drawRectangles
) => {
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
      isHovering = true;
      setSelectedRectangle(index);
      setLastSelectedRectangle(index);
      console.log(
        "Selected Rectangle:",
        selectedRectangle,
        "Current Index:",
        index,
        "Lastest Selected Rectangle:",
        LastselectedRectangle
      );
    }
  });

  // Redraw the canvas immediately after a click event
  drawRectangles(rectangles);
};

export const handleMouseMove = (
  event,
  canvasRef,
  rectangles,
  setSelectedRectangle,
  selectedRectangle,
  drawRectangles
) => {
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
      isHovering = true;
      setSelectedRectangle(index);
    }
  });

  canvasRef.current.style.cursor = isHovering ? "pointer" : "auto";

  if (selectedRectangle !== null) {
    const newRectangles = [...rectangles];
    const selectedRect = newRectangles[selectedRectangle];

    selectedRect.x = mouseX;
    selectedRect.y = mouseY;

    drawRectangles(newRectangles);
  }
};


export const handleMouseUp = (setSelectedRectangle) => {
  setSelectedRectangle(null);
};
