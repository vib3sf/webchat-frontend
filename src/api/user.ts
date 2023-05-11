import { addSessionToStorage } from "../helpers/tokens";
import { addUserToStorage } from "../helpers/user";
import { request } from "./request";

export const login = async (name: string, password: string) => {
  const user = { username: name, password: password };
  const responce = await request({
    url: "/login",
    method: "POST",
    data: {
      user,
    },
  });
  addSessionToStorage(responce.token);
  addUserToStorage(JSON.stringify(responce.user));
};

export const register = async (
  name: string,
  password: string,
  confirmation_password: string
) => {
  const user = {
    username: name,
    password: password,
    password_confirmation: confirmation_password,
  };
  await request({
    url: "/register",
    method: "POST",
    data: {
      user,
    },
  });
  login(name, password);
};
