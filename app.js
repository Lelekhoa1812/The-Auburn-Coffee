const app = Vue.createApp({
    data() {
        return { 
            selectType: [],
            selectedSize: [],
            selectedMilk: [],
            selectedSyrup: [],
            item: 
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
            pageSize: 10,
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
                { label: 'No', value: 'no' },
                { label: 'Vanilla Syrup', value: 'vanilla syrup' },
                { label: 'Caramel Syrup', value: 'caramel syrup' },
                { label: 'Almond Syrup', value: 'almond syrup' },
                { label: 'Honey', value: 'honey' },
                { label: 'Equal Sweetener', value: 'sweetener' }
            ],
        }
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
            if (this.selectType.length > 0) {
                return this.item.filter(item => this.selectType.includes(item.type));
            } 
            return this.item;
        },
        uniqueTypes() {
            const types = this.item.map(item => item.type);
            return [...new Set(types)];
        },
        updatedPrice2(){
            return this.paginatedItems.map(item => {
                if (this.isStudent) {
                    if (item.type === "Fruits"){
                        return "0.5";
                    }
                    else if (item.type === "Extras"){
                        return "0.5";
                    }
                    else if (item.name === "Shin Noodle Cup" || item.name === "Fantastic Noodle Cup" || item.name === "Mi Goreng Cup"){
                        return "3.0";
                    }
                    else if (item.name == "Dim Sum") {
                        switch (item.size) {
                                case 'size2':
                                    return item.price2 - 0.5;
                                case 'size4':
                                    return item.price4 - 0.5;
                                case 'size6':
                                    return item.price6 - 1.0;
                                case 'size8':
                                    return item.price8 - 1.0;
                                default:
                                    return item.price2; 
                        }
                    }
                    else {
                        return parseFloat(item.price) - 1.0;
                    }
                }
                else if (!this.isStudent) {
                    if (item.name == "Dim Sum") {
                        switch (item.size) {
                                case 'size2':
                                    return item.price2;
                                case 'size4':
                                    return item.price4;
                                case 'size6':
                                    return item.price6;
                                case 'size8':
                                    return item.price8;
                                default:
                                    return item.price2;
                        }
                    }
                    return parseFloat(item.price);
                }
            });
        },
        updatedPrice() {
            return this.paginatedItems.map(item => {
                if (this.isStudent) {
                    if ((item.milk === "oat milk" || item.milk === "soy milk" || item.milk === "almond milk" || item.milk === "lactose free") && 
                        (item.syrup !== "vanilla syrup" && item.syrup !== "caramel syrup" && item.syrup !== "almond syrup" && item.syrup !== "honey" && item.syrup !== "sweetener")) {
                        // If only milk, add 0.5
                        switch (item.size) {
                            case 'large':
                                return parseFloat(item.pricelarge) - 0.5;
                            case 'medium':
                                return parseFloat(item.pricemedium) - 0.5;
                            case 'small':
                                return parseFloat(item.pricesmall) - 0.5;
                            default:
                                return parseFloat(item.price);
                        }
                    }
                    else if ((item.syrup === "vanilla syrup" || item.syrup === "caramel syrup" || item.syrup === "almond syrup" || item.syrup === "honey"|| item.syrup === "sweetener") &&
                            (item.milk !== "oat milk" && item.milk !== "soy milk" && item.milk !== "almond milk" && item.milk !== "lactose free")) {
                        // If only syrups, add 0.5
                        switch (item.size) {
                            case 'large':
                                return parseFloat(item.pricelarge) - 0.5;
                            case 'medium':
                                return parseFloat(item.pricemedium) - 0.5;
                            case 'small':
                                return parseFloat(item.pricesmall) - 0.5;
                            default:
                                return parseFloat(item.price);
                        }
                    }
                    else if ((item.syrup === "vanilla syrup" || item.syrup === "caramel syrup" || item.syrup === "almond syrup" || item.syrup === "honey"|| item.syrup === "sweetener") &&
                            (item.milk === "oat milk" || item.milk === "soy milk" || item.milk === "almond milk" || item.milk === "lactose free")) {
                        // If both milk and syrups, add 1.0
                        switch (item.size) {
                            case 'large':
                                return parseFloat(item.pricelarge);
                            case 'medium':
                                return parseFloat(item.pricemedium);
                            case 'small':
                                return parseFloat(item.pricesmall);
                            default:
                                return parseFloat(item.price);
                        }
                    }
                    else {
                        switch (item.size) {
                            case 'large':
                                return item.pricelarge - 1.0;
                            case 'medium':
                                return item.pricemedium- 1.0;
                            case 'small':
                                return item.pricesmall- 1.0;
                            default:
                                return item.price;
                        }
                    }
                }
                if (!this.isStudent) {
                    if ((item.milk === "oat milk" || item.milk === "soy milk" || item.milk === "almond milk" || item.milk === "lactose free") && 
                        (item.syrup !== "vanilla syrup" && item.syrup !== "caramel syrup" && item.syrup !== "almond syrup" && item.syrup !== "honey" && item.syrup !== "sweetener")) {
                        // If only milk, add 0.5
                        switch (item.size) {
                            case 'large':
                                return parseFloat(item.pricelarge) + 0.5;
                            case 'medium':
                                return parseFloat(item.pricemedium) + 0.5;
                            case 'small':
                                return parseFloat(item.pricesmall) + 0.5;
                            default:
                                return parseFloat(item.price);
                        }
                    }
                    else if ((item.syrup === "vanilla syrup" || item.syrup === "caramel syrup" || item.syrup === "almond syrup" || item.syrup === "honey" || item.syrup === "sweetener") &&
                            (item.milk !== "oat milk" && item.milk !== "soy milk" && item.milk !== "almond milk" && item.milk !== "lactose free")) {
                        // If only syrups, add 0.5
                        switch (item.size) {
                            case 'large':
                                return parseFloat(item.pricelarge) + 0.5;
                            case 'medium':
                                return parseFloat(item.pricemedium) + 0.5;
                            case 'small':
                                return parseFloat(item.pricesmall) + 0.5;
                            default:
                                return parseFloat(item.price);
                        }
                    }
                    else if ((item.syrup === "vanilla syrup" || item.syrup === "caramel syrup" || item.syrup === "almond syrup" || item.syrup === "honey" || item.syrup === "sweetener") &&
                            (item.milk === "oat milk" || item.milk === "soy milk" || item.milk === "almond milk" || item.milk === "lactose free")) {
                        // If both milk and syrups, add 1.0
                        switch (item.size) {
                            case 'large':
                                return parseFloat(item.pricelarge) + 1.0;
                            case 'medium':
                                return parseFloat(item.pricemedium) + 1.0;
                            case 'small':
                                return parseFloat(item.pricesmall) + 1.0;
                            default:
                                return parseFloat(item.price);
                        }
                    }
                    else {
                        switch (item.size) {
                            case 'large':
                                return item.pricelarge;
                            case 'medium':
                                return item.pricemedium;
                            case 'small':
                                return item.pricesmall;
                            default:
                                return item.price;
                        }
                    }
                }
            });
        }
    },
    methods: {
        // async fetchMenuItems() {
        //     try {
        //         const response = await fetch('/item.json'); // Fetch from item.json
        //         this.items = await response.json();
        //     } catch (error) {
        //         console.error('Error fetching menu items:', error);
        //     }
        // },
        changePage(page) {
            this.currentPage = page;
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        isSizeSelectable(item) {
            const type = item.type.toLowerCase();
            return ['coffee', 'chocolate drinks', 'teas'].includes(type);
        },
        isSizeSelectableDimSum(item) {
            const name = item.name.toLowerCase();
            return ['dim sum'].includes(name);
        },
        isNotSizeSelected(item) {
            return item.size != 'small' && item.size != 'medium' && item.size != 'large';
        },
        isMilkSelectable(item) {
            const type = item.type.toLowerCase();
            return ['coffee', 'chocolate drinks'].includes(type);
        },
        isSyrupSelectable(item) {
            const type = item.type.toLowerCase();
            return ['coffee', 'chocolate drinks'].includes(type);
        },
        isPriceSelectable(item) {
            const type = item.type.toLowerCase();
            return ['coffee', 'chocolate drinks', 'teas'].includes(type);
        }
    },
    // mounted() {
    //     this.fetchMenuItems(); // Fetch menu items on load
    // }
});
app.mount("#app"); 
