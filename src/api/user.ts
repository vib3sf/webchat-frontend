import { AxiosHeaders } from "axios";
import { addSessionToStorage } from "../helpers/tokens";
import { addUserToStorage } from "../helpers/user";
import { request } from "./request";

export const login = async (name: string, password: string) => {
  const headers = new AxiosHeaders();
  const responce = await request({
    url: "/auth/signin",
    method: "POST",
    data: {
      name,
      password,
    },
    headers,
  });
  addSessionToStorage(responce.token);
  addUserToStorage(JSON.stringify(responce.user));
};

export const register = async (
  name: string,
  password: string,
  email: string
) => {
  const headers = new AxiosHeaders();
  await request({
    url: "/auth/signup",
    method: "POST",
    data: {
      name,
      password,
      email,
    },
    headers,
  });
  login(name, password);
};
