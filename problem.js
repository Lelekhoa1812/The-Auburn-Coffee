// Modal handling for "Report a Problem?"
const problemIcon = document.getElementById("problemIcon");
const problemLink = document.getElementById("problemLink");
const problemModal = document.getElementById("problemModal");
const closeModal = document.getElementById("closeModal");

// Show modal
function showModal() {
    problemModal.style.display = "flex";
    problemModal.setAttribute("aria-hidden", "false");
}

// Hide modal
function hideModal() {
    problemModal.style.display = "none";
    problemModal.setAttribute("aria-hidden", "true");
}

// Add event listeners
problemIcon.addEventListener("click", showModal);
problemLink.addEventListener("click", (e) => {
    e.preventDefault();
    showModal();
});
closeModal.addEventListener("click", hideModal);
window.addEventListener("click", (e) => {
    if (e.target === problemModal) hideModal();
});
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideModal();
});
