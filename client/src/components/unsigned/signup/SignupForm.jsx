import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import styles from "./signup.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupForm({ setToken, setOpen }) {
  let history = useHistory();

  const [message, setMessage] = useState("");
  const createUser = async (values) => {
    setOpen(true);
    const res = await axios.post(
      "https://vacations-app-project.herokuapp.com/api/v1/users",
      values
    );
    if (res.data.success) {
      localStorage.setItem("vacationsUser", JSON.stringify(res.data.newUser));
      setOpen(false);
      history.push("/");
      setToken("ok");
    } else {
      setMessage(res.data.message);
      toast.error(res.data.message);
      setOpen(false);
    }
    console.log(res.data);
  };

  const validationSchema = yup.object({
    firstName: yup
      .string("Enter your first name")
      .matches(/[a-zA-Z]+/gi, "Name can only contain letters")
      .min(2, " Please enter your first name")
      .required("First name is required"),
    lastName: yup
      .string("Enter your last name")
      .matches(/[a-zA-Z]+/gi, " Name can only contain letters")
      .min(2, " Please enter your last name")
      .required("Last name is required"),
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      createUser(values);
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
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.firstName}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="lastName"
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.lastName}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
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
          id={styles.submit}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link className={styles.change} to="/login" variant="body2">
              Already have an account? Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
