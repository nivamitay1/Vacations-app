//  IMPORT PACKAGES

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

//   IMPORT ROUTES

const userRouter = require("./routes/userRoutes");
const followRoutes = require("./routes/followRoutes");
const vacationRouter = require("./routes/vacationRoutes");

// MIDDLEWARE

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());
app.use(morgan("dev"));

// connect to DB
const sequelize = require("./db/connection");
console.log(process.env.DATABASE);

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/follow", followRoutes);
app.use("/api/v1/vacations", vacationRouter);

// EXPORT APP
module.exports = app;
