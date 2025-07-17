// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqIu7GWvpXptd6KrNvehzkj0d0YBcQOXU",
  authDomain: "spendsmart-9961e.firebaseapp.com",
  projectId: "spendsmart-9961e",
  storageBucket: "spendsmart-9961e.firebasestorage.app",
  messagingSenderId: "1092253832894",
  appId: "1:1092253832894:web:186cf6996e67b9e7d9f0ef",
  measurementId: "G-PMYTYQ0F70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize and export Firebase Auth
export const auth = getAuth(app);