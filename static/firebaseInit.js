import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
// All Firebase configs 
const firebaseConfig = {
    apiKey: "AIzaSyDM2V0ydr3kFL3UP1vqjIGl3o8mMS2mjYw",
    authDomain: "the-auburn-coffee.firebaseapp.com",
    projectId: "the-auburn-coffee",
    storageBucket: "the-auburn-coffee.appspot.com",
    messagingSenderId: "522423593553",
    appId: "1:522423593553:web:20b9cfbd18df09e22a6670",
    measurementId: "G-1TY2HBT6W7"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get Firestore instance
const db = getFirestore(app);
// Export
export { db };
