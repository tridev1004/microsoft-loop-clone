// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "loop-aaf75.firebaseapp.com",
  projectId: "loop-aaf75",
  storageBucket: "loop-aaf75.appspot.com",
  messagingSenderId: "16010156645",
  appId: "1:16010156645:web:7a035d2cb9731b6a34848c",
  measurementId: "G-CKGC52ET0G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
const analytics = getAnalytics(app);