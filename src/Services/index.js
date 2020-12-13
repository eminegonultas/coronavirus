import axios from "axios";

export const request = axios.create({
  baseURL: "https://corona.lmao.ninja/v2/",
  withCredentials: false,
});

export const request2 = axios.create({
  baseURL: "https://corona.cbddo.gov.tr/",
  withCredentials: false,
});
