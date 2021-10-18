import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

console.log(
  process.env.REACT_APP_API,
  process.env.REACT_APP_AUTH_DOMAIN,
  process.env.REACT_APP_PROJECT_ID,
  process.env.REACT_APP_STORAGE_BUCKET,
  process.env.REACT_APP_MESSAGING_SENDER_ID,
  process.env.REACT_APP_APP_ID
);
const firebaseConfig = {
  // apiKey: "AIzaSyD_y6BQ7TkASWv8R1nGy6BPCi2LWi_iyEw",
  // authDomain: "react-firebase-auth-140bc.firebaseapp.com",
  // projectId: "react-firebase-auth-140bc",
  // storageBucket: "react-firebase-auth-140bc.appspot.com",
  // messagingSenderId: "373561016961",
  // appId: "1:373561016961:web:0d1dc0870b3bc7339e0380",

  apiKey: process.env.REACT_APP_API,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleAuthProvider };
export default db;
