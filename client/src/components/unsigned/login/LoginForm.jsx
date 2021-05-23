import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import styles from "./login.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupForm({ setToken, message, setMessage, setOpen }) {
  let history = useHistory();

  const checkUser = async (values) => {
    setOpen(true);
    const res = await axios.post(
      "https://vacations-app-project.herokuapp.com/api/v1/users/login",
      values
    );
    setMessage(res.data.message);
    if (res.data.success) {
      if (res.data.user.email === "vacationsAdmin@gmail.com") {
        res.data.user.admin = true;
        localStorage.setItem("vacationsUser", JSON.stringify(res.data.user));
        setToken("admin");
        setOpen(false);
        return history.push("/");
      }
      localStorage.setItem("vacationsUser", JSON.stringify(res.data.user));
      setToken("ok");
      setOpen(false);
      return history.push("/");
    } else {
      setMessage(res.data.message);
      toast.error(res.data.message);
      setOpen(false);
    }
  };
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      checkUser(values);
    },
  });

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
      />
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}></Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          id={styles.submit}
        >
          Login
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link to="/" variant="body2" className={styles.change}>
              Don't have an account? Sign up
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
