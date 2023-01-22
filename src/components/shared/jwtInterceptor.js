import axios from "axios";
import { json } from "react-router-dom";

const jwtInterceptor = axios.create({});

jwtInterceptor.interceptors.request.use((config) => {
  let tokensData = JSON.parse(localStorage.getItem("tokens"));
  config.headers.common["Authorization"] = `Bearer ${tokensData.accessToken}`;
  return config;
});

jwtInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const authData = JSON.parse(localStorage.getItem("tokens"));
      const payload = {
        accessToken: authData.accessToken,
        refreshToken: authData.refreshToken,
      };
      console.log(error);
      let apiResponse = await axios.post(
        "https://hlthubofinsco.services.centinsur.ir/auth/refresh-token",
        json.stringify({ refreshToken: payload.refreshToken })
      );
      localStorage.setItem("tokens", JSON.stringify(apiResponse.data));
      error.config.headers[
        "Authorization"
      ] = `Bearer ${apiResponse.data.accessToken}`;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

export default jwtInterceptor;
