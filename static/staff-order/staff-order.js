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
    // On toggle per which section - TEMPORARILY DISABLED
    // document.getElementById("showRegisterBtn").addEventListener("click", () => toggleSection(false));
    // document.getElementById("showLoginBtn").addEventListener("click", () => toggleSection(true));
    
    // Dynamic endpoint prefix on Vercel and local app deployment
    const BASE_URL = window.location.origin.includes("localhost")
    // ? "http://localhost:5002/api" // Local dev environment on NodeJS
    ? "http://localhost:3000/api" // Local dev environment by Vercel
    : "https://auburn-coffee-backend.vercel.app/api"; // Vercel backend
    // const BASE_URL = "http://localhost:3000/api";

    // Initialize empty staff name utility that is updated upon login - TEMPORARILY DISABLED
    // // Login
    // document.getElementById("loginBtn").addEventListener("click", async () => {
    //     const staffName = document.getElementById("staffName").value.trim();
    //     const staffPin = document.getElementById("staffPin").value.trim();
    //     // Mandatory fields for login
    //     if (!staffName || !staffPin) {
    //         alert("Please fill in both fields.");
    //         return;
    //     }
    //     // Connect to DB and post staff login credential data as JSON
    //     try {
    //         const response = await fetch(`${BASE_URL}/staff/login`, {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ staff_name: staffName, staff_pin: staffPin }),
    //     });
    //     // Attempt to match credential information
    //     if (response.ok) {
    //             const loginRegisterModal = document.getElementById("loginRegisterModal");
    //             const staffData = await response.json();
    //             // Determine if the user is logging in as "staff" or "user"
    //             const userRole = "staff"
    //             // Save user info in localStorage (this is used when navigating to the edit account page)
    //         localStorage.setItem("userInfo", JSON.stringify({
    //         id: staffData.staff_id,
    //         name: staffData.user_name,
    //         pin: staffData.user_pin,
    //         role: userRole
    //     }));
    //             loginRegisterModal.style.display = "none"; // Hide modal when login successfully
    //             displayStaffName(staffName) // Display welcome message to staff
    //             fetchOrders('today'); // Default: Fetch today's orders
    //     } else {
    //         alert("Invalid login credentials.");
    //     }
    //     } catch (err) {
    //         console.error(err);
    //         alert("No order has been made today.");
    //     }
    // });
    // Register - TEMPORARILY DISABLED
    // document.getElementById("createAccountBtn").addEventListener("click", async () => {
    //     const newStaffName = document.getElementById("newStaffName").value.trim();
    //     const newStaffPin = document.getElementById("newStaffPin").value.trim();        
    //     // Make sure data is valid
    //     if (!newStaffName || !newStaffPin || newStaffPin.length !== 6) {
    //         alert("Please provide a unique name and a 6-digit pin.");
    //         return;
    //     }
    //     // Connect to DB and register new account
    //     try {
    //         const response = await fetch(`${BASE_URL}/staff/register`, {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ staff_name: newStaffName, staff_pin: newStaffPin }),
    //     });
    //     // Catch account creation
    //     if (response.ok) {
    //         alert("Account created successfully! You can now log in.");
    //         toggleSection(true);
    //     // Cannot having duplicated staff name in account
    //     } else {
    //         alert("Failed to create account. Name might already exist.");
    //     }
    //     // Cannot create account because DB or connection error
    //     } catch (err) {
    //         console.error(err);
    //         alert("Error creating account. Please try again.");
    //     }
    // });

    // Auto-start for staff access (temporarily disabled login)
    displayStaffName("Staff Member");
    fetchOrders('today'); // Default: Fetch today's orders

    // Dynamically show the staff name after login
    function displayStaffName(staffName) {
        const staffContainer = document.getElementById("staff-container");
        staffContainer.innerHTML = ""; // Clear existing staff content
        // Staff welcome div (only show when staff name not null)
        if (staffName.trim()) {
            const staffDiv = document.createElement("div");
            staffDiv.classList.add("staff-card");
            staffDiv.innerHTML = `
                <h2>Welcome back to the Auburn Coffee, ${staffName}!</h2>
                <h2>Taking your current orders now:</h2>
                `;
            staffContainer.appendChild(staffDiv);
        }
    }

    // Loading orders details post login
    async function loadOrders(filter = 'today') {
        let apiUrl = `${BASE_URL}/orders/with-items`;
        // Search for today order only dynamically  
        if (filter === 'today') {
            const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
            apiUrl += `?date=${today}`;
        }
        try {                 
            const response = await fetch(apiUrl);
            // Catch error when cannot connecting to DB
            if (!response.ok) {
                throw new Error(`Failed to fetch orders: ${response.status} ${response.statusText}`);
            }
            const orders = await response.json();
            // console.log("Orders with items:", orders); // Debugging line
            displayOrders(orders);
            // Error when loading response from DB
        } catch (error) {
            console.error("Error loading orders:", error);
            const ordersContainer = document.getElementById("orders-container");
            // Showing error message on UI when cannot loading any order
            if (ordersContainer) {
                ordersContainer.innerHTML = `<p>No order found today. Please try again later.</p>`;
            }
        }
    }

    // Function to refresh order loader every 7 seconds (Polling)
    function startPolling() {
        let currentFilter = 'today'; // Default filter
        loadOrders(currentFilter); // Load initially
        setInterval(() => {
            loadOrders(currentFilter); // Always use the current filter
        }, 7000);
        // Update filter on radio button change
        document.querySelectorAll('input[name="orderFilter"]').forEach(radio => {
            radio.addEventListener('change', (event) => {
                currentFilter = event.target.value; // Update filter based on user selection
                loadOrders(currentFilter); // Load new selection immediately
            });
        });
    }
    // Call polling when the page loads
    startPolling();

    // Define status colors
    const statusColors = {
        'New Order': '#858b13',
        'Pending': '#168275',
        'Editing': '#8c2b2b',
        'Received': '#7e136b',
        'Completed': '#124477',
        'Awaiting': '#000000',
        'DEF': '#8c2b2b' // Set a custom color tag for other highlights
    };

    // Function to start blinking effect
    function startBlinkingEffect(orderStatusElement, orderStatus) {
        let defaultColor = "#351b09"; // Default color
        let targetColor = statusColors[orderStatus] || defaultColor; // Get the corresponding color
        let toggle = false;
        setInterval(() => {
            orderStatusElement.style.color = toggle ? defaultColor : targetColor;
            toggle = !toggle;
        }, 400); // Toggle color every 0.4s
    }
    
    // Dynamic UI to display all order with HTML template when loaded
    function displayOrders(orders) {
        const ordersContainer = document.getElementById("orders-container");
        if (!ordersContainer) {
            console.error("Error: orders-container element not found in the DOM.");
            return;
        }    
        ordersContainer.innerHTML = ""; // Clear existing order content
        // Fetch all order and create HTML template
        // Order HTML template, loop through each order
        orders.forEach(order => {
            const orderDiv = document.createElement("div");
            orderDiv.classList.add("order-card");
            // Ensure items exist and create their HTML template
            let itemsHTML = "";
            if (order.items && order.items.length > 0) {
                order.items.forEach(item => {
                    itemsHTML += `
                        <div class="item-card">
                            <p><strong>Item:</strong> ${item.item_name}</p>
                            <p><strong>Size:</strong> ${item.item_size || "N/A"}</p>
                            <p><strong>Quantity:</strong> ${item.item_quantity}</p>
                            <p><strong>Price:</strong> $${item.item_price.toFixed(2)}</p>
                        </div>`;
                });
            } else { // Casing no item fetched for this order
                itemsHTML = `<p>No items available for this order.</p>`;
            }
            // Order HTML template
            orderDiv.innerHTML = `
                <h4>Customer Name: ${order.customer_name}</h4>
                <p><strong>Estimate Arrival:</strong> ${order.order_eta}</p>
                <p><strong>Order Time:</strong> ${order.order_time}</p>
                <p><strong>Status:</strong> 
                    <span class="order-status-text">${order.order_status}</span>
                </p>
                <p><strong>Total Price:</strong> $${order.total_price.toFixed(2)}</p>
                <p><strong>Notice:</strong> ${order.order_notice || "No additional notes"}</p>
                <div class="items-section">
                    ${itemsHTML}
                </div>
            `;
            // Append all child to the order container
            ordersContainer.appendChild(orderDiv);
            // Start blinking effect for this order status
            const orderStatusElement = orderDiv.querySelector('.order-status-text');
            startBlinkingEffect(orderStatusElement, order.order_status);
            // const orderETAElement = orderDiv.querySelector('.order-eta-text');
            // startBlinkingEffect(orderETAElement, "DEF"); // Red color for default highlight
        });
    }    

    // Show login section by default - TEMPORARILY DISABLED
    // toggleSection(true);

    // Navigate to Edit Account Page
    document.getElementById("manageAccountBtn").addEventListener("click", () => {
        window.location.href = "../edit-account/edit-account.html"; // Navigate to the account editing page
    });

    // Enhanced QR Scanner functionality
    let qrScanner = null;
    let isScanning = false;

    // Show QR modal by default
    setTimeout(() => {
        document.getElementById("qrModal").classList.add("active");
    }, 500);

    // Enhanced QR scanning with visual feedback
    document.getElementById("scanQRCode").addEventListener("click", () => {
        if (!isScanning) {
            startQRScanning();
        } else {
            stopQRScanning();
        }
    });

    function startQRScanning() {
        isScanning = true;
        const scanButton = document.getElementById("scanQRCode");
        scanButton.textContent = "Stop Scanning";
        scanButton.classList.add("scanning-active");
        
        // Create scanning container
        const scanningContainer = document.createElement("div");
        scanningContainer.id = "scanningContainer";
        scanningContainer.className = "scanning-container";
        scanningContainer.innerHTML = `
            <div class="scanning-frame">
                <div class="scanning-line"></div>
                <div class="scanning-corners">
                    <div class="corner top-left"></div>
                    <div class="corner top-right"></div>
                    <div class="corner bottom-left"></div>
                    <div class="corner bottom-right"></div>
                </div>
            </div>
            <p class="scanning-text">Position QR code within the frame</p>
        `;
        
        document.getElementById("qrModal").appendChild(scanningContainer);
        
        // Initialize QR scanner
        if (typeof QrScanner !== 'undefined') {
            qrScanner = new QrScanner(
                document.getElementById("qrModal"),
                result => {
                    handleQRResult(result.data);
                },
                { returnDetailedScanResult: true }
            );
            qrScanner.start();
        }
    }

    function stopQRScanning() {
        isScanning = false;
        const scanButton = document.getElementById("scanQRCode");
        scanButton.textContent = "Scan QR Code";
        scanButton.classList.remove("scanning-active");
        
        if (qrScanner) {
            qrScanner.stop();
        }
        
        const scanningContainer = document.getElementById("scanningContainer");
        if (scanningContainer) {
            scanningContainer.remove();
        }
    }

    function handleQRResult(data) {
        stopQRScanning();
        alert(`QR Code scanned: ${data}`);
        // Here you can add logic to process the loyalty code
    }

    // Membership Management Functions
    function openMembershipModal() {
        console.log("openMembershipModal called");
        const modal = document.getElementById("membershipModal");
        console.log("Modal element:", modal);
        modal.classList.add("active");
        console.log("Modal classes after adding active:", modal.classList);
        loadMembershipData();
    }

    function closeMembershipModal() {
        document.getElementById("membershipModal").classList.remove("active");
    }

    async function loadMembershipData() {
        try {
            const response = await fetch(`${BASE_URL}/users`);
            if (response.ok) {
                const users = await response.json();
                displayMembershipList(users);
            } else {
                document.getElementById("membershipList").innerHTML = "<p>Failed to load membership data.</p>";
            }
        } catch (error) {
            console.error("Error loading membership data:", error);
            document.getElementById("membershipList").innerHTML = "<p>Error loading membership data.</p>";
        }
    }

    function displayMembershipList(users) {
        const membershipList = document.getElementById("membershipList");
        membershipList.innerHTML = "";
        
        users.forEach(user => {
            const userCard = document.createElement("div");
            userCard.className = "user-card";
            userCard.innerHTML = `
                <div class="user-info">
                    <h3>${user.user_name}</h3>
                    <p><strong>Loyalty Code:</strong> ${user.user_code}</p>
                    <p><strong>Current Streak:</strong> ${user.user_streak || 0}</p>
                </div>
                <button class="reset-password-btn" onclick="resetUserPassword('${user.user_id}')">
                    Reset Password
                </button>
            `;
            membershipList.appendChild(userCard);
        });
    }

    async function resetUserPassword(userId) {
        try {
            const response = await fetch(`${BASE_URL}/user/reset-password`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: userId, new_pin: "123456" })
            });
            
            if (response.ok) {
                alert("Password reset successfully to 123456");
                loadMembershipData(); // Refresh the list
            } else {
                alert("Failed to reset password");
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            alert("Error resetting password");
        }
    }

    // Make functions globally accessible
    window.closeMembershipModal = closeMembershipModal;
    window.resetUserPassword = resetUserPassword;

    // Set up event listeners after all functions are defined
    const membershipBtn = document.getElementById("manageMembershipBtn");
    const membershipModal = document.getElementById("membershipModal");
    console.log("Membership button element:", membershipBtn);
    console.log("Membership modal element:", membershipModal);
    
    if (membershipBtn) {
        membershipBtn.addEventListener("click", () => {
            console.log("Membership button clicked!");
            openMembershipModal();
        });
    } else {
        console.error("Membership button not found!");
    }
});
