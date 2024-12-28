"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ParkState {
  value: any;
}

const initialState: ParkState = {
  value: null,
};

export const ParkSlice = createSlice({
  name: "park",
  initialState,
  reducers: {
    addPark: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPark } = ParkSlice.actions;

const parkSliceReducer = ParkSlice.reducer;
export default parkSliceReducer;
