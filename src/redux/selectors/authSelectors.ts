import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectAuthState = (state: RootState) => state.authUser;

export const selectAuthUser = createSelector(
  [selectAuthState],
  (auth) => auth.authUser
);

export const selectUserType = createSelector(
  [selectAuthState],
  (auth) => auth.userAuthType
);
