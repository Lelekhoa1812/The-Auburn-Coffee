# The-Auburn-Coffee
Website to the Auburn Coffee's menu items and prices.
The cafe locates at Auburn station, VIC 3123.
We are happy to serve Victorian transport commuters as always and everyday, see you guys.

---
## Directory Setup
```plaintext
Auburn Coffee 2.0/
# BACKEND
├── api/
│   ├── index.js           # Server on port 5002 or Vercel
│   ├── routes/
│      ├── itemRoutes.js
│      ├── orderRoutes.js
│      ├── staffRoutes.js
│   ├── models/
│      ├── item.js
│      ├── order.js
│      ├── staff.js
## ENVIRONMENT
│   ├── node_modules/
│   ├── .env               # MongoDB environment
│   ├── vercel.json        # Vercel configuration on server-side
│   ├── package.json
│   ├── package-lock.json
## OTHERS
│   ├── view-data.js       # Fetch all data in MongoDB
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
│   ├── modal.js
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
│   ├── vercel.json        # Vercel configuration on client-side
## FIREBASE
│   ├── firebaseInit.js    # Firebase server handling feedback and ratting
## OTHERS
│   ├── statistics.html    # Fetch data from Firebase for business insight
│   ├── vue.js             # Utilities of VueJS
```

---

**Liam**, barista staff contribute to this.  
Accessible via: https://lelekhoa1812.github.io/The-Auburn-Coffee/

---

**Direct Access to Vercel server:**
[Main Page](https://the-auburn-coffee.vercel.app/)  
[For Rating and Feedback Statistics](https://the-auburn-coffee.vercel.app/statistics.html)  