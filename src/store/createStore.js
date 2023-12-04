import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualityReducer from "./qualitySlice";
import professionsReducer from "./professionsSlice";
import usersReducer from "./usersSlice.js";

const rootReducer = combineReducers({
  quality: qualityReducer,
  profession: professionsReducer,
  users: usersReducer,
});

export const createStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
