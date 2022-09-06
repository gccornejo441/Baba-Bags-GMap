// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, CollectionReference, getFirestore, DocumentData } from 'firebase/firestore';
import { Coordinate } from "@/types";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjW8HUx8H8zRfJsUCGokM7wewymsxUCxw",
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


const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(database, collectionName) as CollectionReference<T>
}


// export all your collections
export const coordinatesCol = createCollection<Coordinate>('coordinate')