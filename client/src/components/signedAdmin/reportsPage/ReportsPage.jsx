import axios from "axios";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

export default function ReportsPage() {
  let [vacationsNames, setVacationsNames] = useState([]);
  let [numberOfFollowers, setNumberOfFollowers] = useState([]);
  let [backgroundColors, setBackgroundColors] = useState([]);

  const getVacations = async () => {
    const res = await axios.get(
      "https://vacations-app-project.herokuapp.com/api/v1/follow"
    );
    res.data.vacations.forEach((vacation) => {
      const randomColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      vacationsNames = [...vacationsNames, vacation.description];
      numberOfFollowers = [...numberOfFollowers, vacation.follows.length];
      backgroundColors = [...backgroundColors, randomColor];
      setBackgroundColors(backgroundColors);
      setVacationsNames(vacationsNames);
      setNumberOfFollowers(numberOfFollowers);
    });
  };

  useEffect(() => {
    getVacations();
  }, []);

  return (
    <div>
      <Bar
        data={{
          labels: vacationsNames,
          datasets: [
            {
              label: "# of Followers",
              data: numberOfFollowers,
              backgroundColor: backgroundColors,
              borderColor: backgroundColors,
              borderWidth: 1,
            },
          ],
        }}
        width={600}
        height={200}
        options={{
          legend: {
            display: false,
            labels: {
              fontColor: "rgb(255, 99, 132)",
            },
          },
          scales: {
            yAxes: [
              {
                ticks: { beginAtZero: true },
              },
            ],
          },
        }}
      />
    </div>
  );
}
