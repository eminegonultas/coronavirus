import React, { useEffect, useState } from "react";
import cm from "./home.module.css";
import { getCountries, vaccineData } from "../../Services/service";
import { VectorMap } from "react-jvectormap";
import { useHistory } from "react-router-dom";
import { SpinnerDotted } from "spinners-react";
import Legend from "../../Components/Legend";
import NorthSign from "../../Images/north-sign.png";

const Home = () => {
  let history = useHistory();
  const [initialize, setInitialize] = useState(false);
  const [deaths, setDeaths] = useState({});
  const [totalCases, setTotalCases] = useState({});
  const [recovered, setRecovered] = useState({});
  const [vaccine, setVaccine] = useState({});
  const [country, setCountry] = useState([]);
  const [mapColorRange, setMapColorRange] = useState(["#ffffff", "#000000"]);
  const [selectedButton, setSelectedButton] = useState({});
  const [loader, setLoader] = useState(true);
  const [legend, setLegend] = useState(false);
  const [legendColors, setLegendColors] = useState([
    { color: "#FF0000", title: "Deaths", range: "" },
    { color: "#DF0000" },
    { color: "#BF0000" },
    { color: "#9F0000" },
    { color: "#7F0000" },
  ]);
  useEffect(() => {
    getCountries().then(
      (res) => {
        // eslint-disable-next-line
        res.data.map((e, i) => {
          setCountry((state) => [
            ...state,
            { country: e.country, iso: e.countryInfo.iso2 },
          ]);
        });
      },
      () => {}
    );
  }, []);
  useEffect(() => {
    setVaccine({});
    funx();
  }, [country]);
  const funx = () => {
    vaccineData().then((res2) => {
      res2.data.map((x, y) => {
        //console.log(x.country, Object.values(x.timeline)[0]);
        var temp = country.find((t) => t.country == x.country)
          ? country.find((t) => t.country == x.country)
          : "";
        setVaccine((state) => ({
          ...state,
          [temp.iso]: Object.values(x.timeline)[0],
        }));
      });
    });
  };

  useEffect(() => {
    let x = 0.0;
    getCountries()
      .then(
        (res) => {
          // eslint-disable-next-line
          res.data.map((e, i) => {
            if (e.recoveredPerOneMillion > x) {
              x = e.recoveredPerOneMillion;
            }
          });
        },
        () => {}
      )
      .catch((err) => console.log(err));
  }, []);
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
            setInitialize(true);
            setLegend(true);
          });
        },
        () => {}
      )
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    setMapColorRange(["#FF0000", "#3F0000"]);
    setSelectedButton(deaths);
    setLegendColors([
      { color: "#FF0000", title: "Deaths", range: "0-450" },
      { color: "#CF0000", range: "451-900" },
      { color: "#9F0000", range: "901-1350" },
      { color: "#6F0000", range: "1351-1800" },
      { color: "#3F0000", range: ">1800" },
    ]);
  }, [initialize]);

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
            <div className={cm.title}>Coronavirus World Map</div>
            <button
              className={cm.button}
              onClick={() => {
                setMapColorRange(["#FF0000", "#7F0000"]);
                setSelectedButton(deaths);
                setLegendColors([
                  { color: "#FF0000", title: "Deaths", range: "0-450" },
                  { color: "#CF0000", range: "451-900" },
                  { color: "#9F0000", range: "901-1350" },
                  { color: "#6F0000", range: "1351-1800" },
                  { color: "#3F0000", range: ">1800" },
                ]);
                setLegend(true);
              }}
            >
              Deaths
            </button>
            <button
              className={cm.button}
              onClick={() => {
                setMapColorRange(["#FFF500", "#FF3500"]);
                setSelectedButton(totalCases);
                setLegend(true);
                setLegendColors([
                  { color: "#FFF500", title: "Total Cases", range: "0-25000" },
                  { color: "#FFCC00", range: "25001-50000" },
                  { color: "#FF9F50", range: "50001-75000" },
                  { color: "#FF6347", range: "75001-100000" },
                  { color: "#FF3500", range: ">100000" },
                ]);
              }}
            >
              Total Cases
            </button>
            <button
              className={cm.button}
              onClick={() => {
                setMapColorRange(["#00BFFF ", "#00008B"]);
                setSelectedButton(recovered);
                setLegend(true);
                setLegendColors([
                  { color: "#00BFFF", title: "Recovered", range: "0-20000" },
                  { color: "#1E90FF", range: "20001-40000" },
                  { color: "#4169E1", range: "40001-60000" },
                  { color: "#0000FF", range: "60001-80000" },
                  { color: "#00008B", range: ">80000" },
                ]);
              }}
            >
              Recovered
            </button>
            <button
              className={cm.button}
              onClick={() => {
                setMapColorRange(["#e4e4e4 ", "#04e4e4"]);
                setSelectedButton(vaccine);
                setLegend(true);
                setLegendColors([
                  { color: "#e4e4e4", title: "Vaccine", range: "0-2000000" },
                  { color: "#b3e4e4", range: "2000001-4000000" },
                  { color: "#82e4e4", range: "4000001-6000000" },
                  { color: "#41e4e4", range: "6000001-8000000" },
                  { color: "#00e4e4", range: ">8000000" },
                ]);
              }}
            >
              Vaccine
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
            <img
              src={NorthSign}
              style={{
                width: "50px",
                right: 10,
                position: "fixed",
              }}
            ></img>
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
