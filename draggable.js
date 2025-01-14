const draggableCircle = document.getElementById("draggableCircle");
const tooltip = document.getElementById("tooltip");

let isDragging = false;
let isHolding = false;
let holdTimeout;
let offsetX, offsetY;

// Update tooltip position dynamically
const updateTooltipPosition = () => {
    const rect = draggableCircle.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    tooltip.classList.remove("top-left", "top-right", "bottom-left", "bottom-right");

    if (rect.top < screenHeight / 2) {
        if (rect.left < screenWidth / 2) {
            tooltip.classList.add("bottom-right"); // Tooltip bottom-right
        } else {
            tooltip.classList.add("bottom-left"); // Tooltip bottom-left
        }
    } else {
        if (rect.left < screenWidth / 2) {
            tooltip.classList.add("top-right"); // Tooltip top-right
        } else {
            tooltip.classList.add("top-left"); // Tooltip top-left
        }
    }
};

// Handle double-click for redirect
draggableCircle.addEventListener("dblclick", () => {
    window.location.href = "pre-order.html"; // Redirect to pre-order page
});

// Handle mouse down (start holding)
draggableCircle.addEventListener("mousedown", (e) => {
    holdTimeout = setTimeout(() => {
        isDragging = true;
        isHolding = true;
        const rect = draggableCircle.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        draggableCircle.style.cursor = "grabbing";
    }, 200); // 200ms delay to differentiate between click and drag
});

// Handle mouse move (dragging)
document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        const maxX = window.innerWidth - draggableCircle.offsetWidth;
        const maxY = window.innerHeight - draggableCircle.offsetHeight;

        draggableCircle.style.left = Math.min(maxX, Math.max(0, x)) + "px";
        draggableCircle.style.top = Math.min(maxY, Math.max(0, y)) + "px";

        updateTooltipPosition(); // Update tooltip dynamically
    }
});

// Handle mouse up (end holding or dragging)
document.addEventListener("mouseup", () => {
    clearTimeout(holdTimeout);
    if (isDragging) {
        isDragging = false;
        draggableCircle.style.cursor = "grab";
    }
    isHolding = false;
});

// Initial tooltip position
updateTooltipPosition();
