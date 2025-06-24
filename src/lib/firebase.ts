// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAUneqSSvP5_SlMcSZw2lWFZmjutEbq4fI",
    authDomain: "gamemate-final.firebaseapp.com",
    projectId: "gamemate-final",
    storageBucket: "gamemate-final.firebasestorage.app",
    messagingSenderId: "9546524721",
    appId: "1:9546524721:web:14e18a2c50cd4311ae4d10",
    measurementId: "G-7RMS0K49SQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;