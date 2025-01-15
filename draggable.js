const draggableCircle = document.getElementById("draggableCircle");
const tooltip = document.getElementById("tooltip");
const preOrderButton = document.getElementById("preOrderButton");
const browsingButton = document.getElementById("browsingButton");

let isExpanded = true; // Initially expanded
let isInitial = true   // Initial state flag
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
    if (isInitial)
    {
        draggableCircle.classList.add("expanded");
        tooltip.style.visibility = "hidden"; // Hide tooltip initially
        isInitial = false
    }
};

// Toggle expanded state (Handling expand and collapse, with tooltip visibility)
const toggleExpand = () => {
    console.log("isExpanded State", isExpanded)
    if (!isExpanded) {
        draggableCircle.classList.add("expanded");
        tooltip.style.visibility = "hidden"; // Hide tooltip
        isExpanded = true; // Toggle state
    } else {
        draggableCircle.classList.remove("expanded");
        tooltip.style.visibility = "visible"; // Show tooltip
        isExpanded = false; // Toggle state
    }
};

// Handle double-click for redirect
draggableCircle.addEventListener("dblclick", () => {
    if (!isExpanded)
    {
        indow.location.href = "pre-order.html"; // Redirect to pre-order page
    }
});

// Handle mouse down (start holding to drag)
draggableCircle.addEventListener("mousedown", (e) => {
    if (isExpanded) return; // Disable dragging when expanded
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
    if (isDragging && !isExpanded) {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        const maxX = window.innerWidth - draggableCircle.offsetWidth;
        const maxY = window.innerHeight - draggableCircle.offsetHeight;
        // Compute position upon dragging
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

// Handle pre-order button click
preOrderButton.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent event from propagating to draggableCircle (i.e. handling function twice simultaneously)
    window.location.href = "pre-order.html";
});

// Handle browsing button click
browsingButton.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent event from propagating to draggableCircle (i.e. handling function twice simultaneously)
    toggleExpand(); // Collapse back to draggable state
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
