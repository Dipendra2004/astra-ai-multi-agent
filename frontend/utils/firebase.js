// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "astraai-1d27a.firebaseapp.com",
  projectId: "astraai-1d27a",
  storageBucket: "astraai-1d27a.firebasestorage.app",
  messagingSenderId: "912335481805",
  appId: "1:912335481805:web:e33ade61875497320e3284"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()