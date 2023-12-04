import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualityReducer from "./qualitySlice";

const rootReducer = combineReducers({
  quality: qualityReducer,
});

export const createStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
