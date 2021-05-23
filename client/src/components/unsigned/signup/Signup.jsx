import React, { useState } from "react";
import SignupForm from "./SignupForm";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Copyright from "../../copyright/Copyright";
import styles from "./signup.module.css";
import Loader from "react-loader-spinner";
import Backdrop from "@material-ui/core/Backdrop";

export default function SignUp({ setToken }) {
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
          Sign Up
        </Typography>
        <SignupForm setToken={setToken} setOpen={setOpen} />
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
