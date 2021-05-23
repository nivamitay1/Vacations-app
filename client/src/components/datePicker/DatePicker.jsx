import React, { useState, useEffect } from "react";

import { DateRange } from "react-date-range";
import { addDays } from "date-fns";

export default function DatePicker({ setStartDate, setEndDate }) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  useEffect(() => {
    setStartDate(state[0].startDate.toLocaleDateString());
    setEndDate(state[0].endDate.toLocaleDateString());
  }, [state]);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <DateRange
        onChange={(item) => setState([item.selection])}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={state}
        direction="horizontal"
      />
    </div>
  );
}
