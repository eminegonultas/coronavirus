import { request } from ".";

export function getCountries() {
  return request.request({
    method: "get",
    url: "countries",
  });
}
