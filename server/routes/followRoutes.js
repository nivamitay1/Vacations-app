// IMPORTS
const express = require("express");
const followController = require("../controllers/followController");

// ROUTE HANDLERS
const router = express.Router();

// ROUTES

router
  .route("/")
  .post(followController.createFollow)
  .get(followController.getVacationsWithFollowers);
router.route("/:id").get(followController.getUsersVacations);
module.exports = router;
