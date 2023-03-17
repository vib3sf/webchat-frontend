import axios, { AxiosHeaders } from "axios";
import { getSessionFromStorage } from "../helpers/tokens";

interface Headers {
  Authorization?: string;
}

interface Data {
  name: string;
  password: string;
  email?: string;
}

export interface Request {
  headers: AxiosHeaders;
  method: string;
  url: string;
  data: Data;
  params?: string;
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const request = async ({
  headers,
  method,
  url,
  data,
  params,
}: Request) => {
  const accessToken = getSessionFromStorage() || {};

  if (accessToken && headers) {
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
