import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";

const qualitySlice = createSlice({
  name: "quality",
  initialState: {
    enteties: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    qualityRequested: (state) => {
      state.isLoading = true;
    },
    qualityRecieved: (state, action) => {
      state.isLoading = false;
      state.enteties = action.payload;
    },
    qualityRejected: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { qualityRequested, qualityRecieved, qualityRejected } =
  qualitySlice.actions;

export const loadQualityList = () => async (dispatch) => {
  dispatch(qualityRequested());
  try {
    const { content } = await qualityService.get();
    dispatch(qualityRecieved(content));
  } catch (error) {
    dispatch(qualityRejected(error));
  }
};

export const getQualities = () => (state) => state.quality.enteties;
export const getQualitiesStatus = () => (state) => state.quality.isLoading;
export const selectQualityById = (state, qualityId) => {
  const quality = state.quality.enteties.find((qual) => qual._id === qualityId);
  return quality || {};
};

export default qualitySlice.reducer;
