const app = Vue.createApp({
    data() {
        return {
            selectType: [],
            selectedSize: [],
            selectedMilk: [],
            selectedSyrup: [],
            searchQuery: '', // User's input for search
            items: 
            [
                { "name": "Latte", "image": "latte.webp", "type" : "Coffee", "pricelarge" : "6.0", "pricemedium" : "5.5", "pricesmall" : "4.7" },
                { "name": "Cappuccino", "image": "cappuccino.jpeg", "type" : "Coffee", "pricelarge" : "6.0", "pricemedium" : "5.5", "pricesmall" : "4.7" },
                { "name": "Flat White", "image": "flatwhite.jpeg", "type" : "Coffee", "pricelarge" : "6.0", "pricemedium" : "5.5", "pricesmall" : "4.7" },
                { "name": "Long Black", "image": "longblack.webp", "type" : "Coffee", "pricelarge" : "6.0", "pricemedium" : "5.5", "pricesmall" : "4.7" },
                { "name": "Mocha", "image": "mocha.webp", "type" : "Coffee", "pricelarge" : "6.0", "pricemedium" : "5.5", "pricesmall" : "4.7" },
                { "name": "Espresso", "image": "espresso.jpeg", "type" : "Coffee", "pricelarge" : "6.0", "pricemedium" : "5.5", "pricesmall" : "4.7" },
                { "name": "Macchiato", "image": "macchiato.webp", "type" : "Coffee", "pricelarge" : "6.0", "pricemedium" : "5.5", "pricesmall" : "4.7" },
                { "name": "Dirty Chai", "image": "dirtychai.jpeg", "type" : "Coffee", "pricelarge" : "6.5", "pricemedium" : "6.0", "pricesmall" : "5.5" },
                { "name": "Piccolo", "image": "piccolo.jpeg", "type" : "Coffee", "pricelarge" : "6.0", "pricemedium" : "5.5", "pricesmall" : "4.7" },
                { "name": "Iced Coffee", "image": "iced.jpeg", "type" : "Coffee", "pricelarge" : "6.5", "pricemedium" : "6.0", "pricesmall" : "5.5" },
                { "name": "Hot Vietnamese Coffee", "image": "hotvn.jpeg", "type" : "Coffee", "pricelarge" : "6.5", "pricemedium" : "6.0", "pricesmall" : "5.5" },
                { "name": "Iced Vietnamese Coffee", "image": "icevn.jpeg", "type" : "Coffee", "pricelarge" : "7.0", "pricemedium" : "6.5", "pricesmall" : "6.0" },
                { "name": "Muffin", "image": "muffin.jpg", "type" : "Snacks", "price" : "4.5"},
                { "name": "Lemon Tart", "image": "tart.jpg", "type" : "Snacks", "price" : "3.0"},
                { "name": "Gippsland Yogurt", "image": "yogurt.jpeg", "type" : "Snacks", "price" : "4.7"},
                { "name": "Cheesy Crackers", "image": "cracker.jpeg", "type" : "Snacks", "price" : "4.7"},
                { "name": "Mint", "image": "mint.jpeg", "type" : "Snacks", "price" : "4.0"},
                { "name": "Gum", "image": "gum.jpeg", "type" : "Snacks", "price" : "4.0"},
                { "name": "Carman Nut Bars", "image": "nutbar.jpg", "type" : "Snacks", "price" : "4.7"},
                { "name": "Chocolate Bar", "image": "choco.jpeg", "type" : "Snacks", "price" : "3.0"},
                { "name": "Sparkling Water", "image": "sparkling.jpeg", "type" : "Cans", "price" : "4.0"},
                { "name": "Coke", "image": "Coke.webp", "type" : "Cans", "price" : "3.0"},
                { "name": "Fanta", "image": "fanta.jpeg", "type" : "Cans", "price" : "3.0"},
                { "name": "Sprite", "image": "sprite.jpeg", "type" : "Cans", "price" : "3.0"},
                { "name": "Redbull Energy", "image": "redbull.jpeg", "type" : "Cans", "price" : "4.0"},
                { "name": "V Energy", "image": "venergy.jpeg", "type" : "Cans", "price" : "4.0"},
                { "name": "Water Bottle", "image": "water.jpeg", "type" : "Cans", "price" : "2.0"},
                { "name": "Hot Chocolate", "image": "hotchoco.webp", "type" : "Chocolate Drinks", "pricelarge" : "6.0", "pricemedium" : "5.5", "pricesmall" : "4.7" },
                { "name": "Cold Chocolate", "image": "coldchoco.jpeg", "type" : "Chocolate Drinks", "pricelarge" : "6.5", "pricemedium" : "6.0", "pricesmall" : "5.5" },
                { "name": "Babycino", "image": "hotchoco.webp", "type" : "Chocolate Drinks", "pricelarge" : "4.0", "pricemedium" : "3.5", "pricesmall" : "3.0" },
                { "name": "Meat Pie", "image": "meatpie.jpeg", "type" : "Meals", "price" : "6.0"},
                { "name": "Chicken Pie", "image": "chickenpie.jpeg", "type" : "Meals", "price" : "6.0"},
                { "name": "Dim Sum", "image": "dimsum.jpeg", "type" : "Meals", "price2" : "2.5", "price4" : "4.5", "price6" : "5.5", "price8" : "6.5"},
                { "name": "Shin Noodle Cup", "image": "shin.jpg", "type" : "Meals", "price" : "3.5"},
                { "name": "Fantastic Noodle Cup", "image": "fantastic.webp", "type" : "Meals", "price" : "3.5"},
                { "name": "Mi Goreng Cup", "image": "goreng.jpeg", "type" : "Meals", "price" : "3.5"},
                { "name": "Chai", "image": "chai.webp", "type" : "Teas", "pricelarge" : "6.0", "pricemedium" : "5.5", "pricesmall" : "4.7" },
                { "name": "Earl Grey Tea", "image": "earlgray.jpeg", "type" : "Teas", "pricelarge" : "5.0", "pricemedium" : "4.5", "pricesmall" : "4.0" },
                { "name": "English Breakfast Tea", "image": "englishbreakfast.jpeg", "type" : "Teas", "pricelarge" : "5.0", "pricemedium" : "4.5", "pricesmall" : "4.0" },
                { "name": "Green Tea", "image": "greentea.jpeg", "type" : "Teas", "pricelarge" : "5.0", "pricemedium" : "4.5", "pricesmall" : "4.0" },
                { "name": "Black Tea", "image": "blacktea.jpeg", "type" : "Teas", "pricelarge" : "5.0", "pricemedium" : "4.5", "pricesmall" : "4.0" },
                { "name": "Lemon Iced Tea", "image": "lemonice.jpeg", "type" : "Teas", "pricelarge" : "6.0", "pricemedium" : "5.5", "pricesmall" : "4.5" },
                { "name": "Green Apple", "image": "apple.jpeg", "type" : "Fruits", "price" : "1.0"},
                { "name": "Banana", "image": "banana.jpeg", "type" : "Fruits", "price" : "1.0"},
                { "name": "Extra Shot", "image": "shot.png", "type" : "Extras", "price" : "0.5"},
                { "name": "Decaf Coffee", "image": "shot.png", "type" : "Extras", "price" : "0.5"},
                { "name": "Extra Syrup", "image": "syrup.jpeg", "type" : "Extras", "price" : "0.5"}
            ],
            milks: [
                { label: 'Full Cream', value: 'full cream' },
                { label: 'Skinny Milk', value: 'skinny milk' },
                { label: 'Oat Milk', value: 'oat milk' },
                { label: 'Soy Milk', value: 'soy milk' },
                { label: 'Almond Milk', value: 'almond milk' },
                { label: 'Lactose Free', value: 'lactose free' }
            ],
            syrups: [
                { label: 'No Syrup', value: 'no' },
                { label: 'Vanilla Syrup', value: 'vanilla syrup' },
                { label: 'Caramel Syrup', value: 'caramel syrup' },
                { label: 'Almond Syrup', value: 'almond syrup' },
                { label: 'Honey', value: 'honey' },
                { label: 'Equal Sweetener', value: 'sweetener' }
            ],
            order: [], // Stores the user's selected items
            customerName: '',
            etaInput: '',
            orderNotice: '',
            isStudent: false,
            showModal: true, // Ensure name modal is displayed initially
            currentOrderId: null, // Store current order ID
            hoverItem: null, // Track which item is hovered
            isSubmitting: false,  // Prevent multiple clicks during request
            orderStatus: "New Order", // Default state before confirmation
            currentOrderStatusColor: "#5a3315", // Default color
            blinkInterval: null, // Set orderStatus blinking interval dynamically
            pageSize: 6,
            currentPage: 1
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.filteredItems.length / this.pageSize);
        },
        paginatedItems() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.filteredItems.slice(start, end);
        },
        filteredItems() {
            const query = this.searchQuery.toLowerCase();
            // console.log("Query: ", query)
            let items = this.items;
            // Filter by side navbar
            if (this.selectType.length > 0) {
                items = items.filter(item => this.selectType.includes(item.type));
            }
            // Filter with searchbar query
            if (query) {
                items = items.filter(item => item.name.toLowerCase().includes(query));
            }
            return items;
        },
        uniqueTypes() {
            return [...new Set(this.items.map(item => item.type))];
        },
        // Calculate total worth for an order by sum(item_price * quantity)
        orderTotal() {
            return this.order.reduce((acc, item) => acc + item.total_price, 0).toFixed(2);
        },
        // Assert if an order is editable if it is in Editing state
        canEditOrder() {
            return this.orderStatus === "Pending" || this.orderStatus === "Editing";
        },
        // Define target color for each status
        orderStatusColor() {
            const statusColors = {
                'New Order': '#858b13',
                'Pending': '#168275',
                'Editing': '#8c2b2b',
                'Received': '#7e136b',
                'Completed': '#124477',
                'Awaiting': '#000000'
            };
            return statusColors[this.orderStatus] || '#5a3315'; // Default color if not matched
        }
    },
    watch: {
        orderStatus(newStatus) {
            this.startBlinkingEffect();
        }
    },
    methods: {
        // Close modal and proceed if customer name is entered
        startOrder() {
            if (!this.customerName.trim()) {
                alert("Please enter your name before proceeding to pre-order.");
                return;
            }
            this.showModal = false;
        },
        isSizeSelectable(item) {
            return ['Coffee', 'Chocolate Drinks', 'Teas'].includes(item.type);
        },
        isSizeSelectableDimSum(item) {
            return item.name === 'Dim Sum';
        },
        isMilkandSyrupSelectableChai(item) {
            return item.name === 'Chai';
        },
        // Calculate general prices
        updatedPrice(item) {
            if (this.isStudent) {
                // Student Discounts
                if (item.type === "Fruits" || item.type === "Extras") {
                    return 0.5; // Fixed price for these types
                } else if (["Shin Noodle Cup", "Fantastic Noodle Cup", "Mi Goreng Cup"].includes(item.name)) {
                    return 3.0; // Fixed price for these items
                } else if (item.name === "Dim Sum") {
                    switch (item.size) {
                        case "size2": return item.price2 - 0.5;
                        case "size4": return item.price4 - 0.5;
                        case "size6": return item.price6 - 1.0;
                        case "size8": return item.price8 - 1.0;
                        default: return item.price2;
                    }
                } else {
                    let basePrice = parseFloat(item.price || item.pricelarge || 0) - 1.0;
                    return this.adjustMilkSyrupPrice(item, basePrice);
                }
            } else {
                // Non-student Pricing
                if (item.name === "Dim Sum") {
                    switch (item.size) {
                        case "size2": return item.price2;
                        case "size4": return item.price4;
                        case "size6": return item.price6;
                        case "size8": return item.price8;
                        default: return item.price2;
                    }
                }
                let basePrice = parseFloat(item.price || item.pricelarge || 0);
                return this.adjustMilkSyrupPrice(item, basePrice);
            }
        },
        adjustMilkSyrupPrice(item, basePrice) {
            // Adjust price based on milk and syrup combinations
            const milkExtra = ["oat milk", "soy milk", "almond milk", "lactose free"].includes(item.milk) ? 0.5 : 0.0;
            const syrupExtra = ["vanilla syrup", "caramel syrup", "almond syrup", "honey", "sweetener"].includes(item.syrup) ? 0.5 : 0.0;
            return basePrice + milkExtra + syrupExtra;
        },
        // Add that item on btn click with alert checker
        addItemToOrder(item) {
            // Alerts 
            if ((item.type === 'Coffee' || item.type === 'Chocolate Drinks' || item.type === 'Teas') && !item.size) {
                alert(`Please select a size for ${item.name}.`);
                return;
            }
            if (item.quantity <= 0 || !item.quantity ) {
                alert('Please specify a valid quantity.');
                return;
            }
            if (((item.type === 'Coffee' || item.type === 'Chocolate Drinks' || item.name === 'Chai') && !item.milk)) {
                alert(`Please select milk option for ${item.name}.`);
                return;
            }
            if (((item.type === 'Coffee' || item.type === 'Chocolate Drinks' || item.name === 'Chai') && !item.syrup)) {
                alert(`Please select syrup option for ${item.name}.`);
                return;
            }
            const price = this.updatedPrice(item);
            this.order.push({
                ...item,
                item_price: price,
                total_price: price * item.quantity
            });
        },
        // Toggle side bar (Filter by Type)
        toggleType(type) {
            if (this.selectType.includes(type)) {
                this.selectType = this.selectType.filter((t) => t !== type);
            } else {
                this.selectType.push(type);
            }
        },
        addHoverEffect(type) {
            this.hoverType = type; // Trigger hover effect
        },
        removeHoverEffect() {
            this.hoverType = null; // Remove hover effect
        },
        // Blinking effect for order-status
        startBlinkingEffect() {
            if (this.blinkInterval) clearInterval(this.blinkInterval); // Clear previous interval
            // Setter
            let defaultColor = "#5a3315";
            let targetColor = this.orderStatusColor;
            let toggle = false;
            // Set interval to toggle between default and target color
            this.blinkInterval = setInterval(() => {
                this.currentOrderStatusColor = toggle ? defaultColor : targetColor;
                toggle = !toggle;
            }, 400); // Toggle each 0.4s
        },
        getURL() {
            // Dynamic endpoint prefix on Vercel and local app deployment
            const BASE_URL = window.location.origin.includes("localhost")
            // ? "http://localhost:5002/api" // Local dev environment on NodeJS
            ? "http://localhost:3000/api" // Local dev environment by Vercel
            : "https://auburn-coffee-backend.vercel.app/api"; // Vercel backend            
            // const BASE_URL = "http://localhost:3000/api";
            return BASE_URL;
        },
        // Handle hover for add item btn
        handleHover(itemName) {
            // console.log(`${itemName} on hover.`);
            this.hoverItem = itemName; // Set hoverItem to the name of the hovered button's item
        },
        handleLeave() {
            this.hoverItem = null; // Reset hoverItem on mouse leave
        },
        // Pagination logics
        changePage(page) {
            if (page > 0 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        // Send DELETE request to backend to cancel the order
        async cancelOrder() {
            // Send Delete request
            if (confirm("Are you sure you want to cancel the entire order?")) {
                try {
                    const response = await fetch(`${this.getURL()}/orders/delete/${this.currentOrderId}`, {
                        method: 'DELETE',
                    });
                    if (!response.ok) {
                        throw new Error("Failed to cancel order.");
                    }
                }
                // Cannot connect to DB
                catch (error) {
                    console.error('Error cancelling order:', error);
                    alert('There was an issue cancelling your order. Please try again.');
                } 
                // Close order summary table
                const summary = document.querySelector('#orderSummary');
                if (summary) {
                    summary.classList.add('fade-out');
                    setTimeout(() => {
                        this.order = [];
                        this.orderStatus = "New Order";
                        this.currentOrderId = null;            
                    }, 500); // Match the CSS transition duration
                }
            }
        },   
        // Change order to Editing status on endpoint
        async editOrder() {
            if (this.orderStatus !== "Pending") return;
            // Connect to DB
            try {
                const response = await fetch(`${this.getURL()}/orders/${this.currentOrderId}/edit`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (!response.ok) {
                    throw new Error('Failed to update order status to Editing.');
                }
                const updatedOrder = await response.json();
                this.orderStatus = updatedOrder.order_status;
            } catch (error) {
                console.error("Error updating order to Editing:", error);
                alert("Error setting order to Editing. Please try again.");
            }
        },        
        // Fetch item in an order before updating
        async fetchOrderItems() {
            if (!this.currentOrderId) return;
            // Connect to DB to get all item with order_id
            try {
                const response = await fetch(`${this.getURL()}/items/by-order/${this.currentOrderId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch order items');
                }
                const items = await response.json();
                // Assign fetched items to the current order
                this.order = items.map(item => ({
                    item_id: item.item_id,
                    name: item.item_name,
                    size: item.item_size,
                    quantity: item.item_quantity,
                    item_price: item.item_price,
                    total_price: item.item_price * item.item_quantity,
                }));
            } catch (error) {
                console.error("Error fetching order items:", error);
            }
        },        
        // Send complete order json body to MongoDB
        async completeOrder() {
            if (!this.customerName.trim()) {
                alert("Your name cannot be empty. Please reload the page and input your name again!");
                return;
            }
            if (!this.etaInput.trim()) {
                alert("Please provide an estimated time of arrival. E.g., 8:30 AM or In the next 5 mins.");
                return;
            }
            if (this.isSubmitting) {
                console.warn("Request already in progress."); 
                return; // Prevent multiple clicks
            }
            this.isSubmitting = true; // Lock the button to prevent multiple submissions    
            const totalPrice = this.order.reduce((acc, item) => acc + item.total_price, 0);
            const orderData = {
                customer_name: this.customerName,
                order_time: new Date().toLocaleString(),
                order_eta: this.etaInput,
                order_status: 'Pending',
                total_price: totalPrice,
                order_notice: this.orderNotice || null,
                // item object
                items: this.order.map(item => ({
                    item_id: item.item_id || null, // Ensure `item_id` is passed correctly
                    order_id: this.currentOrderId,
                    item_name: item.name,
                    item_size: item.size || null,
                    item_quantity: item.quantity,
                    item_price: item.item_price
                }))
            };
            BASE_URL = this.getURL();
            // Try to send the JSON body to API before routing it to MongoDB
            try {
                // Attempt to dynamically Create or Update a query to API based on the order status
                let response;
                if (this.orderStatus === "New Order") {
                    response = await fetch(`${BASE_URL}/orders/add`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(orderData),
                    });
                } else if (this.orderStatus === "Editing") {
                    // Assert null order
                    if (!this.currentOrderId) {
                        alert("No order found to edit.");
                        return;
                    }
                    // Send order update with all item
                    response = await fetch(`${BASE_URL}/orders/update/${this.currentOrderId}`, {  
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(orderData),
                    });
                    // Request failed either by invalid orderStatus or connection error
                    if (!response.ok) {
                        throw new Error(`Request failed: ${response.statusText}`);
                    }
                }
                const order = await response.json(); // Send with await order request
                // console.log("Order response:", order);
                // Store order ID for future updates
                if (order.order_id) { this.currentOrderId = order.order_id; } 
                else if (order.updatedOrder.order_id) { this.currentOrderId = order.updatedOrder.order_id }
                else {alert("Cannot get order data, please try again"); return; }
                // After updating order, confirm order (set to Pending), connection to DB
                const confirmResponse = await fetch(`${BASE_URL}/orders/${this.currentOrderId}/confirm`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (!confirmResponse.ok) {
                    throw new Error(`Failed to confirm order: ${confirmResponse.statusText}`);
                }
                const confirmedOrder = await confirmResponse.json(); // Send with await order confirmation request
                this.orderStatus = confirmedOrder.order_status; // Update to Pending dynamically
                // Re-fetch order items to prevent clearing the order summary table
                await this.fetchOrderItems(); 
                // Show complete message
                alert('Order completed successfully!');
                this.orderStatus = "Pending"; // Change order status after confirming
            } catch (error) {
                console.error('Error completing order:', error);
                alert('There was an issue completing your order. Please try again.');
            } finally {
                this.isSubmitting = false; // Unlock the button after completion
            }
        }
    },
    mounted() {
        this.startBlinkingEffect(); // Start effect initially
        setTimeout(() => {
            app.orderStatus = "Editing";
        }, 10000);
    },
    beforeUnmount() {
        clearInterval(this.blinkInterval); // Prevent memory leaks
    }
});

app.mount('#app');
