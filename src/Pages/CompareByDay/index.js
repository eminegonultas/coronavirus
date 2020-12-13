import React, { useEffect, useState } from "react";
import cm from "./comparebyday.module.css";
import { Chart } from "react-google-charts";
import {
  getCountries,
  getCountryByDay,
  historyData,
} from "../../Services/service";
import Select, { components } from "react-select";
import BackButton from "../../Images/back-button.png";
import { SpinnerDotted } from "spinners-react";

import { useHistory } from "react-router-dom";
var options = [{ label: "", value: "" }];
var country1info = [];
var country2info = [];
var country3info = [];
var country1data;
var country2data;
var country3data;
options.pop();
const CompareByDay = () => {
  let history = useHistory();

  const [loader, setLoader] = useState(false);
  const [country1, setCountry1] = useState([]);
  const [country1info, setCountry1info] = useState([]);

  const [country2, setCountry2] = useState([]);
  const [country2info, setCountry2info] = useState([]);

  const [country3, setCountry3] = useState([]);
  const [country3info, setCountry3info] = useState([]);

  const selectCountry1 = (selectedCountry1) => {
    setCountry1(selectedCountry1.value);
    getCountryDayByDay(1, selectedCountry1.value);
  };
  const selectCountry2 = (selectedCountry2) => {
    setCountry2(selectedCountry2.value);
    getCountryDayByDay(2, selectedCountry2.value);
  };
  const selectCountry3 = (selectedCountry3) => {
    setLoader(true);
    setCountry3(selectedCountry3.value);
    getCountryDayByDay(3, selectedCountry3.value);
  };

  const getCountryDayByDay = (queue, countryName) => {
    getCountryByDay(countryName)
      .then((res) => {
        console.log(res.data.timeline);
        if (queue == 1) {
          country1data = res.data.timeline;
        } else if (queue == 2) {
          country2data = res.data.timeline;
        } else if (queue == 3) {
          country3data = res.data.timeline;
          setTimeout(function () {
            setLoader(false);
          }, 5000);
        }
      })
      .catch((err) => setLoader(false));
  };

  useEffect(() => {
    getCountries()
      .then((res) => {
        // eslint-disable-next-line
        res.data.map((e, i) => {
          options.push({ label: e.country, value: e.country });
        });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={cm.body}>
      {loader ? (
        <div className={cm.spinner}>
          <SpinnerDotted enabled={true} />
        </div>
      ) : (
        <>
          <div className={cm.header}>
            <img
              src={BackButton}
              className={cm.backButton}
              onClick={() => history.push("/")}
            ></img>
            <div className={cm.title}>Comparision By Day</div>
          </div>
          <Select
            className={cm.dropdown}
            isSearchable={true}
            placeholder={"Select first country"}
            options={options}
            onChange={selectCountry1}
            value={country1.value}
          ></Select>
          <Select
            className={cm.dropdown}
            isSearchable={true}
            placeholder={"Select second country"}
            options={options}
            onChange={selectCountry2}
            value={country2.value}
          ></Select>
          <Select
            className={cm.dropdown}
            isSearchable={true}
            placeholder={"Select third country"}
            options={options}
            onChange={selectCountry3}
            value={country3.value}
          ></Select>
          {country1.length > 1 && country2.length > 1 && country3.length > 1 ? (
            <>
              <Chart
                width={"100%"}
                height={"400px"}
                chartType="LineChart"
                loader={
                  <div className={cm.spinner}>
                    <SpinnerDotted enabled={true} />
                  </div>
                }
                data={[
                  ["countries", country1, country2, country3],
                  [new Date(2020, 0), 0, 0, 0],
                  [
                    new Date(2020, 1),
                    country1data.deaths["1/22/20"],
                    country2data.deaths["1/22/20"],
                    country3data.deaths["1/22/20"],
                  ],
                  [
                    new Date(2020, 2),
                    country1data.deaths["2/1/20"],
                    country2data.deaths["2/1/20"],
                    country3data.deaths["2/1/20"],
                  ],
                  [
                    new Date(2020, 3),
                    country1data.deaths["3/1/20"],
                    country2data.deaths["3/1/20"],
                    country3data.deaths["3/1/20"],
                  ],
                  [
                    new Date(2020, 4),
                    country1data.deaths["4/1/20"],
                    country2data.deaths["4/1/20"],
                    country3data.deaths["4/1/20"],
                  ],
                  [
                    new Date(2020, 5),
                    country1data.deaths["5/1/20"],
                    country2data.deaths["5/1/20"],
                    country3data.deaths["5/1/20"],
                  ],
                  [
                    new Date(2020, 6),
                    country1data.deaths["6/1/20"],
                    country2data.deaths["6/1/20"],
                    country3data.deaths["6/1/20"],
                  ],
                  [
                    new Date(2020, 7),
                    country1data.deaths["7/1/20"],
                    country2data.deaths["7/1/20"],
                    country3data.deaths["7/1/20"],
                  ],
                  [
                    new Date(2020, 8),
                    country1data.deaths["8/1/20"],
                    country2data.deaths["8/1/20"],
                    country3data.deaths["8/1/20"],
                  ],
                  [
                    new Date(2020, 9),
                    country1data.deaths["9/1/20"],
                    country2data.deaths["9/1/20"],
                    country3data.deaths["9/1/20"],
                  ],
                  [
                    new Date(2020, 10),
                    country1data.deaths["10/1/20"],
                    country2data.deaths["10/1/20"],
                    country3data.deaths["10/1/20"],
                  ],
                  [
                    new Date(2020, 11),
                    country1data.deaths["11/1/20"],
                    country2data.deaths["11/1/20"],
                    country3data.deaths["11/1/20"],
                  ],
                  [
                    new Date(2020, 12),
                    country1data.deaths["12/1/20"],
                    country2data.deaths["12/1/20"],
                    country3data.deaths["12/1/20"],
                  ],
                ]}
                options={{
                  hAxis: {
                    title: "Date",
                  },
                  vAxis: {
                    viewWindowMode: "explicit",
                    viewWindow: { min: 0 },
                    title: "Deaths",
                  },
                  series: {
                    1: { curveType: "function" },
                  },
                }}
                rootProps={{ "data-testid": "2" }}
              />

              <Chart
                width={"100%"}
                height={"400px"}
                chartType="LineChart"
                loader={
                  <div className={cm.spinner}>
                    <SpinnerDotted enabled={true} />
                  </div>
                }
                data={[
                  ["countries", country1, country2, country3],
                  [new Date(2020, 0), 0, 0, 0],
                  [
                    new Date(2020, 1),
                    country1data.cases["1/22/20"],
                    country2data.cases["1/22/20"],
                    country3data.cases["1/22/20"],
                  ],
                  [
                    new Date(2020, 2),
                    country1data.cases["2/1/20"],
                    country2data.cases["2/1/20"],
                    country3data.cases["2/1/20"],
                  ],
                  [
                    new Date(2020, 3),
                    country1data.cases["3/1/20"],
                    country2data.cases["3/1/20"],
                    country3data.cases["3/1/20"],
                  ],
                  [
                    new Date(2020, 4),
                    country1data.cases["4/1/20"],
                    country2data.cases["4/1/20"],
                    country3data.cases["4/1/20"],
                  ],
                  [
                    new Date(2020, 5),
                    country1data.cases["5/1/20"],
                    country2data.cases["5/1/20"],
                    country3data.cases["5/1/20"],
                  ],
                  [
                    new Date(2020, 6),
                    country1data.cases["6/1/20"],
                    country2data.cases["6/1/20"],
                    country3data.cases["6/1/20"],
                  ],
                  [
                    new Date(2020, 7),
                    country1data.cases["7/1/20"],
                    country2data.cases["7/1/20"],
                    country3data.cases["7/1/20"],
                  ],
                  [
                    new Date(2020, 8),
                    country1data.cases["8/1/20"],
                    country2data.cases["8/1/20"],
                    country3data.cases["8/1/20"],
                  ],
                  [
                    new Date(2020, 9),
                    country1data.cases["9/1/20"],
                    country2data.cases["9/1/20"],
                    country3data.cases["9/1/20"],
                  ],
                  [
                    new Date(2020, 10),
                    country1data.cases["10/1/20"],
                    country2data.cases["10/1/20"],
                    country3data.cases["10/1/20"],
                  ],
                  [
                    new Date(2020, 11),
                    country1data.cases["11/1/20"],
                    country2data.cases["11/1/20"],
                    country3data.cases["11/1/20"],
                  ],
                  [
                    new Date(2020, 12),
                    country1data.cases["12/1/20"],
                    country2data.cases["12/1/20"],
                    country3data.cases["12/1/20"],
                  ],
                ]}
                options={{
                  hAxis: {
                    title: "Date",
                  },
                  vAxis: {
                    viewWindowMode: "explicit",
                    viewWindow: { min: 0 },
                    title: "Total Cases",
                  },
                  series: {
                    1: { curveType: "function" },
                  },
                }}
                rootProps={{ "data-testid": "2" }}
              />

              <Chart
                width={"100%"}
                height={"400px"}
                chartType="LineChart"
                loader={
                  <div className={cm.spinner}>
                    <SpinnerDotted enabled={true} />
                  </div>
                }
                data={[
                  ["countries", country1, country2, country3],
                  [new Date(2020, 0), 0, 0, 0],
                  [
                    new Date(2020, 1),
                    country1data.recovered["1/22/20"],
                    country2data.recovered["1/22/20"],
                    country3data.recovered["1/22/20"],
                  ],
                  [
                    new Date(2020, 2),
                    country1data.recovered["2/1/20"],
                    country2data.recovered["2/1/20"],
                    country3data.recovered["2/1/20"],
                  ],
                  [
                    new Date(2020, 3),
                    country1data.recovered["3/1/20"],
                    country2data.recovered["3/1/20"],
                    country3data.recovered["3/1/20"],
                  ],
                  [
                    new Date(2020, 4),
                    country1data.recovered["4/1/20"],
                    country2data.recovered["4/1/20"],
                    country3data.recovered["4/1/20"],
                  ],
                  [
                    new Date(2020, 5),
                    country1data.recovered["5/1/20"],
                    country2data.recovered["5/1/20"],
                    country3data.recovered["5/1/20"],
                  ],
                  [
                    new Date(2020, 6),
                    country1data.recovered["6/1/20"],
                    country2data.recovered["6/1/20"],
                    country3data.recovered["6/1/20"],
                  ],
                  [
                    new Date(2020, 7),
                    country1data.recovered["7/1/20"],
                    country2data.recovered["7/1/20"],
                    country3data.recovered["7/1/20"],
                  ],
                  [
                    new Date(2020, 8),
                    country1data.recovered["8/1/20"],
                    country2data.recovered["8/1/20"],
                    country3data.recovered["8/1/20"],
                  ],
                  [
                    new Date(2020, 9),
                    country1data.recovered["9/1/20"],
                    country2data.recovered["9/1/20"],
                    country3data.recovered["9/1/20"],
                  ],
                  [
                    new Date(2020, 10),
                    country1data.recovered["10/1/20"],
                    country2data.recovered["10/1/20"],
                    country3data.recovered["10/1/20"],
                  ],
                  [
                    new Date(2020, 11),
                    country1data.recovered["11/1/20"],
                    country2data.recovered["11/1/20"],
                    country3data.recovered["11/1/20"],
                  ],
                  [
                    new Date(2020, 12),
                    country1data.recovered["12/1/20"],
                    country2data.recovered["12/1/20"],
                    country3data.recovered["12/1/20"],
                  ],
                ]}
                options={{
                  hAxis: {
                    title: "Date",
                  },
                  vAxis: {
                    viewWindowMode: "explicit",
                    viewWindow: { min: 0 },
                    title: "Recovered",
                  },
                  series: {
                    1: { curveType: "function" },
                  },
                }}
                rootProps={{ "data-testid": "2" }}
              />
            </>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default CompareByDay;
