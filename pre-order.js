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
                { "name": "Muffin", "image": "muffin.jpg", "type" : "Snacks", "price" : "4.7"},
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
            order: [], // Stores the user's selected items
            customerName: '',
            etaInput: '',
            orderNotice: '',
            isStudent: false,
            pageSize: 6,
            currentPage: 1,
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
            ]
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
            console.log("Query: ", query)
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
    },
    methods: {
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
        changePage(page) {
            if (page > 0 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        // filterItemsBySearch() {
        //     this.currentPage = 1; // Reset to the first page on new search
        // },
        async completeOrder() {
            const totalPrice = this.order.reduce((acc, item) => acc + item.total_price, 0);
            const orderData = {
                customer_name: this.customerName,
                order_time: new Date().toLocaleString(),
                order_eta: this.etaInput || null,
                order_status: 'Pending',
                total_price: totalPrice,
                order_notice: this.orderNotice || null,
            };

            try {
                const orderResponse = await fetch('http://localhost:5000/api/orders/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderData),
                });
                const order = await orderResponse.json();

                for (const item of this.order) {
                    const itemData = { ...item, order_id: order.order_id };
                    await fetch('http://localhost:5000/api/items/add', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(itemData),
                    });
                }

                alert('Order completed successfully!');
                this.order = [];
            } catch (error) {
                console.error('Error completing order:', error);
            }
        }
    },
});

app.mount('#app');
