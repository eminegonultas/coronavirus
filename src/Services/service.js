import { request, request2 } from ".";

export function getCountries() {
  return request.request({
    method: "get",
    url: "countries",
  });
}

export function getCountryByDay(country) {
  return request.request({
    method: "get",
    url: "historical/" + country + "?lastdays=365",
  });
}
export function historyData(country) {
  return request2.request({
    method: "get",
    url: "Home/HistoryData?name=Brasil&startDate=01/01/2020&endDate=11/12/2020",
  });
}
