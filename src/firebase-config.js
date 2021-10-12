import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_y6BQ7TkASWv8R1nGy6BPCi2LWi_iyEw",
  authDomain: "react-firebase-auth-140bc.firebaseapp.com",
  projectId: "react-firebase-auth-140bc",
  storageBucket: "react-firebase-auth-140bc.appspot.com",
  messagingSenderId: "373561016961",
  appId: "1:373561016961:web:0d1dc0870b3bc7339e0380",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleAuthProvider };
export default db;
