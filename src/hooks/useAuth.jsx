import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service.js";
import { toast } from "react-toastify";
import localStorageService from "../services/localstorage.service.js";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: import.meta.env.VITE_FIREBASE_KEY,
  },
});

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!error) {
      toast(error);
      setError(null);
    }
  }, [error]);

  const signIn = async ({ email, password }) => {
    try {
      const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
        email,
        password,
        returnSecureToken: true,
      });

      localStorageService.setTokens(data);
      console.log(data);
    } catch (error) {
      setError(error);
      const { code, message } = error.response.data.error;
      if (code == 400) {
        switch (message) {
          case "INVALID_LOGIN_CREDENTIALS":
            throw new Error("Email или пароль введены некорректно");
          default:
            throw new Error("Слишком много попыток входа. Попробуйте позже");
        }
      }
    }
  };

  const signUp = async ({ email, password, ...rest }) => {
    try {
      const { data } = await httpAuth.post({
        email,
        password,
        returnSecureToken: true,
      });

      localStorageService.setTokens(data);
      await createUser({ _id: data.localId, ...rest });
      console.log(data);
    } catch (error) {
      setError(error);
      const { code, message } = error.response.data.error;
      if (code == 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObj = {
            email: "Email already exists",
            code: 400,
          };
          throw errorObj;
        }
      }
    }
  };

  const createUser = async (data) => {
    try {
      const { content } = userService.create(data);
      setCurrentUser(content);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, signUp, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AuthProvider;
