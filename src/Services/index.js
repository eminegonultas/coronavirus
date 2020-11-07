import axios from "axios";

export const request = axios.create({
  baseURL: "https://corona.lmao.ninja/v2/",
  withCredentials: false,
});
