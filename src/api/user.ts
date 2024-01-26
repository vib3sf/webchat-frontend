import { addSessionToStorage } from "../helpers/tokens";
import { addUserToStorage } from "../helpers/user";
import { request } from "./request";

export const login = async (name: string, password: string) => {
  const response = await request({
    url: "/login",
    method: "POST",
    data: {
      user: {
        username: name,
        password,
      },
    },
  });

  addSessionToStorage(response.token);
  addUserToStorage(JSON.stringify(response.user));

  return response;
};

export const register = async (
  name: string,
  password: string,
  confirmation_password: string
) => {
  await request({
    url: "/register",
    method: "POST",
    data: {
      user: {
        username: name,
        password,
        confirmation_password,
      },
    },
  });
  const response = await login(name, password);

  return response;
};
