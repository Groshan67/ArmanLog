import axios from "axios";
import jwtInterceptor from "../components/shared/jwtInterceptor";


import { BASE_URL, BASE_AUTH_URL } from "./urls";

axios.defaults.baseURL = BASE_URL;
// axios.defaults.headers.common["Authorization"] =
//   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInNjb3BlcyI6IkFETUlOIiwiaWF0IjoxNjc3Mjk5NTE5LCJleHAiOjE2NzczODU5MTl9.h1M6fhmIHqtub1JCU9KGiDqLGarJuKgk23iLYHgPZis";
export const get = jwtInterceptor.get;
export const post = jwtInterceptor.post;
export const put = jwtInterceptor.put;
export const patch = jwtInterceptor.patch;
export const deleteReq = jwtInterceptor.delete;

//Log related services
export const externalLogs = (pageIndex, pageSize) =>
  //get(`appServiceLogs?page=${pageIndex}&size=${pageSize}&sort=id,desc`);
  post(`log/thirdPartyServices/filter?page=${pageIndex}&size=${pageSize}`, {
    httpMethod: "POST",
    createdBy: "",
    uri: null,
    responseException: null,
    responseStatus: null,
  });

// Authorization
export const authService = axios.create({
  baseURL: BASE_AUTH_URL,
});
