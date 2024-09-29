document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
  
    // Get the tool elements
    const toolButtons = document.querySelectorAll(".tool");
    const fillColorCheckbox = document.getElementById("fill-color");
    const sizeSlider = document.getElementById("size-slider");
    const colorPicker = document.getElementById("color-picker");
    const clearButton = document.querySelector(".clear-canvas");
    const saveButton = document.querySelector(".save-img");
  
    // Set initial tool settings
    let isDrawing = false;
    let brushSize = 5;
    let selectedTool = "brush";
    let fillColor = false;
    let selectedColor = "#4a98f7";
    let startX, startY;
    let snapshot;
  
    // Setup canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  
    // Save the current state of the canvas
    const saveCanvasState = () => {
      snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };
  
    // Restore the saved canvas state
    const restoreCanvasState = () => {
      ctx.putImageData(snapshot, 0, 0);
    };
  
    // Start drawing or begin shape drawing
    const startDrawing = (e) => {
      isDrawing = true;
      startX = e.offsetX;
      startY = e.offsetY;
      ctx.lineWidth = brushSize;
      ctx.strokeStyle = selectedColor;
      ctx.fillStyle = selectedColor;
      saveCanvasState();
    };
  
    // Draw based on selected tool
    const drawing = (e) => {
      if (!isDrawing) return;
      const endX = e.offsetX;
      const endY = e.offsetY;
  
      restoreCanvasState();
  
      if (selectedTool === "brush") {
        ctx.lineTo(endX, endY);
        ctx.stroke();
      } else if (selectedTool === "eraser") {
        // Use clearRect to erase based on the brush size, centered around the cursor
        ctx.clearRect(endX - brushSize / 2, endY - brushSize / 2, brushSize, brushSize);
      } else {
        drawShape(endX, endY);
      }
    };
  
    // Stop drawing and finalize the shape
    const stopDrawing = () => {
      isDrawing = false;
      ctx.beginPath(); // Reset the path to avoid connecting the next stroke with the current one
    };
  
    // Draw shapes based on selected tool
    const drawShape = (endX, endY) => {
      const width = endX - startX;
      const height = endY - startY;
  
      if (selectedTool === "rectangle") {
        if (fillColor) {
          ctx.fillRect(startX, startY, width, height);
        } else {
          ctx.strokeRect(startX, startY, width, height);
        }
      } else if (selectedTool === "circle") {
        const radius = Math.sqrt(width * width + height * height);
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        fillColor ? ctx.fill() : ctx.stroke();
      } else if (selectedTool === "triangle") {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + width, startY + height);
        ctx.lineTo(startX - width, startY + height);
        ctx.closePath();
        fillColor ? ctx.fill() : ctx.stroke();
      }
    };
  
    // Handle tool selection
    toolButtons.forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelector(".option.active").classList.remove("active");
        button.classList.add("active");
        selectedTool = button.id;
      });
    });
  
    // Handle brush size change
    sizeSlider.addEventListener("input", (e) => {
      brushSize = e.target.value;
    });
  
    // Handle fill color checkbox
    fillColorCheckbox.addEventListener("change", () => {
      fillColor = fillColorCheckbox.checked;
    });
  
    // Handle color picker change
    colorPicker.addEventListener("input", (e) => {
      selectedColor = e.target.value;
    });
  
    // Clear the canvas
    clearButton.addEventListener("click", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  
    // Save the canvas as an image
    saveButton.addEventListener("click", () => {
      const link = document.createElement("a");
      link.download = "drawing.jpg";
      link.href = canvas.toDataURL();
      link.click();
    });
  
    // Mouse events for drawing
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", drawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing); // In case the user moves out of the canvas
  });
  