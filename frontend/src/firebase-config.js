// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDAHC0RFAnha6bjDTMZ-dfcRtu5mZUaiM",
  authDomain: "quizify-ada4f.firebaseapp.com",
  projectId: "quizify-ada4f",
  storageBucket: "quizify-ada4f.firebasestorage.app",
  messagingSenderId: "390231615278",
  appId: "1:390231615278:web:aee2b26da1cb051e21bcbf",
  measurementId: "G-QN4PD8TCYN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
