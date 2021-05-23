// IMPORTS
const express = require("express");
const vacationController = require("../controllers/vacationController");

// ROUTE HANDLERS
const router = express.Router();

// ROUTES

router
  .route("/")
  .post(vacationController.createVacation)
  .get(vacationController.getAllVacations);

router
  .route("/:id")
  .patch(vacationController.updateVcation)
  .delete(vacationController.deleteVacation);

router.route("/:filters").get(vacationController.filterVacations);
module.exports = router;
