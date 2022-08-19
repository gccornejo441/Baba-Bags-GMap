// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3VCDaWLypkC2vOX_P4J4v-IvhuxadC2k",
  authDomain: "baba-bags-maps.firebaseapp.com",
  projectId: "baba-bags-maps",
  storageBucket: "baba-bags-maps.appspot.com",
  messagingSenderId: "81620081192",
  appId: "1:81620081192:web:4f17c4877038489d58b31d",
  measurementId: "G-NVX946D2PZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);