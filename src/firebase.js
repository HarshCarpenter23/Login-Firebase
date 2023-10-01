// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvltYjvCt9un4GkWkvqexihkI_7MEUdwY",
  authDomain: "login-check-f9f96.firebaseapp.com",
  projectId: "login-check-f9f96",
  storageBucket: "login-check-f9f96.appspot.com",
  messagingSenderId: "184722019709",
  appId: "1:184722019709:web:e70d1cb2a1499cfe2ae814",
  measurementId: "G-Z5S2Z9HZTN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app