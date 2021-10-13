import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import { useSelector } from "react-redux";
/*import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase-config";
import db from "../firebase-config";
import firebase from "firebase/compat/app";
import Loading from "./Loading"; */

function App() {
  const { user } = useSelector((state) => state.userData);

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
    <React.Fragment>
      {!user && <Login />}
      {user && (
        <React.Fragment>
          <div className="app">
            <div className="app__body">
              <Router>
                <Sidebar />
                <Switch>
                  <Route exact path="/rooms/:roomId">
                    <Chat />
                  </Route>
                  <Route path="/" />
                </Switch>
              </Router>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default App;
