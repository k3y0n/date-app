import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const professionSlice = createSlice({
  name: "profession",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    professionRequested: (state) => {
      state.isLoading = true;
    },
    professionRecieved: (state, action) => {
      state.isLoading = false;
      state.entities = action.payload;
    },
    professionRejected: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { professionRequested, professionRecieved, professionRejected } =
  professionSlice.actions;

export const loadProfessionList = () => async (dispatch) => {
  dispatch(professionRequested());
  try {
    const { content } = await professionService.get();
    dispatch(professionRecieved(content));
  } catch (error) {
    dispatch(professionRejected(error.message));
  }
};

export const getProfessions = () => (state) => state.profession.entities;
export const getProfessionsStatus = () => (state) => state.profession.isLoading;
export const getProfessionById = (id) => (state) => {
  if (state.profession.entities) {
    return state.profession.entities.find((p) => p._id === id);
  }
};

export default professionSlice.reducer;
