import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyA4UKc5-_3-ESNQQMe0s8C0aRvC46MWWXQ",
  authDomain: "findfunapp-8b78e.firebaseapp.com",
  databaseURL: "https://findfunapp-8b78e.firebaseio.com",
  projectId: "findfunapp-8b78e",
  storageBucket: "findfunapp-8b78e.appspot.com",
  messagingSenderId: "80846809001",
  appId: "1:80846809001:web:8fbacef481b5330a5186b8",
  measurementId: "G-DBLH5SV4TT"
};

export const Firebase = firebase.initializeApp(firebaseConfig);
const baseDb = Firebase.firestore();
export const Database = baseDb;
export const Storage = Firebase.storage();
export const TimeStamp = () => firebase.firestore.FieldValue.serverTimestamp();
export const TimeStampNow = () => firebase.firestore.Timestamp.now().toMillis();
