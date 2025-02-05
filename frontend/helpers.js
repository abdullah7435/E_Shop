import { AUTH_TOKEN } from "./constant";

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(AUTH_TOKEN);
  }
  return null;
};

export const setToken = (token) => {
  if (typeof window !== "undefined") {
    if (token) {
      localStorage.setItem(AUTH_TOKEN, token);
    }
  }
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN);
  }
};
