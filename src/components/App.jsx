import React from "react";
import "./App.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Chat from "../components/Chat/Chat";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../components/Auth/Login";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/*;

import db from "../firebase-config";
import firebase from "firebase/compat/app";
 */

function App() {
  const { user } = useSelector((state) => state.userData);

  return (
    <React.Fragment>
      {!user && <Login />}
      {/* {loading && <Loading />} */}
      {user && (
        <React.Fragment>
          <div className="app">
            <div className="app__body">
              <Router>
                <Sidebar />
                <ToastContainer position="center-top" />

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
