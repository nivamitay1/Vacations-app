import React, { useState, useEffect } from "react";
import AdminHomePage from "./adminHomePage/AdminHomePage";
import AddVacation from "./addVacation/AddVacation";
import ReportsPage from "./reportsPage/ReportsPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Styles from "./adminNavBar.module.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import BarChartIcon from "@material-ui/icons/BarChart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";

export default function SignedAdmin({ setToken }) {
  const [render, setRender] = useState(0);

  function logout() {
    setToken();
    localStorage.setItem("vacationsUser", null);
  }

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Tooltip title="Home">
              <Link className={Styles.navlink} to="/">
                <HomeIcon />
              </Link>
            </Tooltip>
            <AddVacation setRender={setRender} />
            <Tooltip title="Reports">
              <Link className={Styles.navlink} to="/reportsPage">
                <BarChartIcon />
              </Link>
            </Tooltip>
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
        <Route path="/reportsPage">
          <ReportsPage />
        </Route>
        <Route path="/">
          <AdminHomePage render={render} setRender={setRender} />
        </Route>
      </Switch>
    </Router>
  );
}
