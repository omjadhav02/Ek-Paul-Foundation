// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB30litKscg3Zr5rjab5_lcan_ohkXs5rA",
  authDomain: "ek-paul-foundation-7b0f5.firebaseapp.com",
  projectId: "ek-paul-foundation-7b0f5",
  storageBucket: "ek-paul-foundation-7b0f5.firebasestorage.app",
  messagingSenderId: "526563659869",
  appId: "1:526563659869:web:4118ecc9eb7650c4c2fdb4",
  measurementId: "G-42RZ22WPMM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);