// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyChVF018qSBsZwRi8uLCghQyUaQcDAjCwE",
  authDomain: "md-variasi.firebaseapp.com",
  projectId: "md-variasi",
  storageBucket: "md-variasi.appspot.com",
  messagingSenderId: "974441383222",
  appId: "1:974441383222:web:dcb82ca906b051d6389f97",
  measurementId: "G-WMDQDL7829"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app
