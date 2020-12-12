import React, { useEffect, useState } from "react";
import cm from "./home.module.css";
import { getCountries } from "../../Services/service";
import { VectorMap } from "react-jvectormap";
import { useHistory } from "react-router-dom";
import { SpinnerDotted } from "spinners-react";

const Home = () => {
  let history = useHistory();
  const [deaths, setDeaths] = useState({});
  const [totalCases, setTotalCases] = useState({});
  const [recovered, setRecovered] = useState({});
  const [mapColorRange, setMapColorRange] = useState(["#ffffff", "#000000"]);
  const [selectedButton, setSelectedButton] = useState({});
  const [loader, setLoader] = useState(true);
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
                setMapColorRange(["#ff9999", "#b30000"]);
                setSelectedButton(deaths);
              }}
            >
              Deaths
            </button>
            <button
              className={cm.button}
              onClick={() => {
                setMapColorRange(["#fefefe", "#f30000"]);
                setSelectedButton(totalCases);
              }}
            >
              Total Cases
            </button>
            <button
              className={cm.button}
              onClick={() => {
                setMapColorRange(["#000000", "#ffffff"]);
                setSelectedButton(recovered);
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
            <VectorMap
              map={"world_mill"}
              backgroundColor="transparent" //change it to ocean blue: #0077be
              zoomOnScroll={true}
              containerStyle={{
                width: "100%",
                height: "300px",
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
      </div>
    </>
  );
};

export default Home;
