import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./signup/Signup";
import Login from "./login/Login";

export default function UnSigned({ setToken }) {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login">
            <Login setToken={setToken} />
          </Route>
          <Route path="/">
            <Signup setToken={setToken} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
