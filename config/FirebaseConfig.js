// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "petadopter-15f93.firebaseapp.com",
  projectId: "petadopter-15f93",
  storageBucket: "petadopter-15f93.appspot.com",
  messagingSenderId: "544637605883",
  appId: "1:544637605883:web:990907dde3b7b485df5d5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const DB=getFirestore(app)
export const storage=getStorage(app)