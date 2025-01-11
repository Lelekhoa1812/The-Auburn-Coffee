import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
<<<<<<< HEAD
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
=======
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
>>>>>>> 2cea342 (Update pricing 2025)

const firebaseConfig = {
    apiKey: "AIzaSyDM2V0ydr3kFL3UP1vqjIGl3o8mMS2mjYw",
    authDomain: "the-auburn-coffee.firebaseapp.com",
    projectId: "the-auburn-coffee",
    storageBucket: "the-auburn-coffee.appspot.com",
    messagingSenderId: "522423593553",
    appId: "1:522423593553:web:20b9cfbd18df09e22a6670",
    measurementId: "G-1TY2HBT6W7"
};

const app = initializeApp(firebaseConfig);
<<<<<<< HEAD
// const analytics = getAnalytics(app);
=======
const analytics = getAnalytics(app);
>>>>>>> 2cea342 (Update pricing 2025)
export const db = getFirestore(app);
