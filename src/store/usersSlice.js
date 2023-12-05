import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localstorage.service";
import { randomData } from "../utils/randomData";
import { toast } from "react-toastify";

const initialState = localStorageService.getToken()
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
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFailed = createAction("users/createUserFailed");
const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");

export const signIn =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.singIn({ email, password });
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.localId }));
    } catch (error) {
      dispatch(authRequestFailed(error.message));
    }
  };

export const signUp =
  ({ email, password, ...rest }) =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.signUp({ email, password });
      localStorageService.setTokens(data);
      dispatch(authRequested({ userId: data.localId }));
      dispatch(
        createUser({
          _id: data.localId,
          email,
          image:
            "https://api.dicebear.com/7.x/personas/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=" +
            email,
          rate: randomData(1, 5),
          completedMeetings: randomData(0, 200),
          ...rest,
        })
      );
    } catch (error) {
      dispatch(authRequestFailed(error.message));
    }
  };

export const createUser = (payload) => async (dispatch) => {
  dispatch(userCreateRequested());
  try {
    const { content } = await toast.promise(userService.create(payload), {
      pending: "Create User is pending",
      success: "Create User  succes 👌",
      error: "Create User  failed 🤯",
    });
    dispatch(userCreated(content));
  } catch (error) {
    dispatch(createUserFailed(error.message));
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

export default usersSlice.reducer;
