import React, { useState } from "react";
import HomePage from "./homePage/HomePage";
import Styles from "./signedNavBar.module.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FilterListIcon from "@material-ui/icons/FilterList";
import Tooltip from "@material-ui/core/Tooltip";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

export default function Signed({ setToken }) {
  const [render, setRender] = useState(0);

  function logout() {
    setToken();
    localStorage.setItem("vacationsUser", null);
  }
  return (
    <Router>
      <div>
        <AppBar position="fixed" id={Styles.navBar}>
          <Toolbar>
            <Tooltip title="Home">
              <Link className={Styles.navlink} to="/">
                <HomeIcon onClick={(e) => setRender(Math.random() * 1000)} />
              </Link>
            </Tooltip>

            <FilterListIcon className={Styles.navlink} />
            <Tooltip title="Logout">
              <Link
                className={Styles.navlink}
                id={Styles.logout}
                to="/"
                onClick={logout}
              >
                <ExitToAppIcon />
              </Link>
            </Tooltip>
            <div />
            <div className={Styles.logoDiv}>
              <img
                className={Styles.logoImg}
                src="https://res.cloudinary.com/dzwabkqxt/image/upload/v1620471484/vacations/LogoMakr-9snheB_jlawig.png"
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <Switch>
        <Route path="/">
          <HomePage setRender={setRender} render={render} />
        </Route>
      </Switch>
    </Router>
  );
}
