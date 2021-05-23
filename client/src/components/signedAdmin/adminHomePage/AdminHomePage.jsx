import React, { useState, useEffect } from "react";
import AdminVacationCard from "./adminVacationCard/AdminVacationCard";
import Styles from "./adminHomePage.module.css";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

export default function AdminHomePage({ render, setRender }) {
  const [vacations, setVacations] = useState([]);
  const getVacations = async () => {
    const res = await axios.get(
      "https://vacations-app-project.herokuapp.com/api/v1/vacations"
    );
    setVacations(res.data.vacations.reverse());
  };
  useEffect(() => {
    getVacations();
  }, [render]);
  return (
    <div className={Styles.cardsWraper}>
      {vacations.map((vacation) => {
        return (
          <AdminVacationCard
            vacation={vacation}
            setRender={setRender}
            key={vacation.id}
          />
        );
      })}
    </div>
  );
}
