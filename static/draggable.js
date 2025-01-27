const draggableCircle = document.getElementById("draggableCircle");
const tooltip = document.getElementById("tooltip");
const preOrderButton = document.getElementById("preOrderButton");
const browsingButton = document.getElementById("browsingButton");

let isExpanded = true; // Initially expanded
let isInitial = true; // Initial state flag
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

// Set initial expanded state
const setInitialExpandedState = () => {
    if (isInitial) {
        draggableCircle.classList.add("expanded");
        tooltip.style.visibility = "hidden"; // Hide tooltip initially
        isInitial = false;
    }
};

// Toggle expanded state
const toggleExpand = () => {
    if (!isExpanded) {
        draggableCircle.classList.add("expanded");
        tooltip.style.visibility = "hidden"; // Hide tooltip
        isExpanded = true;
    } else {
        draggableCircle.classList.remove("expanded");
        tooltip.style.visibility = "visible"; // Show tooltip
        isExpanded = false;
    }
};

// Common logic for start of drag
const startDrag = (x, y) => {
    if (isExpanded) return; // Disable dragging when expanded
    holdTimeout = setTimeout(() => {
        isDragging = true;
        isHolding = true;
        const rect = draggableCircle.getBoundingClientRect();
        offsetX = x - rect.left;
        offsetY = y - rect.top;
        draggableCircle.style.cursor = "grabbing";
    }, 200); // 200ms delay
};

// Common logic for dragging
const drag = (x, y) => {
    if (isDragging) {
        const maxX = window.innerWidth - draggableCircle.offsetWidth;
        const maxY = window.innerHeight - draggableCircle.offsetHeight;
        draggableCircle.style.left = Math.min(maxX, Math.max(0, x - offsetX)) + "px";
        draggableCircle.style.top = Math.min(maxY, Math.max(0, y - offsetY)) + "px";
        updateTooltipPosition();
    }
};

// Common logic for end of drag
const endDrag = () => {
    clearTimeout(holdTimeout);
    if (isDragging) {
        isDragging = false;
        draggableCircle.style.cursor = "grab";
    }
    isHolding = false;
};

// Mouse events
draggableCircle.addEventListener("mousedown", (e) => startDrag(e.clientX, e.clientY));
document.addEventListener("mousemove", (e) => drag(e.clientX, e.clientY));
document.addEventListener("mouseup", endDrag);

// Touch events
draggableCircle.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
});
document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    drag(touch.clientX, touch.clientY);
});
document.addEventListener("touchend", endDrag);

// Handle pre-order button click
preOrderButton.addEventListener("click", (e) => {
    e.stopPropagation();
    window.location.href = "pre-order.html";
});

// Handle browsing button click
browsingButton.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleExpand();
});

// Handle circle click to expand
draggableCircle.addEventListener("click", () => {
    if (!isDragging && !isExpanded) {
        toggleExpand();
    }
});

// Set initial expanded state on page load
setInitialExpandedState();

// Initial tooltip position
updateTooltipPosition();
