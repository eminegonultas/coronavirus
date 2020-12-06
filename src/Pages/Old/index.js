import React, { useEffect, useState, Component } from "react";
import cm from "./old.module.css";
import img_itu from "../../Images/itu.png";
import img_instagram from "../../Images/instagram.png";
import img_facebook from "../../Images/facebook.png";
import img_linkedin from "../../Images/linkedin.png";
import {
  Map as LeafletMap,
  Marker,
  Popup,
  TileLayer,
  CircleMarker,
} from "react-leaflet";
import { covidByCountry, covidByCountry2 } from "../../Services/service";

let markers = [];
let countryCoords = [];
let countryInfo = [];
class Old extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: null,
      colorCircle: "red",
      sizeCircle: 0,
      dataInfo: 2,
      buttonColor: "white",

      //buttonAngle: "rotate(0deg)"
    };
  }
  setMarkers = () => {
    markers = [];
    countryCoords.map((e, i) => {
      markers.push(
        <CircleMarker
          center={countryCoords[i]}
          radius={Math.sqrt(countryInfo[i][this.state.dataInfo]) / 5}
          fillColor={this.state.colorCircle}
          color={this.state.colorCircle}
        >
          {" "}
          <Popup>
            <b> {countryInfo[i][0]}</b>
            <br></br>
            {"Total Cases: " + countryInfo[i][1]}
            <br></br>
            {"Deaths: " + countryInfo[i][2]}
            <br></br>
            {"Recovered: " + countryInfo[i][3]}
          </Popup>
        </CircleMarker>
      );
    });
    if (markers.length > 0) this.setState({ marker: markers });
  };
  getCountryInfo = () => {
    covidByCountry2()
      .then((res) => {
        countryCoords = [];
        countryInfo = [];
        res.data.map((e, i) => {
          countryCoords.push([e.countryInfo.lat, e.countryInfo.long]);
          countryInfo.push([e.country, e.cases, e.deaths, e.recovered]);
          this.setMarkers();
        });
      })
      .catch((err) => console.log(err));
  };
  componentDidMount = () => {
    this.getCountryInfo();
  };
  render() {
    const { marker } = this.state;

    return (
      <div>
        <div className={cm.header}>
          <img alt={""} src={img_itu} className={cm.ituLogo} />
          <p className={cm.title}>CORONAVIRUS COVID-19 WORLD MAP</p>

          <button
            className={cm.button1}
            style={{
              backgroundColor: this.state.buttonColor,
            }}
            onClick={() => {
              this.setState(
                {
                  colorCircle: "yellow",
                  dataInfo: 1,

                  //buttonAngle: "rotate(45deg)"
                },
                () => {
                  this.setMarkers();
                }
              );
            }}
          >
            Total Cases
          </button>
          <button
            className={cm.button1}
            style={{
              backgroundColor: this.state.buttonColor,
            }}
            onClick={() => {
              this.setState(
                {
                  colorCircle: "red",
                  dataInfo: 2,

                  //buttonAngle: "rotate(45deg)"
                },
                () => {
                  this.setMarkers();
                }
              );
            }}
          >
            Deaths
          </button>
          <button
            className={cm.button1}
            style={{
              backgroundColor: this.state.buttonColor,
            }}
            onClick={() => {
              this.setState(
                {
                  colorCircle: "#00CC33",
                  dataInfo: 3,

                  /*buttonAngle: "rotate(45deg)"*/
                },
                () => {
                  this.setMarkers();
                }
              );
            }}
          >
            Recovered
          </button>
        </div>
        <LeafletMap center={[40.5352019, 34.8718632]} zoom={2} minZoom={2}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {marker ? marker : <></>}
        </LeafletMap>
        <div className={cm.footer}>
          <img
            alt={""}
            src={img_facebook}
            className={cm.mediaLogo}
            onClick={() => {
              window.open("https://www.facebook.com/emine.gnlts", "_blank");
            }}
          />
          <img
            alt={""}
            src={img_instagram}
            className={cm.mediaLogo}
            onClick={() => {
              window.open("https://www.instagram.com/eminegonultass", "_blank");
            }}
          />

          <img
            alt={""}
            src={img_linkedin}
            className={cm.mediaLogo}
            onClick={() => {
              window.open(
                "https://www.linkedin.com/in/eminegonultas",
                "_blank"
              );
            }}
          />
        </div>
      </div>
    );
  }
}
export default Old;
