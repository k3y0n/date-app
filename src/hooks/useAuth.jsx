import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service.js";
import { toast } from "react-toastify";
import localStorageService from "../services/localstorage.service.js";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const httpAuth = axios.create({
  baseURL: "123",
  withCredentials: true,
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

  const signUp = async ({ email, password, ...rest }) => {
    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
        import.meta.env.VITE_FIREBASE_KEY
      }`;
      const { data } = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
      });

      localStorageService.setTokens(data);
      await createUser({ _id: data.localId, ...rest });
      console.log(data);
    } catch (error) {
      setError(error);
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
    <AuthContext.Provider value={{ currentUser, signUp }}>
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
