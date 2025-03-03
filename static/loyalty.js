document.addEventListener("DOMContentLoaded", () => {
    const loginSection = document.getElementById("loginSection");
    const registerSection = document.getElementById("registerSection");
    // Toggle showing between section and collapse other
    const toggleSection = (showLogin) => {
        if (showLogin) {
            loginSection.classList.remove("collapsed");
            registerSection.classList.add("collapsed");
        } else {
            loginSection.classList.add("collapsed");
            registerSection.classList.remove("collapsed");
        }
    };
    // On toggle per which section
    document.getElementById("showRegisterBtn").addEventListener("click", () => toggleSection(false));
    document.getElementById("showLoginBtn").addEventListener("click", () => toggleSection(true));
    
    // Dynamic endpoint prefix on Vercel and local app deployment
    const BASE_URL = window.location.origin.includes("localhost")
    ? "http://localhost:3000/api" // Local dev environment by Vercel
    : "https://auburn-coffee-backend.vercel.app/api"; // Vercel backend

    // Initialize empty user name utility that is updated upon login
    // Login
    document.getElementById("loginBtn").addEventListener("click", async () => {
        const userName = document.getElementById("userName").value.trim();
        const userPin = document.getElementById("userPin").value.trim();
        // Mandatory fields for login
        if (!userName || !userPin) {
            alert("Please fill in both fields.");
            return;
        }
        // Connect to DB and post user login credential data as JSON
        try {
            const response = await fetch(`${BASE_URL}/user/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_name: userName, user_pin: userPin }),
            });
            // Attempt to match credential information
            if (response.ok) {
                    const loginRegisterModal = document.getElementById("loginRegisterModal");
                    const userData = await response.json();
                    currentUserCode = userData.user_code;     // Store user_code
                    currentUserStreak = userData.user_streak; // Store user_streak
                    // Determine if the user is logging in as "staff" or "user"
                    const userRole = "user"
                    // Save user info in localStorage (this is used when navigating to the edit account page)
                    localStorage.setItem("userInfo", JSON.stringify({
                        id: userData.user_id,
                        name: userData.user_name,
                        pin: userData.user_pin,
                        role: userRole
                    }));
                    loginRegisterModal.style.display = "none"; // Hide modal when login successfully
                    showQR(); // Fetch the user_code and display QR code
                } else {
                alert("Invalid login credentials.");
            }
        } catch (err) {
            console.error(err);
            alert("Server error! Please let the staff now your loyalty code.");
        }
    });
    // Register
    document.getElementById("createAccountBtn").addEventListener("click", async () => {
        const newUserName = document.getElementById("newUserName").value.trim();
        const newUserPin = document.getElementById("newUserPin").value.trim();        
        // Make sure data is valid
        if (!newUserName || !newUserPin || newUserPin.length !== 6) {
            alert("Please provide a unique name and a 6-digit pin.");
            return;
        }
        // Connect to DB and register new account
        try {
            const response = await fetch(`${BASE_URL}/user/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_name: newUserName, user_pin: newUserPin }),
            });
            // Catch account creation
            if (response.ok) {
                alert("Account created successfully! You can now log in.");
                toggleSection(true);
            // Cannot having duplicated user name in account
            } else {
                alert("Failed to create account. Name might already exist.");
            }
        // Cannot create account because DB or connection error
        } catch (err) {
            console.error(err);
            alert("Error creating account. Please try again.");
        }
    });  

    // Show login section by default
    toggleSection(true);

    // Navigate to Edit Account Page
    document.getElementById("manageAccountBtn").addEventListener("click", () => {
        window.location.href = "edit-account.html"; // Navigate to the account editing page
    });

    // Function to display QR Code from user_code
    function showQR() {
        if (!currentUserCode) {
            alert("No user code available. Please reload and log in again.");
            return;
        }
        // if (!currentUserStreak) {
        //     alert("No user streak available. Please reload and log in again.");
        //     return;
        // }
        // Create a new div as QR container
        const qrContainer = document.createElement("div");
        qrContainer.id = "qrCodeContainer";
        qrContainer.style.textAlign = "center";
        qrContainer.style.marginTop = "20px";
        // Create QR title and code display
        const qrTitle = document.createElement("p");
        qrTitle.textContent = `My Loyalty Code: ${currentUserCode}`;
        qrTitle.style.fontSize = "1.2rem";
        qrTitle.style.fontWeight = "bold";
        qrTitle.style.color = "#5a3315"; // Coffee theme color
        // Create QR img
        const qrImage = document.createElement("img");
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${currentUserCode}`;
        qrImage.alt = "QR Code";
        qrImage.style.border = "2px solid #5a3315";
        qrImage.style.padding = "10px";
        qrImage.style.borderRadius = "10px";
        // Create streak display
        const streakTitle = document.createElement("p");
        streakTitle.textContent = `My Loyalty Streak: ${currentUserStreak}`;
        streakTitle.style.fontSize = "1.2rem";
        streakTitle.style.fontWeight = "bold";
        streakTitle.style.color = "#5a3315"; // Coffee theme color
        // Create QR instruction and code display
        // i1
        const qrInstruction1 = document.createElement("p");
        qrInstruction1.textContent = `Please allow staffs to scan this QR code for your loyalty streak 📸`;
        qrInstruction1.style.fontSize = "0.8rem";
        qrInstruction1.style.fontWeight = "italic";
        qrInstruction1.style.color = "#3d2f03"; // Yellow theme color
        // i2
        const qrInstruction2 = document.createElement("p");
        qrInstruction2.textContent = `Redeem a free cup of coffee when you have a streak of 10 🔥☕`;
        qrInstruction2.style.fontSize = "0.8rem";
        qrInstruction2.style.fontWeight = "italic";
        qrInstruction2.style.color = "#3d2f03"; // Yellow theme color
        // i3
        const qrInstruction3 = document.createElement("p");
        qrInstruction3.textContent = `Notice: If you cannot see the QR code image displayed, please let us know your loyalty code instead.`;
        qrInstruction3.style.fontSize = "0.8rem";
        qrInstruction3.style.fontWeight = "italic";
        qrInstruction3.style.color = "#3d2f03"; // Yellow theme color
        // Container add title and image
        qrContainer.appendChild(qrTitle);
        qrContainer.appendChild(qrImage);
        qrContainer.appendChild(streakTitle);
        // Add instructions
        qrContainer.appendChild(qrInstruction1);
        qrContainer.appendChild(qrInstruction2);
        qrContainer.appendChild(qrInstruction3);
        // Container add qr container
        document.body.appendChild(qrContainer);
    }
});
