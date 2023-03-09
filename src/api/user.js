import { addSessionToStorage } from "../helpers/tokens";
import { addUserToStorage } from "../helpers/user";
import { request } from "./request";

export const login = async (name, password) => {
  const responce = await request({
    url: "/auth/signin",
    method: "POST",
    data: {
      name,
      password,
    },
  });
  addSessionToStorage(responce.token);
  addUserToStorage(JSON.stringify(responce.user));
};

export const register = async (name, password, email) => {
  await request({
    url: "/auth/signup",
    method: "POST",
    data: {
      name,
      password,
      email,
    },
  });
  login(name, password);
};
