import React, { useEffect, useState } from "react";
import cm from "./home.module.css";
import { getCountries } from "../../Services/service";
import { VectorMap } from "react-jvectormap";
import { useHistory } from "react-router-dom";
import { SpinnerDotted } from "spinners-react";
import Legend from "../../Components/Legend";

const Home = () => {
  let history = useHistory();
  const [deaths, setDeaths] = useState({});
  const [totalCases, setTotalCases] = useState({});
  const [recovered, setRecovered] = useState({});
  const [mapColorRange, setMapColorRange] = useState(["#ffffff", "#000000"]);
  const [selectedButton, setSelectedButton] = useState({});
  const [loader, setLoader] = useState(true);
  const [legend, setLegend] = useState(false);
  const [legendColors, setLegendColors] = useState([
    { color: "#FF0000" },
    { color: "#DF0000" },
    { color: "#BF0000" },
    { color: "#9F0000" },
    { color: "#7F0000" },
  ]);
  const myItems = [
    { color: "#FF0000" },
    { color: "#DF0000" },
    { color: "#BF0000" },
    { color: "#9F0000" },
    { color: "#7F0000" },
  ];
  //deneme
  useEffect(() => {
    getCountries()
      .then(
        (res) => {
          // eslint-disable-next-line
          let wait = res.data.map((e, i) => {
            if (e.casesPerOneMillion > 0) {
              setDeaths((state) => ({
                ...state,
                [e.countryInfo.iso2]: e.deathsPerOneMillion,
              }));
              setRecovered((state) => ({
                ...state,
                [e.countryInfo.iso2]: e.recoveredPerOneMillion,
              }));
              setTotalCases((state) => ({
                ...state,
                [e.countryInfo.iso2]: e.casesPerOneMillion,
              }));
            }
            return "";
          });
          Promise.all(wait).then(() => {
            setLoader(false);
          });
        },
        () => {}
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className={cm.body}>
        {loader ? (
          <div className={cm.spinner}>
            <SpinnerDotted enabled={true} />
          </div>
        ) : (
          <>
            {" "}
            <button
              className={cm.button}
              onClick={() => {
                setMapColorRange(["#FF0000", "#7F0000"]);
                setSelectedButton(deaths);
                setLegendColors([
                  { color: "#FF0000" },
                  { color: "#DF0000" },
                  { color: "#BF0000" },
                  { color: "#9F0000" },
                  { color: "#7F0000" },
                ]);
                setLegend(true);
              }}
            >
              Deaths
            </button>
            <button
              className={cm.button}
              onClick={() => {
                setMapColorRange(["#FFA500", "#FF8C00"]);
                setSelectedButton(totalCases);
                setLegend(true);
                setLegendColors([
                  { color: "#FFA500" },
                  { color: "#FF9A00" },
                  { color: "#FF9500" },
                  { color: "#FF9000" },
                  { color: "#FF8C00" },
                ]);
              }}
            >
              Total Cases
            </button>
            <button
              className={cm.button}
              onClick={() => {
                setMapColorRange(["#0000ff ", "#0000bf"]);
                setSelectedButton(recovered);
                setLegend(true);
                setLegendColors([
                  { color: "#0000ff" },
                  { color: "#0000ef" },
                  { color: "#0000df" },
                  { color: "#0000cf" },
                  { color: "#0000bf" },
                ]);
              }}
            >
              Recovered
            </button>
            <button
              className={cm.button}
              onClick={() => {
                history.push("/compare");
              }}
            >
              Compare
            </button>
            <button
              className={cm.button}
              onClick={() => {
                history.push("/compareByDay");
              }}
            >
              Compare By Day
            </button>
            <VectorMap
              map={"world_mill"}
              backgroundColor="transparent" //change it to ocean blue: #0077be
              zoomOnScroll={true}
              containerStyle={{
                width: "100%",
                height: "450px",
              }}
              containerClassName="map"
              regionStyle={{
                initial: {
                  fill: "#e4e4e4",
                  "fill-opacity": 0.9,
                  stroke: "none",
                  "stroke-width": 0,
                  "stroke-opacity": 0,
                },
                hover: {
                  "fill-opacity": 0.8,
                  cursor: "pointer",
                },
                selected: {
                  //fill: "#2938bc", //color for the clicked country
                },
                selectedHover: {},
              }}
              regionsSelectable={false}
              series={{
                regions: [
                  {
                    values: selectedButton, //this is your data
                    scale: mapColorRange, //your color game's here
                    normalizeFunction: "linear",
                  },
                ],
              }}
            />
          </>
        )}
        <div className={cm.legend}>
          {legend ? <Legend items={legendColors}></Legend> : <></>}
        </div>
      </div>
    </>
  );
};

export default Home;
