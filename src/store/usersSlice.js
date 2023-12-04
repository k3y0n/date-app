import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localstorage.service";
import { randomData } from "../utils/randomData";
import { toast } from "react-toastify";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    enteties: null,
    isLoading: true,
    error: null,
    auth: null,
    isLoggedIn: false,
  },
  reducers: {
    userRequested: (state) => {
      state.isLoading = true;
    },
    userRecieved: (state, action) => {
      state.isLoading = false;
      state.enteties = action.payload;
    },
    userRejected: (state, action) => {
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
    authRequested: (state) => {
      state.error = null;
    },
  },
});

export const {
  userRequested,
  userRecieved,
  userRejected,
  authRequestSuccess,
  authRequestFailed,
} = usersSlice.actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFail = createAction("users/createUserFailed");

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
        userCreateRequest({
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
    dispatch(createUserFail(error.message));
  }
};

export const loadUserList = () => async (dispatch) => {
  dispatch(userRequested());
  try {
    const { content } = await userService.get();
    dispatch(userRecieved(content));
  } catch (error) {
    dispatch(userRejected(error.message));
  }
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

export default usersSlice.reducer;
