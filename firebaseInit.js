import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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
export const db = getFirestore(app);
