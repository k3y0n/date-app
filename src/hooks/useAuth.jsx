import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service.js";
import { toast } from "react-toastify";
import localStorageService from "../services/localstorage.service.js";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: import.meta.env.VITE_FIREBASE_KEY,
  },
});

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState(null);

  const getUser = async () => {
    try {
      const { content } = await userService.getCurrentUser();
      setCurrentUser(content);
    } catch (error) {}
  };

  useEffect(() => {
    if (localStorageService.getUserId()) {
      getUser();
    }
  }, []);

  useEffect(() => {
    if (!error) {
      toast.error(error);
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
      getUser();
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

  const randomData = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const signUp = async ({ email, password, ...rest }) => {
    try {
      const { data } = await httpAuth.post(`accounts:signUp`, {
        email,
        password,
        returnSecureToken: true,
      });
      localStorageService.setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        rate: randomData(1, 5),
        completedMeetings: randomData(0, 200),
        ...rest,
      });
    } catch (error) {
      const { code, message } = error.response.d;
      console.log(error);
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "Пользователь с таким Email уже существует",
          };
          throw errorObject;
        }
      }
    }
  };

  const createUser = async (data) => {
    try {
      const { content } = await userService.create(data);
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
