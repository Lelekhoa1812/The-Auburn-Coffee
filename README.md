# The Auburn Coffee ☕  
*A seamless ordering experience for commuters and coffee lovers!*  

The Auburn Coffee web application is built to provide a smooth and efficient ordering experience, allowing customers to browse the menu, pre-order drinks and food, and receive real-time updates on their orders. The staff at Auburn Coffee can manage and prepare orders efficiently with a dedicated staff dashboard.  

🚆 Located at Auburn Station, VIC 3123, we serve commuters daily, ensuring that their coffee is ready the moment they arrive—just **grab and go!**  

---

## 🌟 Features Overview  
### 🔹 Customer Features:  
- **Home Page** 🏡: View the **full menu**, pricing, discounts, and available options. The interactive page includes **draggable animation** that smoothly redirects customers to the Pre-order page.  
- **About Page** ℹ️: Learn about the café’s background, community values, and location. Customers can also **leave feedback and rate their experience**, which is stored in Firebase for future improvements.  
- **Ingredient Page** 🥑🥛☕: Get insights into the high-quality ingredients used at Auburn Coffee, ensuring transparency and trust with customers.  
- **Pre-Order Page** 🛍️: Customers can **place and modify** their orders in real-time, with direct data connection to staff preparing their drinks.  
- **Loyalty Program** 🎟️: Customers can **create an account**, which generates a unique **QR code**. Staff members will **scan the QR code** each time a customer makes a purchase, adding to their loyalty streak. After **10 purchases**, the customer **earns a free drink** as a reward.

### 🔹 Staff Features:  
- **Staff Order Page** 🏪: Designed for baristas, this page allows them to **track incoming orders in real-time** with details such as customer name, estimated arrival time, order details, and special notices.  
- **Statistics Page** 📊: The collected **feedback and ratings** from customers are visualized using Firebase, allowing the café to analyze customer satisfaction trends.  
- **Loyalty System** 📷: Staff can **scan customer QR codes** to track their purchase streaks and reward loyal customers with **free drinks** after every 10 purchases.

---

## 🛠️ Technology Stack  
- **Frontend:** VueJS (for dynamic, reactive UI interactions)  
- **Backend:** NodeJS hosted on Vercel (for efficient API handling)  
- **Database:** MongoDB (for order and menu management)  
- **Feedback & Ratings Storage:** Firebase  

---

## 📂 Project Directory Setup  
```plaintext
Auburn Coffee 2.0/
# BACKEND
├── api/
│   ├── index.js           # Server on port 3000 or Vercel
│   ├── routes/
│      ├── itemRoutes.js
│      ├── orderRoutes.js
│      ├── staffRoutes.js
│      ├── userRoutes.js
│   ├── models/
│      ├── item.js
│      ├── order.js
│      ├── staff.js
│      ├── user.js
## ENVIRONMENT
│   ├── node_modules/
│   ├── .env               # MongoDB environment
│   ├── vercel.json        # Vercel configuration on server-side
│   ├── package.json
│   ├── package-lock.json
## OTHERS
│   ├── view-data.js       # Fetch all collection with detailed data in MongoDB
│   ├── clear-table.js     # Clear all collection from a given MongoDB table
# REDIRECTION
├── index.html             # Redirection
├── redirect.css
# FRONTEND
├── static/
│   ├── image/             # Web content images
│   ├── products/          # Serving products images
## HOME/ABOUT/INGREDIENT
│   ├── home.html
│   ├── about.html
│   ├── ingredient.html
│   ├── app.js
│   ├── modal.js           # External events (survey, employment discount, freebies ☕)
│   ├── draggable.js
│   ├── index.css
│   ├── draggable.css
## PRE-ORDER
│   ├── pre-order.html
│   ├── pre-order.js
│   ├── pre-order.css
│   ├── problem.js         # User send problem request
│   ├── problem.css
## STAFF-ORDER
│   ├── staff-order.html
│   ├── staff-order.js
│   ├── staff-order.css
## LOYALTY
│   ├── loyalty.html
│   ├── loyalty.js
│   ├── loyalty.css
## FIREBASE
│   ├── firebaseInit.js    # Firebase server handling feedback and rating
## OTHERS
│   ├── statistics.html    # Fetch data from Firebase for business insight
│   ├── vue.js             # Utilities of VueJS
│   ├── vercel.json        # Vercel configuration on client-side
```

---

## 📌 **Live Demonstration**  
🚀 Accessible via: [Auburn Coffee Web App](https://lelekhoa1812.github.io/The-Auburn-Coffee/)  

### 🌐 **Direct Access to Vercel Hosting:**  
- **🏠 [Main Page](https://the-auburn-coffee.vercel.app/home.html)** - Explore the menu and app overview  
- **⭐ [Customer Feedback & Statistics](https://the-auburn-coffee.vercel.app/statistics.html)** - View customer insights  
- **👨‍🍳 [Staff Order Dashboard](https://the-auburn-coffee.vercel.app/staff-order.html)** - Track live orders  

---

### 🤝 **Contributors**  
**Liam**, a passionate barista at Auburn Coffee, contributed to building this web application to enhance the customer experience and optimize order management for the staff.  

📍 *See you at Auburn Station!* 🚆 ☕