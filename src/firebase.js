// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKWIX4gXiXXUY4mD6phG2pgsVuIaCoVSg",
  authDomain: "portfolio-d3320.firebaseapp.com",
  projectId: "portfolio-d3320",
  storageBucket: "portfolio-d3320.firebasestorage.app",
  messagingSenderId: "100799554873",
  appId: "1:100799554873:web:4d14a9185b0e8605b074e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db, addDoc, collection };
