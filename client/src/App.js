import React, { useState, useEffect } from "react";
import Unsigned from "./components/unsigned/Unsigned";
import Signed from "./components/signed/Signed";
import SignedAdmin from "./components/signedAdmin/SignedAdmin";

function App() {
  const [token, setToken] = useState();
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("vacationsUser")) !== null) {
      if (JSON.parse(localStorage.getItem("vacationsUser")).admin) {
        setToken("admin");
      } else {
        setToken("ok");
      }
    }
  }, []);
  if (!token) {
    return <Unsigned setToken={setToken} />;
  } else if (token === "admin") {
    return <SignedAdmin setToken={setToken} />;
  }
  return <Signed setToken={setToken} />;
}

export default App;
