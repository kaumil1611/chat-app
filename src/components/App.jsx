import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
/* import Login from "./Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase-config";
import db from "../firebase-config";
import firebase from "firebase/compat/app";
import Loading from "./Loading"; */

function App() {
  /*  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    user &&
      db.collection("users").doc(user.uid).set(
        {
          id: user.uid,
          email: user.email,
          name: user.displayName,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          // lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
        },
        {
          merge: true,
        }
      );
  }, [user]);
  if (loading) return <Loading />;
  if (!user) return <Login />; */
  return (
    <div className="app">
      <div className="app__body">
        {/* side bar */}
        <Sidebar />
        {/* side bar */}

        {/* chat */}
        <Chat />
        {/* chat */}
      </div>
    </div>
  );
}

export default App;
