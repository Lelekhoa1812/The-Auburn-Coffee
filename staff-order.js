document.addEventListener("DOMContentLoaded", () => {
    const loginSection = document.getElementById("loginSection");
    const registerSection = document.getElementById("registerSection");
    const ordersContainer = document.getElementById("ordersContainer");
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
    
    // Login
    document.getElementById("loginBtn").addEventListener("click", async () => {
        const staffName = document.getElementById("staffName").value.trim();
        const staffPin = document.getElementById("staffPin").value.trim();
        // Mandatory fields for login
        if (!staffName || !staffPin) {
            alert("Please fill in both fields.");
            return;
        }
        // Connect to DB and post staff login credential data as JSON
        try {
            const response = await fetch("http://localhost:5002/api/staff/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ staff_name: staffName, staff_pin: staffPin }),
            });
            // Attempt to match credential information
            if (response.ok) {
                document.getElementById("loginRegisterModal").classList.add("hidden");
                loadOrders();
            } else {
                alert("Invalid login credentials.");
            }
        } catch (err) {
            console.error(err);
            alert("Error logging in. Please try again.");
        }
    });
 
    // Register
    document.getElementById("createAccountBtn").addEventListener("click", async () => {
        const newStaffName = document.getElementById("newStaffName").value.trim();
        const newStaffPin = document.getElementById("newStaffPin").value.trim();        
        // Make sure data is valid
        if (!newStaffName || !newStaffPin || newStaffPin.length !== 6) {
            alert("Please provide a unique name and a 6-digit pin.");
            return;
        }
        // Connect to DB and register new account
        try {
            const response = await fetch("http://localhost:5002/api/staff/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ staff_name: newStaffName, staff_pin: newStaffPin }),
            });
            // Catch account creation
            if (response.ok) {
                alert("Account created successfully! You can now log in.");
                toggleSection(true);
            } else {
                alert("Failed to create account. Name might already exist.");
            }
        } catch (err) {
            console.error(err);
            alert("Error creating account. Please try again.");
        }
    });
    // Loading orders details post login
    async function loadOrders() {
        try {
            const response = await fetch("http://localhost:5002/api/orders");
            if (!response.ok) {
                throw new Error(`Failed to fetch orders: ${response.status} ${response.statusText}`);
            }
            const orders = await response.json();
            displayOrders(orders);
        } catch (error) {
            console.error("Error loading orders:", error);
        }
    }
    
    // Dynamic UI to display all order with HTML template when loaded
    function displayOrders(orders) {
        const ordersContainer = document.getElementById("orders-container");
        ordersContainer.innerHTML = ""; // Clear existing content
        // Fetch all order and create HTML template
        orders.forEach(order => {
            const orderDiv = document.createElement("div");
            orderDiv.classList.add("order-card");
            // Order HTML template
            orderDiv.innerHTML = `
                <h3>Order ID: ${order.order_id}</h3>
                <p>Customer Name: ${order.customer_name}</p>
                <p>ETA: ${order.order_eta || "Not provided"}</p>
                <p>Status: ${order.order_status}</p>
                <p>Total Price: $${order.total_price.toFixed(2)}</p>
                <p>Notice: ${order.order_notice || "No additional notes"}</p>
            `;
            // Append all child to the order container 
            ordersContainer.appendChild(orderDiv);
        });
    }    

    // Show login section by default
    toggleSection(true);
});
