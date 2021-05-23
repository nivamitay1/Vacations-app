import React, { useState, useEffect } from "react";
import VacationCard from "./vacationCard/VacationCard";
import FilterVacations from "../filterVacations/FilterVacations";
import Styles from "./homePage.module.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HomePage({ render, setRender }) {
  const [vacations, setVacations] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  const userID = JSON.parse(localStorage.getItem("vacationsUser")).id;
  const getVacations = async () => {
    const res = await axios.get(
      `https://vacations-app-project.herokuapp.com/api/v1/follow/${userID}`
    );
    if (res.data.success) {
      setVacations(res.data.vacations);
    }
  };
  useEffect(() => {
    if (!isFiltering) {
      getVacations();
    }
  }, [render]);

  return (
    <div className={Styles.cardsWraper}>
      <br />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
      />
      <FilterVacations
        getVacations={getVacations}
        setVacations={setVacations}
        setIsFiltering={setIsFiltering}
      />
      {vacations.map((vacation) => {
        return vacation.vacation ? (
          <React.Fragment key={uuidv4()}>
            <VacationCard
              vacation={vacation.vacation}
              key={uuidv4()}
              setRender={setRender}
              isFiltering={isFiltering}
            />
          </React.Fragment>
        ) : (
          <React.Fragment key={uuidv4()}>
            <VacationCard
              vacation={vacation}
              key={uuidv4()}
              setRender={setRender}
              isFiltering={isFiltering}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}
