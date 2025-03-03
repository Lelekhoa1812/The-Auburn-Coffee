// QR code scanner module
import QrScanner from 'https://unpkg.com/qr-scanner/qr-scanner.min.js';

const qrButton = document.getElementById('qrButton');
const scanQRCodeButton = document.getElementById('scanQRCode');
const qrModal = document.getElementById('qrModal');
const userCodeInput = document.getElementById('userCodeInput');
const userInfoContainer = document.createElement("div"); // Container for user info
userInfoContainer.id = "userInfoContainer";

qrModal.style.display = 'none' // Hide modal window at default

// Append user info container 
document.addEventListener("DOMContentLoaded", () => {
    const modalContent = document.querySelector(".modal2-content");
    if (modalContent) {
        modalContent.appendChild(userInfoContainer);
    }
});

// Open/Close Modal
const openQRModal = () => (qrModal.style.display = 'block');
const closeQRModal = () => {
    qrModal.style.display = 'none';
    userCodeInput.value = "";         // Clear user_code input after close
    userInfoContainer.innerHTML = ""; // Clear user info on close
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    qrButton.addEventListener('click', openQRModal);
    scanQRCodeButton.addEventListener('click', scanQRCode);
});

// Function to Handle QR Code Scanning
async function scanQRCode() {
    try {
        // Try to create streaming app to scan QR code
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        const video = document.createElement("video");
        video.srcObject = stream;
        video.setAttribute("playsinline", true);
        video.play();
        // Create QR Scanner
        const qrScanner = new QrScanner(video, result => {
            console.log("Scanned QR Code:", result);
            qrScanner.stop();
            stream.getTracks().forEach(track => track.stop());
            sendUserCode(result);
        });
        // Start app
        qrScanner.start();
    } catch (error) {
        console.error("Error accessing camera:", error);
        alert("Unable to access camera. Please enter user code manually.");
    }
}

// Function to Submit User Code Manually
function submitUserCode() {
    const userCode = userCodeInput.value.trim();
    if (!userCode) {
        alert("Please enter a valid user code.");
        return;
    }
    sendUserCode(userCode);
}

// Dynamic endpoint prefix on Vercel and local app deployment
const BASE_URL = window.location.origin.includes("localhost")
? "http://localhost:3000/api" // Local dev environment by Vercel
: "https://auburn-coffee-backend.vercel.app/api"; // Vercel backend

// Function to Send User Code to Backend
async function sendUserCode(userCode) {
    try {
        const response = await fetch(`${BASE_URL}/user/increment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_code: userCode }),
        });
        // Broken request
        if (!response.ok) {
            throw new Error("Failed to update user streak.");
        }
        // Create dynamic display on the matching user data
        const userData = await response.json(); // Get user data
        // Display user information below the submit button
        userInfoContainer.innerHTML = `
        <p><strong>User:</strong> ${userData.user_name}</p>
        <p><strong>Streak:</strong> ${userData.user_streak}</p>
        ${userData.user_streak >= 10 ? `<button id="redeemStreakButton" class="redeem-button">Redeem Streak</button>` : ""}
        `;
        // Ensure the "Redeem Streak" button is properly attached after rendering
        setTimeout(() => {
        const redeemButton = document.getElementById("redeemStreakButton");
        if (redeemButton) {
            redeemButton.addEventListener("click", () => redeemStreak(userCode));
        }
        }, 100); // Wait (0.1s) for the DOM to update before attaching event listener
        // Update/Increment streak
        alert("Loyalty streak updated successfully!");
    } catch (error) {
        console.error("Error updating user streak:", error);
        alert("Error updating loyalty streak. Please try again.");
    }
}

// Function to Redeem Streak (Subtract 10 from user_streak)
async function redeemStreak(userCode) {
    try {
        const response = await fetch(`${BASE_URL}/user/decrement`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_code: userCode }),
        });
        if (!response.ok) {
            throw new Error("Failed to redeem streak.");
        }
        // Get updated user data
        const updatedUser = await response.json();
        // Update UI after successful redemption
        userInfoContainer.innerHTML = `
            <p><strong>User:</strong> ${updatedUser.user_name}</p>
            <p><strong>Streak:</strong> ${updatedUser.user_streak}</p>
            ${updatedUser.user_streak >= 10 ? `<button id="redeemStreakButton" class="redeem-button">Redeem Streak</button>` : ""}
        `;
        // Ensure the button is reattached if streak is still ≥ 10
        setTimeout(() => {
            const redeemButton = document.getElementById("redeemStreakButton");
            if (redeemButton) {
                redeemButton.addEventListener("click", () => redeemStreak(userCode));
            }
        }, 100); // Wait (0.1s) for DOM update
        alert("Streak redeemed successfully! 10 points used.");
    } catch (error) {
        console.error("Error redeeming streak:", error);
        alert("Error redeeming streak. Please try again.");
    }
}
