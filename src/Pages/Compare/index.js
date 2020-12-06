import React, { useEffect, useState } from "react";
import cm from "./compare.module.css";
import { Chart } from "react-google-charts";

import { useHistory } from "react-router-dom";

const Compare = () => {
  let history = useHistory();

  return (
    <div className={cm.body}>
      <Chart
        width={"400px"}
        height={"300px"}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={[
          ["Countries", "Deaths", "Total Cases", "Recovered"],
          ["Turkey", 57, 6, 87],
          ["Germany", 8, 76, 5],
          ["Italy", 89, 6, 4],
        ]}
        options={{
          // Material design options
          chart: {
            title: "Comparision",
          },
          legend: { position: "absolute" },
        }}
        // For tests
        rootProps={{ "data-testid": "2" }}
      />
    </div>
  );
};

export default Compare;
