import React, { useEffect, useState } from "react";
import cm from "./compare.module.css";
import { Chart } from "react-google-charts";
import { getCountries } from "../../Services/service";
import Select, { components } from "react-select";
import BackButton from "../../Images/back-button.png"

import { useHistory } from "react-router-dom";
var options = [{ label: "", value: "" }];
var infos = [{ label: "", case: 0, death: 0, recovered: 0 }];
options.pop();
const Compare = () => {
  const [country1, setCountry1] = useState([]);
  const [country1info, setCountry1info] = useState([]);

  const [country2, setCountry2] = useState([]);
  const [country2info, setCountry2info] = useState([]);

  const [country3, setCountry3] = useState([]);
  const [country3info, setCountry3info] = useState([]);


  const [info, setInfo] = [{ case: 0, death: 0, recovered: 0 }];
  let history = useHistory();

  const selectCountry1 = (selectedCountry1) => {
    setCountry1(selectedCountry1.value);
    infos.map((e,i)=>{
      if(e.label == selectedCountry1.value){
        setCountry1info(e)
      }
    })
  };
  const selectCountry2 = (selectedCountry2) => {
    setCountry2(selectedCountry2.value);
    infos.map((e,i)=>{
      if(e.label == selectedCountry2.value){
        setCountry2info(e)
      }
    })
  };
  const selectCountry3 = (selectedCountry3) => {
    setCountry3(selectedCountry3.value);
    infos.map((e,i)=>{
      if(e.label == selectedCountry3.value){
        setCountry3info(e)
      }
    })
  };

  useEffect(() => {
    getCountries()
      .then((res) => {
        // eslint-disable-next-line
        res.data.map((e, i) => {
          options.push({ label: e.country, value: e.country });
          infos.push({
            label: e.country,
            case: e.casesPerOneMillion / 1000,
            death: e.deathsPerOneMillion / 1000,
            recovered: e.recoveredPerOneMillion / 1000,
          });
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={cm.body}>
      <div className={cm.header}>
        <img src={BackButton} className={cm.backButton}onClick={()=>history.push("/")}></img>
        <div className={cm.title}>Comparision</div>
      </div>
      <Select
        className={cm.dropdown}
        isSearchable={false}
        placeholder={"Select first country"}
        options={options}
        onChange={selectCountry1}
        value={country1.value}
      ></Select>
      <Select
        className={cm.dropdown}
        isSearchable={false}
        placeholder={"Select second country"}
        options={options}
        onChange={selectCountry2}
        value={country2.value}
      ></Select>
      <Select
        className={cm.dropdown}
        isSearchable={false}
        placeholder={"Select third country"}
        options={options}
        onChange={selectCountry3}
        value={country3.value}
      ></Select>
      {country1.length > 1 && country2.length > 1 && country3.length > 1 ? (
        <Chart
          width={"100%"}
          height={"400px"}
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Countries", "Recovered", "Deaths", "Total Cases"],
            [country1, country1info.recovered, country1info.death, country1info.case],
            [country2, country2info.recovered, country2info.death, country2info.case],
            [country3, country3info.recovered, country3info.death, country3info.case],
          ]}
          options={{
            // Material design options
            chartArea: { width: '40%' },
            chart: {
              title: "",backgroundColor: 'red'
            },
            vAxis: {
              title: 'Ratio of population (per 1000)',
            },
          }}
          // For tests
          rootProps={{ "data-testid": "2" }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Compare;
