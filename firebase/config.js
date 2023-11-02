import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCuXea5sbIDFUMtsc_eGuADpsk4GF-iyCo",
    authDomain: "merksalud-85bc3.firebaseapp.com",
    projectId: "merksalud-85bc3",
    storageBucket: "merksalud-85bc3.appspot.com",
    messagingSenderId: "928372262904",
    appId: "1:928372262904:web:3015d66cb661d46c88780d",
    measurementId: "G-2Q5F78XB2M"
  };

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );