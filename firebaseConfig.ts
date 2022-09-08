// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, CollectionReference, getFirestore, DocumentData } from 'firebase/firestore';
import { Coordinate, Inputs } from "@/types";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByjZe7zSMCuZONQaTj20ZhXmw4QGAFCm0",
  authDomain: "baba-gift-wraps.firebaseapp.com",
  projectId: "baba-gift-wraps",
  storageBucket: "baba-gift-wraps.appspot.com",
  messagingSenderId: "230586496934",
  appId: "1:230586496934:web:6ee10b3fc5672780ce0167"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);


export const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(database, collectionName) as CollectionReference<T>
}


// export all your collections
export const coordinatesCol = createCollection<Coordinate>('coordinate')
