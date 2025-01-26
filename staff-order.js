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
    
    // Base endpoint prefix on Vercel app deployment
    // const BASE_URL = 'https://the-auburn-coffee.vercel.app/api';
    // Base endpoint prefix on local app deployment
    // const BASE_URL = 'http://localhost:5002/api';
    const BASE_URL = '/api';

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
            // const response = await fetch("http://localhost:5002/api/staff/login", {
            const response = await fetch(`${BASE_URL}/staff/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ staff_name: staffName, staff_pin: staffPin }),
            });
            // Attempt to match credential information
            if (response.ok) {
                    const loginRegisterModal = document.getElementById("loginRegisterModal");
                    loginRegisterModal.style.display = "none"; // Hide modal when login successfully
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
            // const response = await fetch("http://localhost:5002/api/staff/register", {
            const response = await fetch(`${BASE_URL}/staff/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ staff_name: newStaffName, staff_pin: newStaffPin }),
            });
            // Catch account creation
            if (response.ok) {
                alert("Account created successfully! You can now log in.");
                toggleSection(true);
            // Cannot having duplicated staff name in account
            } else {
                alert("Failed to create account. Name might already exist.");
            }
        // Cannot create account because DB or connection error
        } catch (err) {
            console.error(err);
            alert("Error creating account. Please try again.");
        }
    });
    // Loading orders details post login
    async function loadOrders() {
        try {
            // const response = await fetch("http://localhost:5002/api/orders/with-items"); // endpoint fetching all orders with matching items
            const response = await fetch(`${BASE_URL}/orders/with-items`);
            // Catch error when cannot connecting to DB
            if (!response.ok) {
                throw new Error(`Failed to fetch orders: ${response.status} ${response.statusText}`);
            }
            const orders = await response.json();
            displayOrders(orders);
            // Error when loading response from DB
        } catch (error) {
            console.error("Error loading orders:", error);
            const ordersContainer = document.getElementById("orders-container");
            // Showing error message on UI when cannot loading any order
            if (ordersContainer) {
                ordersContainer.innerHTML = `<p>Unable to load orders. Please try again later.</p>`;
            }
        }
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
        orders.forEach(order => {
            const orderDiv = document.createElement("div");
            orderDiv.classList.add("order-card");
            let itemsHTML = ""; // Clear existing item content
            // Inner Item HTML template
            order.items.forEach(item => {
                itemsHTML += `
                    <div class="item-card">
                        <p>Item: ${item.item_name}</p>
                        <p>Size: ${item.item_size || "N/A"}</p>
                        <p>Quantity: ${item.item_quantity}</p>
                        <p>Price: $${item.item_price.toFixed(2)}</p>
                    </div>`;
            });
            // Order HTML template
            orderDiv.innerHTML = `
                <h3>Customer Name: ${order.customer_name}</h3>
                <p>Estimate Arrival: ${order.order_eta || "Not provided"}</p>
                <p>Order Time: ${order.order_time}</p>
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
