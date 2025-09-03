// QrScanner will be loaded via UMD script tag in HTML

const qrButton = document.getElementById('qrButton');
const scanQRCodeButton = document.getElementById('scanQRCode');
const qrModal = document.getElementById('qrModal');
const userCodeInput = document.getElementById('userCodeInput');
const userInfoContainer = document.createElement("div");
userInfoContainer.id = "userInfoContainer";

let isScanning = false;
let currentScanner = null;
let currentStream = null;
let isSubmitting = false; // prevent duplicate submissions

// Append user info container and video streaming container
document.addEventListener("DOMContentLoaded", () => {
    const modalContent = document.querySelector(".modal2-content");
    if (modalContent) {
        // Ensure only one scroll container: use the modal content
        // try {
        //     const legacyContainers = document.querySelectorAll('.qr-scanner-container');
        //     legacyContainers.forEach(el => el.parentElement && el.parentElement.removeChild(el));
        //     modalContent.style.maxHeight = '80vh';
        //     modalContent.style.overflowY = 'auto';
        // } catch (e) {}

        modalContent.appendChild(userInfoContainer);
        
        // Create video streaming container with scanning corners
        const videoStreamingContainer = document.createElement("div");
        videoStreamingContainer.id = "videoStreamingContainer";
        videoStreamingContainer.style.cssText = `
            position: relative;
            width: 100%;
            height: 300px;
            margin: 20px 0;
            border-radius: 15px;
            overflow: hidden;
            background: #000;
            display: none;
        `;
        
        // Create preview video element (visible)
        const previewVideo = document.createElement("video");
        previewVideo.id = "qrPreviewVideo";
        previewVideo.className = "qr-video";
        previewVideo.setAttribute("autoplay", "");
        previewVideo.setAttribute("muted", "");
        previewVideo.setAttribute("playsinline", "");
        previewVideo.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 15px;
        `;

        // Create hidden scan video element (not visible, used only for decoding)
        const scanVideo = document.createElement("video");
        scanVideo.id = "qrScanVideo";
        scanVideo.setAttribute("autoplay", "");
        scanVideo.setAttribute("muted", "");
        scanVideo.setAttribute("playsinline", "");
        scanVideo.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            opacity: 0;
            pointer-events: none;
            left: -9999px;
            top: -9999px;
        `;
        
        // Create scanning overlay
        const scanningOverlay = document.createElement("div");
        scanningOverlay.className = "scanning-overlay";
        scanningOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            pointer-events: none;
        `;
        
        // Create scanning corners
        const scanningCorners = document.createElement("div");
        scanningCorners.className = "scanning-corners";
        scanningCorners.style.cssText = `
            position: relative;
            width: 100%;
            margin: 15px 0;
        `;
        
        // Create corner elements
        const corners = [
            { class: "corner top-left", style: "position: absolute; display: inline-block; width: 20px; height: 20px; border: 3px solid #6B4226; margin: 0 5px; border-right: none; border-bottom: none; border-radius: 15px 0 0 0; top: -90px; left: 0;" },
            { class: "corner top-right", style: "position: absolute; display: inline-block; width: 20px; height: 20px; border: 3px solid #6B4226; margin: 0 5px; border-left: none; border-bottom: none; border-radius: 0 15px 0 0; top: -90px; right: 0;" },
            { class: "corner bottom-left", style: "position: absolute; display: inline-block; width: 20px; height: 20px; border: 3px solid #6B4226; margin: 0 5px; border-right: none; border-top: none; border-radius: 0 0 0 15px; bottom: -150px; left: 0;" },
            { class: "corner bottom-right", style: "position: absolute; display: inline-block; width: 20px; height: 20px; border: 3px solid #6B4226; margin: 0 5px; border-left: none; border-top: none; border-radius: 0 0 15px 0; bottom: -150px; right: 0;" }
        ];
        
        corners.forEach(corner => {
            const cornerElement = document.createElement("div");
            cornerElement.className = corner.class;
            cornerElement.style.cssText = corner.style;
            scanningCorners.appendChild(cornerElement);
        });
        
        // Create scanning text
        const scanningText = document.createElement("p");
        scanningText.className = "scanning-text";
        scanningText.textContent = "Position QR code within the frame";
        scanningText.style.cssText = `
            margin-top: 15px;
            color: #6B4226;
            font-weight: 500;
            text-align: center;
        `;
        
        // Assemble the container
        scanningOverlay.appendChild(scanningCorners);
        scanningOverlay.appendChild(scanningText);
        videoStreamingContainer.appendChild(previewVideo);
        videoStreamingContainer.appendChild(scanningOverlay);
        // Hidden scan video is added to DOM to keep it alive, but off-screen
        videoStreamingContainer.appendChild(scanVideo);
        
        // Place the video preview directly under the Start Camera button
        const startButton = document.getElementById('scanQRCode');
        if (startButton && startButton.parentElement) {
            // Insert after Start Camera button
            startButton.parentElement.insertBefore(videoStreamingContainer, startButton.nextSibling);
        } else {
            // Fallback: try to place above the OR splitter
            const orText = document.querySelector('.or-text');
            if (orText && orText.parentElement) {
                orText.parentElement.insertBefore(videoStreamingContainer, orText);
            } else {
                // Final fallback: append at end of modal content
                modalContent.appendChild(videoStreamingContainer);
            }
        }
    }
});

// Open/Close Modal
const openQRModal = () => (qrModal.style.display = 'block');
const closeQRModal = () => {
    qrModal.style.display = 'none';
    userCodeInput.value = "";
    userInfoContainer.innerHTML = "";
    stopScanning();
};

window.closeQRModal = closeQRModal;

document.addEventListener('DOMContentLoaded', () => {
    const waitForQrScanner = () => {
        if (typeof QrScanner !== 'undefined') {
            if (qrButton) {
                qrButton.addEventListener('click', openQRModal);
            }
            if (scanQRCodeButton) {
                scanQRCodeButton.addEventListener('click', scanQRCode);
            }
            // Do NOT attach submitUserCode click listener here; we rely on inline onclick to avoid duplicates
        } else {
            setTimeout(waitForQrScanner, 100);
        }
    };
    waitForQrScanner();
    if (typeof QrScanner !== 'undefined') {
        if (qrButton) {
            qrButton.addEventListener('click', openQRModal);
        }
        if (scanQRCodeButton) {
            scanQRCodeButton.addEventListener('click', scanQRCode);
        }
        // No submitUserCode listener here either
    }
});

function setScanButtonState(active) {
    if (!scanQRCodeButton) return;
    if (active) {
        scanQRCodeButton.textContent = 'Stop Scanning';
        scanQRCodeButton.style.backgroundColor = '#c62828';
        scanQRCodeButton.style.color = '#ffffff';
        scanQRCodeButton.style.borderColor = '#c62828';
    } else {
        scanQRCodeButton.textContent = 'Scan QR';
        scanQRCodeButton.style.backgroundColor = '';
        scanQRCodeButton.style.color = '';
        scanQRCodeButton.style.borderColor = '';
    }
}

function stopScanning() {
    const videoStreamingContainer = document.getElementById("videoStreamingContainer");
    const previewVideo = document.getElementById('qrPreviewVideo');
    const scanVideo = document.getElementById('qrScanVideo');
    if (currentScanner) {
        try { currentScanner.stop(); } catch (e) {}
        currentScanner = null;
    }
    if (currentStream) {
        try { currentStream.getTracks().forEach(t => t.stop()); } catch (e) {}
        currentStream = null;
    }
    if (previewVideo) {
        try { previewVideo.srcObject = null; previewVideo.pause(); } catch (e) {}
    }
    if (scanVideo) {
        try { scanVideo.srcObject = null; scanVideo.pause(); } catch (e) {}
    }
    if (videoStreamingContainer) {
        videoStreamingContainer.style.display = "none";
    }
    isScanning = false;
    setScanButtonState(false);
}

async function scanQRCode() {
    try {
        if (isScanning) {
            stopScanning();
            return;
        }
        const videoStreamingContainer = document.getElementById("videoStreamingContainer");
        if (videoStreamingContainer) {
            videoStreamingContainer.style.display = "block";
        }
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: "environment",
                width: { ideal: 1280, min: 640 },
                height: { ideal: 720, min: 480 }
            } 
        });
        currentStream = stream;
        const previewVideo = document.getElementById("qrPreviewVideo");
        const scanVideo = document.getElementById("qrScanVideo");
        if (!previewVideo || !scanVideo) {
            throw new Error('Video elements not found');
        }
        // Attach the SAME stream to both videos
        previewVideo.srcObject = stream;
        scanVideo.srcObject = stream;
        await Promise.all([
            previewVideo.play().catch(() => {}),
            scanVideo.play().catch(() => {})
        ]);
        isScanning = true;
        setScanButtonState(true);
        // Use hidden scan video for decoding to avoid interfering with preview
        const qrScanner = new QrScanner(scanVideo, result => {
            // On successful scan, stop scanning and process once
            stopScanning();
            if (!isSubmitting) {
                sendUserCode(result);
            }
        }, {
            highlightScanRegion: true,
            highlightCodeOutline: true,
            overlay: null
        });
        currentScanner = qrScanner;
        qrScanner.start();
    } catch (error) {
        alert("Unable to access camera. Please enter user code manually.");
        stopScanning();
    }
}

// Remove programmatic listener; rely on inline onclick on the button in HTML
// document.getElementById("submitUserCodeButton").addEventListener("click", submitUserCode);
function submitUserCode() {
    const userCode = userCodeInput.value.trim();
    if (!userCode) {
        alert("Please enter a valid user code.");
        return;
    }
    if (!isSubmitting) {
        sendUserCode(userCode);
    }
}

// const BASE_URL = window.location.origin.includes("localhost")
// ? "http://localhost:3000/api"
// : "https://auburn-coffee-backend.vercel.app/api";
const BASE_URL = "https://auburn-coffee-backend.vercel.app/api";

async function sendUserCode(userCode) {
    if (isSubmitting) return;
    isSubmitting = true;
    try {
        const response = await fetch(`${BASE_URL}/user/increment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_code: userCode }),
        });
        if (!response.ok) {
            // Quietly stop submitting; do not alert immediately to avoid false error popups
            return;
        }
        const userData = await response.json();
        userInfoContainer.innerHTML = `
        <p><strong>User:</strong> ${userData.user_name}</p>
        <p><strong>Streak:</strong> ${userData.user_streak}</p>
        ${userData.user_streak >= 10 ? `<button id=\"redeemStreakButton\" class=\"redeem-button\">Redeem Streak</button>` : ""}
        `;
        setTimeout(() => {
            const redeemButton = document.getElementById("redeemStreakButton");
            if (redeemButton) {
                redeemButton.addEventListener("click", () => redeemStreak(userCode));
                try { redeemButton.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {}
            } else {
                try { userInfoContainer.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {}
            }
        }, 100);
        alert("Loyalty streak updated successfully!");
    } catch (error) {
        // Suppress immediate alert on transient network errors to avoid misleading error-before-success UX
        console.error('sendUserCode error:', error);
    } finally {
        // Allow a retry fairly quickly
        setTimeout(() => { isSubmitting = false; }, 300);
    }
}

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
        const updatedUser = await response.json();
        userInfoContainer.innerHTML = `
            <p><strong>User:</strong> ${updatedUser.user_name}</p>
            <p><strong>Streak:</strong> ${updatedUser.user_streak}</p>
            ${updatedUser.user_streak >= 10 ? `<button id=\"redeemStreakButton\" class=\"redeem-button\">Redeem Streak</button>` : ""}
        `;
        setTimeout(() => {
            const redeemButton = document.getElementById("redeemStreakButton");
            if (redeemButton) {
                redeemButton.addEventListener("click", () => redeemStreak(userCode));
                try { redeemButton.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {}
            } else {
                try { userInfoContainer.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {}
            }
        }, 100);
        alert("Streak redeemed successfully! 10 points used.");
    } catch (error) {
        alert("Error redeeming streak. Please try again.");
    }
}

window.sendUserCode = sendUserCode;