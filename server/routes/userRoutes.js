// IMPORTS
const express = require("express");
const userController = require("../controllers/userController");

// ROUTE HANDLERS
const router = express.Router();

// ROUTES

router.route("/").post(userController.createUser);

router.route("/login").post(userController.checkUser);
module.exports = router;
