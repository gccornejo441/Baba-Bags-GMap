// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASEAPI,
  authDomain: "baba-bags-giftbags.firebaseapp.com",
  projectId: "baba-bags-giftbags",
  storageBucket: "baba-bags-giftbags.appspot.com",
  messagingSenderId: "178062327900",
  appId: "1:178062327900:web:a608c82dabbbbe63a9e699",
  measurementId: "G-1ZSEMXM3XY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);