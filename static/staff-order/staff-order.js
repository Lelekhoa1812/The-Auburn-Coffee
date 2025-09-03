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
    // const BASE_URL = window.location.origin.includes("localhost")
    // ? "https://auburn-coffee-backend.vercel.app/api" // Vercel backend
    // : "https://auburn-coffee-backend.vercel.app/api"; // Vercel backend
    const BASE_URL =  "https://auburn-coffee-backend.vercel.app/api"; // Vercel backend

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
    loadOrders('today'); // Default: Fetch today's orders
    
    

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

    // QR scanner will handle all camera functionality

    // Show QR modal by default (only QR modal, not view menu modal)
    setTimeout(() => {
        const qrModal = document.getElementById("qrModal");
        if (qrModal) {
            qrModal.style.display = "block";
        }
        
        // Ensure view menu modal is hidden by default
        const viewMenuModal = document.getElementById("viewMenuModal");
        if (viewMenuModal) {
            viewMenuModal.style.display = "none";
        }
    }, 500);

    // QR scanner will handle all camera functionality







    // Handle manual user code submission
    function submitUserCode() {
        const userCode = document.getElementById('userCodeInput').value.trim();
        if (userCode) {
            // Use the sendUserCode function from qr-scanner.js
            if (typeof sendUserCode === 'function') {
                sendUserCode(userCode);
                document.getElementById('userCodeInput').value = '';
            } else {
                alert('QR scanner not loaded. Please refresh the page.');
            }
        } else {
            alert('Please enter a user code');
        }
    }

    // Membership Management Functions
    function openMembershipModal() {
        const modal = document.getElementById("membershipModal");
        modal.style.display = "block";
        loadMembershipData();
    }

    function closeMembershipModal() {
        document.getElementById("membershipModal").style.display = "none";
    }

    async function loadMembershipData() {
        try {
            const response = await fetch(`${BASE_URL}/user`);
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
    window.closeQRModal = closeQRModal;
    window.closeViewMenuModal = closeViewMenuModal;
    window.submitUserCode = submitUserCode;
    window.changePage = changePage;
    window.prevPage = prevPage;
    window.nextPage = nextPage;
    window.updateItemSize = updateItemSize;
    window.updateItemMilk = updateItemMilk;
    window.updateItemSyrup = updateItemSyrup;

    // QR Modal close function
    function closeQRModal() {
        const qrModal = document.getElementById("qrModal");
        if (qrModal) {
            qrModal.style.display = "none";
        }
    }

    // View Menu functionality
    let menuItems = [];
    let filteredMenuItems = [];
    let currentPage = 1;
    const pageSize = 10;

    // Load menu data
    async function loadMenuData() {
        try {
            const response = await fetch('../item.json');
            if (response.ok) {
                menuItems = await response.json();
                filteredMenuItems = [...menuItems];
                displayMenuItems();
                setupMenuFilters();
            } else {
                console.error('Failed to load menu data');
            }
        } catch (error) {
            console.error('Error loading menu data:', error);
        }
    }

    // Display menu items in table with pagination
    function displayMenuItems() {
        const tableBody = document.getElementById('menuTableBody');
        if (!tableBody) return;

        tableBody.innerHTML = '';
        
        // Get paginated items
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        const paginatedItems = filteredMenuItems.slice(start, end);
        
        paginatedItems.forEach(item => {
            const row = document.createElement('tr');
            const price = calculateItemPrice(item);
            
            // Create size selector if item supports sizes
            let sizeCell = 'N/A';
            if (item.pricelarge && item.pricemedium && item.pricesmall) {
                const selectedSize = item.size || 'medium'; // Default to medium if no size set
                sizeCell = `
                    <select class="size-selector" onchange="updateItemSize('${item.name}', this.value)">
                        <option value="small" ${selectedSize === 'small' ? 'selected' : ''}>Small</option>
                        <option value="medium" ${selectedSize === 'medium' ? 'selected' : ''}>Medium</option>
                        <option value="large" ${selectedSize === 'large' ? 'selected' : ''}>Large</option>
                    </select>
                `;
            } else if (item.price2 && item.price4 && item.price6 && item.price8) {
                const selectedSize = item.size || 'size4'; // Default to 4 pcs if no size set
                sizeCell = `
                    <select class="size-selector" onchange="updateItemSize('${item.name}', this.value)">
                        <option value="size2" ${selectedSize === 'size2' ? 'selected' : ''}>2 pcs</option>
                        <option value="size4" ${selectedSize === 'size4' ? 'selected' : ''}>4 pcs</option>
                        <option value="size6" ${selectedSize === 'size6' ? 'selected' : ''}>6 pcs</option>
                        <option value="size8" ${selectedSize === 'size8' ? 'selected' : ''}>8 pcs</option>
                    </select>
                `;
            }
            
            // Create milk selector if item supports milk
            let milkCell = 'N/A';
            if (item.type === 'Coffee' || item.type === 'Chocolate Drinks' || item.type === 'Teas') {
                const selectedMilk = item.milk || '';
                milkCell = `
                    <select class="milk-selector" onchange="updateItemMilk('${item.name}', this.value)">
                        <option value="" ${selectedMilk === '' ? 'selected' : ''}>None</option>
                        <option value="full cream" ${selectedMilk === 'full cream' ? 'selected' : ''}>Full Cream</option>
                        <option value="skinny milk" ${selectedMilk === 'skinny milk' ? 'selected' : ''}>Skinny Milk</option>
                        <option value="oat milk" ${selectedMilk === 'oat milk' ? 'selected' : ''}>Oat Milk</option>
                        <option value="soy milk" ${selectedMilk === 'soy milk' ? 'selected' : ''}>Soy Milk</option>
                        <option value="almond milk" ${selectedMilk === 'almond milk' ? 'selected' : ''}>Almond Milk</option>
                        <option value="lactose free" ${selectedMilk === 'lactose free' ? 'selected' : ''}>Lactose Free</option>
                    </select>
                `;
            }
            
            // Create syrup selector if item supports syrup
            let syrupCell = 'N/A';
            if (item.type === 'Coffee' || item.type === 'Chocolate Drinks' || item.type === 'Teas') {
                const selectedSyrup = item.syrup || '';
                syrupCell = `
                    <select class="milk-selector" onchange="updateItemSyrup('${item.name}', this.value)">
                        <option value="" ${selectedSyrup === '' ? 'selected' : ''}>No</option>
                        <option value="vanilla syrup" ${selectedSyrup === 'vanilla syrup' ? 'selected' : ''}>Vanilla Syrup</option>
                        <option value="caramel syrup" ${selectedSyrup === 'caramel syrup' ? 'selected' : ''}>Caramel Syrup</option>
                        <option value="almond syrup" ${selectedSyrup === 'almond syrup' ? 'selected' : ''}>Almond Syrup</option>
                        <option value="honey" ${selectedSyrup === 'honey' ? 'selected' : ''}>Honey</option>
                        <option value="sweetener" ${selectedSyrup === 'sweetener' ? 'selected' : ''}>Equal Sweetener</option>
                    </select>
                `;
            }
            
            row.innerHTML = `
                <td><img src="../image/${item.image}" alt="${item.name}" class="menu-item-image"></td>
                <td>${item.name}</td>
                <td class="price-cell">$${price}</td>
                <td>${sizeCell}</td>
                <td>${milkCell}</td>
                <td>${syrupCell}</td>
            `;
            tableBody.appendChild(row);
        });
        
        // Update pagination display
        updatePaginationDisplay();
    }

    // Calculate item price based on size, milk, and syrup
    function calculateItemPrice(item) {
        let basePrice = 0;
        
        // Get base price based on size
        if (item.pricelarge && item.pricemedium && item.pricesmall) {
            // Item has size-based pricing
            switch (item.size) {
                case 'large':
                    basePrice = parseFloat(item.pricelarge);
                    break;
                case 'medium':
                    basePrice = parseFloat(item.pricemedium);
                    break;
                case 'small':
                    basePrice = parseFloat(item.pricesmall);
                    break;
                default:
                    basePrice = parseFloat(item.pricemedium); // Default to medium
            }
        } else if (item.price) {
            // Item has fixed pricing
            basePrice = parseFloat(item.price);
        } else if (item.price2 && item.price4 && item.price6 && item.price8) {
            // Item has quantity-based pricing (like dim sum)
            switch (item.size) {
                case 'size2':
                    basePrice = parseFloat(item.price2);
                    break;
                case 'size4':
                    basePrice = parseFloat(item.price4);
                    break;
                case 'size6':
                    basePrice = parseFloat(item.price6);
                    break;
                case 'size8':
                    basePrice = parseFloat(item.price8);
                    break;
                default:
                    basePrice = parseFloat(item.price2); // Default to 2 pcs
            }
        } else {
            return 'N/A';
        }
        
        // Add milk surcharge (+$1 for alternative milk)
        if (item.milk && (item.milk === 'oat milk' || item.milk === 'soy milk' || 
            item.milk === 'almond milk' || item.milk === 'lactose free')) {
            basePrice += 0.5;
        }
        
        // Add syrup surcharge (+$1 for syrup)
        if (item.syrup && (item.syrup === 'vanilla syrup' || item.syrup === 'caramel syrup' || 
            item.syrup === 'almond syrup' || item.syrup === 'honey' || item.syrup === 'sweetener')) {
            basePrice += 0.5;
        }
        
        return basePrice.toFixed(2);
    }

    // Pagination functions
    function changePage(page) {
        currentPage = page;
        displayMenuItems();
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            displayMenuItems();
        }
    }

    function nextPage() {
        const totalPages = Math.ceil(filteredMenuItems.length / pageSize);
        if (currentPage < totalPages) {
            currentPage++;
            displayMenuItems();
        }
    }

    function updatePaginationDisplay() {
        const paginationContainer = document.getElementById('menuPagination');
        if (!paginationContainer) return;
        
        const totalPages = Math.ceil(filteredMenuItems.length / pageSize);
        
        let paginationHTML = `
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <button class="page-link" onclick="prevPage()" ${currentPage === 1 ? 'disabled' : ''}>Prev</button>
            </li>
        `;
        
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
                <li class="page-item ${currentPage === i ? 'active' : ''}">
                    <button class="page-link" onclick="changePage(${i})">${i}</button>
                </li>
            `;
        }
        
        paginationHTML += `
            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <button class="page-link" onclick="nextPage()" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
            </li>
        `;
        
        paginationContainer.innerHTML = paginationHTML;
    }

    // Update item properties and recalculate prices
    function updateItemSize(itemName, newSize) {
        const item = menuItems.find(menuItem => menuItem.name === itemName);
        if (item) {
            item.size = newSize;
            displayMenuItems(); // Refresh display with new prices
        }
    }

    function updateItemMilk(itemName, newMilk) {
        const item = menuItems.find(menuItem => menuItem.name === itemName);
        if (item) {
            item.milk = newMilk;
            displayMenuItems(); // Refresh display with new prices
        }
    }

    function updateItemSyrup(itemName, newSyrup) {
        const item = menuItems.find(menuItem => menuItem.name === itemName);
        if (item) {
            item.syrup = newSyrup;
            displayMenuItems(); // Refresh display with new prices
        }
    }

    // Setup menu filters
    function setupMenuFilters() {
        const typeFilters = document.getElementById('typeFilters');
        if (!typeFilters) return;

        // Get unique types
        const types = [...new Set(menuItems.map(item => item.type))];
        
        types.forEach(type => {
            const button = document.createElement('button');
            button.className = 'filter-btn';
            button.textContent = type;
            button.onclick = () => filterByType(type);
            typeFilters.appendChild(button);
        });

        // Setup search functionality
        const searchInput = document.getElementById('menuSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', filterBySearch);
        }
    }

    // Filter by type
    function filterByType(type) {
        filteredMenuItems = menuItems.filter(item => item.type === type);
        currentPage = 1; // Reset to first page when filtering
        displayMenuItems();
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent === type) {
                btn.classList.add('active');
            }
        });
    }

    // Filter by search
    function filterBySearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        filteredMenuItems = menuItems.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.type.toLowerCase().includes(searchTerm)
        );
        currentPage = 1; // Reset to first page when searching
        displayMenuItems();
    }

    // View Menu Modal functions
    function openViewMenuModal() {
        const modal = document.getElementById('viewMenuModal');
        if (modal) {
            modal.style.display = 'block';
            loadMenuData();
        }
    }

    function closeViewMenuModal() {
        const modal = document.getElementById('viewMenuModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Set up event listeners after all functions are defined
    const membershipBtn = document.getElementById("manageMembershipBtn");
    const viewMenuBtn = document.getElementById("viewMenuBtn");
    
    if (membershipBtn) {
        membershipBtn.addEventListener("click", () => {
            openMembershipModal();
        });
    }
    
    if (viewMenuBtn) {
        viewMenuBtn.addEventListener("click", () => {
            openViewMenuModal();
        });
    }
});
