import axios, { AxiosHeaders } from "axios";
import { getSessionFromStorage } from "../helpers/tokens";

interface Headers {
  Authorization?: string;
}

interface Data {
  user: User;
}

interface User {
  username: string;
  password: string;
  confirmation_password?: string;
}

export interface Request {
  method: string;
  url: string;
  data: Data;
  params?: string;
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export const request = async ({ method, url, data, params }: Request) => {
  const options = {
    method,
    data,
    params,
    url,
  };

  const result = await axiosInstance(options);
  return result.data;
};
