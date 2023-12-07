import { useContext, useEffect, useState, createContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service.js";
import { toast } from "react-toastify";
import localStorageService from "../services/localstorage.service.js";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: import.meta.env.VITE_FIREBASE_KEY,
  },
});

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const { content } = await userService.getCurrentUser();
      setCurrentUser(content);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (localStorageService.getUserId()) {
      getUser();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const logout = () => {
    localStorageService.removeTokens();
    setCurrentUser(null);
    navigate("/");
  };

  const signIn = async ({ email, password }) => {
    try {
      const { data } = await toast.promise(
        httpAuth.post(`accounts:signInWithPassword`, {
          email,
          password,
          returnSecureToken: true,
        }),
        {
          pending: "SingIn is pending",
          success: "SignIn  succes 👌",
          error: "SignIn  failed 🤯",
        }
      );
      localStorageService.setTokens(data);
      await getUser();
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
      const { data } = await toast.promise(
        httpAuth.post(`accounts:signUp`, {
          email,
          password,
          returnSecureToken: true,
        }),
        {
          pending: "SingUp is pending",
          success: "SignUp  succes 👌",
          error: "SignUp  failed 🤯",
        }
      );
      localStorageService.setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        image:
          "https://api.dicebear.com/7.x/personas/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=" +
          email,
        rate: randomData(1, 5),
        completedMeetings: randomData(0, 200),
        ...rest,
      });
    } catch (error) {
      const { code, message } = error.response;
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
      const { content } = await toast.promise(userService.create(data), {
        pending: "Create User is pending",
        success: "Create User  succes 👌",
        error: "Create User  failed 🤯",
      });
      setCurrentUser(content);
    } catch (error) {
      setError(error);
    }
  };

  const updateUser = async (data) => {
    try {
      const { content } = await toast.promise(userService.updateUser(data), {
        pending: "User update is pending",
        success: "User update  succes 👌",
        error: "User update failed 🤯",
      });
      await getUser();
      console.log(content);
      setCurrentUser(content);
    } catch (error) {
      toast.error(error);
      setError(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isLoading, signUp, signIn, logout, updateUser }}
    >
      {isLoading ? "Loading..." : children}
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
