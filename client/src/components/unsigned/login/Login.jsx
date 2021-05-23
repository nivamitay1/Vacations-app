import React, { useState } from "react";
import LoginForm from "./LoginForm";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Copyright from "../../copyright/Copyright";
import styles from "./login.module.css";
import Loader from "react-loader-spinner";
import Backdrop from "@material-ui/core/Backdrop";

export default function Login({ setToken }) {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <Container component="main" maxWidth="xs">
      <Backdrop id={styles.loader} open={open}>
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      </Backdrop>

      <CssBaseline />
      <div className={styles.wraper}>
        <div>
          <img
            className={styles.logo}
            src="https://res.cloudinary.com/dzwabkqxt/image/upload/v1620472900/vacations/logo-white-bg_evnz71.png"
          />
        </div>
        <Typography component="h1" variant="h4">
          Login
        </Typography>
        <LoginForm
          setToken={setToken}
          setMessage={setMessage}
          setOpen={setOpen}
        />
        <p style={{ color: "red" }}> {message} </p>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
