// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt1Mw31odpqYNLDT1jLuTkSkVKPofZvz8",
  authDomain: "seeds-22950.firebaseapp.com",
  databaseURL: "https://seeds-22950-default-rtdb.firebaseio.com",
  projectId: "seeds-22950",
  storageBucket: "seeds-22950.appspot.com",
  messagingSenderId: "1033673740633",
  appId: "1:1033673740633:web:f35b5d08c36689355abc48",
  measurementId: "G-0CMZ1XC5HP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
