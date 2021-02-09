import axios from "axios";

export const request = axios.create({
  baseURL: "https://corona.lmao.ninja/v2/",
  withCredentials: false,
});

export const request2 = axios.create({
  baseURL: "https://corona.cbddo.gov.tr/",
  withCredentials: false,
});
export const request3 = axios.create({
  baseURL:
    "https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1",
  withCredentials: false,
});
