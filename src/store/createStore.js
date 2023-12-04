import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualityReducer from "./qualitySlice";
import professionsReducer from "./professionsSlice";

const rootReducer = combineReducers({
  quality: qualityReducer,
  profession: professionsReducer,
});

export const createStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
