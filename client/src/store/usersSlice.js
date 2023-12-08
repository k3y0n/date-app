import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service.js";
import authService from "../services/auth.service.js";
import localStorageService from "../services/localstorage.service.js";
import { generateAuthError } from "../utils/generateAuthError.js";

const initialState = localStorageService.getAccessToken()
  ? {
      enteties: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      enteties: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userRequested: (state) => {
      state.isLoading = true;
    },
    userRecieved: (state, action) => {
      state.isLoading = false;
      state.enteties = action.payload;
      state.dataLoaded = true;
    },
    usersRequestFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.enteties)) {
        state.enteties = [];
      }
      state.enteties.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.enteties = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    userUpdateSuccessed: (state, action) => {
      state.enteties[
        state.enteties.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    },
    authRequested: (state) => {
      state.error = null;
    },
  },
});

export const {
  userRequested,
  userRecieved,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userCreated,
  userLoggedOut,
  userUpdateSuccessed,
} = usersSlice.actions;

const authRequested = createAction("users/authRequested");
const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");

export const signIn =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.singIn({ email, password });
      dispatch(authRequestSuccess({ userId: data.localId }));
      localStorageService.setTokens(data);
      window.location.href = "/"; //bad practice
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generateAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const signUp = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.signUp(payload);
    localStorageService.setTokens(data);
    console.log("payload", payload);
    dispatch(authRequested({ userId: data.localId }));
    window.location.href = "/"; //bad practice
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const updateUser = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested());
  try {
    const { content } = await userService.updateUser(payload);
    dispatch(userUpdateSuccessed(content));
  } catch (error) {
    dispatch(userUpdateFailed(error.message));
  }
};

export const loadUserList = () => async (dispatch) => {
  dispatch(userRequested());
  try {
    const { content } = await userService.get();
    dispatch(userRecieved(content));
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};

export const logOut = () => (dispatch) => {
  localStorageService.removeTokens();
  dispatch(userLoggedOut());
};

export const getUsers = () => (state) => state.users.enteties;
export const getUsersStatus = () => (state) => state.users.isLoading;
export const selectUserById = (userId) => (state) => {
  if (state.users.enteties) {
    const users = state.users.enteties.find((user) => user._id === userId);
    return users || {};
  }
};
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getCurrentUserData = () => (state) => {
  return state.users.enteties
    ? state.users.enteties.find((u) => u._id === state.users.auth.userId)
    : null;
};
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getAuthErrors = () => (state) => state.users.error;

export default usersSlice.reducer;
