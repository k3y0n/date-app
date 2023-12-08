import axios from "axios";
import config from "../config.json";
import localStorageService from "./localstorage.service";

const httpAuth = axios.create({
  baseURL: config.apiEndpoint + "auth/",
  params: {
    key: import.meta.env.VITE_FIREBASE_KEY,
  },
});

const authService = {
  signUp: async (payload) => {
    const { data } = await httpAuth.post(`signUp`, payload);
    return data;
  },
  singIn: async ({ email, password }) => {
    const { data } = await httpAuth.post(`signInWithPassword`, {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post("token", {
      grant_type: "refresh_token",
      refresh_token: localStorageService.getRefreshToken(),
    });
    return data;
  },
};

export default authService;
