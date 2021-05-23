import React, { useState, useEffect } from "react";
import Styles from "./filterVacations.module.css";
import axios from "axios";
import { TextField, Grid, Button } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FilterVacations({
  getVacations,
  setVacations,
  setIsFiltering,
}) {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const userID = JSON.parse(localStorage.getItem("vacationsUser")).id;

  const setFilterVacations = (e) => {
    if (e) {
      e.preventDefault();
    }
    toast.info("Updating the page");

    const filter = { id: userID };
    // all inputs are empty
    if (!destination && !startDate && !endDate) {
      return;
    }
    // destination input is filled
    if (destination) {
      filter.destination = destination;
    }
    // Both date inputs are input filled
    if (startDate && endDate) {
      filter.dates = `From: ${new Date(
        startDate
      ).toLocaleDateString()} until: ${new Date(endDate).toLocaleDateString()}`;
      console.log(filter);
      return sendFilters(filter);
    }
    // Only startDate input is fiiled
    else if (startDate && !endDate) {
      filter.dates = `From: ${new Date(startDate).toLocaleDateString()}`;
      console.log(filter);
      return sendFilters(filter);
    }
    // Only endDate input is fiiled
    else if (!startDate && endDate) {
      filter.dates = `until: ${new Date(endDate).toLocaleDateString()}`;
      console.log(filter);
      return sendFilters(filter);
    }
    // Both date inputs are input empty but destination is filled
    else if (destination && !startDate) {
      return sendFilters(filter);
    } else console.log(filter);
  };

  const sendFilters = async (obj) => {
    const res = await axios.get(
      `https://vacations-app-project.herokuapp.com/api/v1/vacations/${JSON.stringify(
        obj
      )}`
    );
    setVacations(res.data.vacations);
    setIsFiltering(true);
    console.log(res.data);
  };

  const resetFields = () => {
    toast.info("Updating the page");

    setDestination("");
    setStartDate("");
    setEndDate("");
    setIsFiltering(false);
    getVacations();
  };
  return (
    <form>
      <Grid container spacing={2} id={Styles.filterWraper}>
        <Grid item xs={12} sm={3}>
          <div>
            <label>Destination:</label>
          </div>
          <TextField
            type="text"
            placeholder="Destination"
            onChange={(e) => setDestination(e.target.value)}
            value={destination}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <div>
            <label>Start:</label>
          </div>
          <TextField
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <div>
            <label htmlFor="endDate">End:</label>
          </div>

          <TextField
            type="date"
            name="endDate"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={1}>
          <div>
            <p></p>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={setFilterVacations}
          >
            Search
          </Button>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Button type="button" variant="contained" onClick={resetFields}>
            Reset Results
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
