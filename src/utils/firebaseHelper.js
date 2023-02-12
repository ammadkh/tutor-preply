// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

export const getFirebaseApp = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCSj6TakRqdxA-AGFUMoRSCvqjfQcA4fW0",
    authDomain: "view-preply-2.firebaseapp.com",
    projectId: "view-preply-2",
    storageBucket: "view-preply-2.appspot.com",
    messagingSenderId: "350417072763",
    appId: "1:350417072763:web:d725f47416c8a2eddee8de",
    measurementId: "G-YEM5NPXKC2",
  };
  return initializeApp(firebaseConfig);
};
