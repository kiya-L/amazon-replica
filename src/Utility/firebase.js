import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJty1QneBrMKD8IflirZvl5INnTm2HzA0",
  authDomain: "replica-3bb30.firebaseapp.com",
  projectId: "replica-3bb30",
  storageBucket: "replica-3bb30.appspot.com",
  messagingSenderId: "746068323611",
  appId: "1:746068323611:web:01d40c301351efea79b7be",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=app.firestore()