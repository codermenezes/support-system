import firebase from "firebase/app";
import 'firebase/auth';
import { REACT_APP_API_KEY, REACT_APP_AUTH_DOMAIN } from "../../.env";

let firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
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

require('dotenv').config()
