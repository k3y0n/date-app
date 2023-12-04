import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const professionSlice = createSlice({
  name: "profession",
  initialState: {
    enteties: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    professionRequested: (state) => {
      state.isLoading = true;
    },
    professionRecieved: (state, action) => {
      state.isLoading = false;
      state.enteties = action.payload;
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

export const getProfessions = () => (state) => state.profession.enteties;
export const getProfessionsStatus = () => (state) => state.profession.isLoading;
export const selectProfessionById = (state, profId) => {
  const profession = state.profession.enteties.find(
    (prof) => prof._id === profId
  );
  return profession || {};
};

export default professionSlice.reducer;
