// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1wpKqXAef1JEmNqiOCSjWSyPGGJLaj10",
  authDomain: "mercado-pulgas.firebaseapp.com",
  projectId: "mercado-pulgas",
  storageBucket: "mercado-pulgas.firebasestorage.app",
  messagingSenderId: "26645358092",
  appId: "1:26645358092:web:93e3f0efef555163127029"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
export {db, auth}