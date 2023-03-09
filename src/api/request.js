import axios from "axios";
import { getSessionFromStorage } from "../helpers/tokens";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const request = async ({ headers = {}, method, url, data, params }) => {
  const accessToken = getSessionFromStorage() || {};

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const options = {
    headers,
    method,
    data,
    params,
    url,
  };

  const result = await axiosInstance(options);
  return result.data;
};
