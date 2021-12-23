// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVDS6qLaiquHOU59V79-d_qCcl1AsQUsU",
  authDomain: "easylearn-kyc.firebaseapp.com",
  projectId: "easylearn-kyc",
  storageBucket: "easylearn-kyc.appspot.com",
  messagingSenderId: "1088783415962",
  appId: "1:1088783415962:web:7c6709fb305c1fda46bd23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const storage = getStorage(app);
