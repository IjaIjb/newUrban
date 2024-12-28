import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { USER_TYPE, User } from "../../common/types";

export interface IAuthState {
  authUser: User | null;
  userAuthType: USER_TYPE | null;
}

const initialState: IAuthState = {
  authUser: null,
  userAuthType: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<any>) => {
      state.authUser = action.payload;
    },
    userAuthType: (state, action: PayloadAction<any>) => {
      state.userAuthType = action.payload;
    },
    deAuth: (state) => {
      state.authUser = null;
      state.userAuthType = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, deAuth, userAuthType } = authSlice.actions;

export const authReducer = authSlice.reducer;
