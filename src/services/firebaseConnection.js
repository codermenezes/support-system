import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: "support-system-c2aab",
  storageBucket: "support-system-c2aab.appspot.com",
  messagingSenderId: "707914613240",
  appId: "1:707914613240:web:bfd92d97e0833b82c5960d",
  measurementId: "G-LREDTVXD19"
};
if (!firebase.apps.length) {
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig)
}

export default firebase;
