import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { authReducer } from "./reducers/userSlice";
import storage from "./customStorage";
import logger from "redux-logger";

const userPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["authUser", "userAuthType"],
};

const rootReducer = combineReducers({
  authUser: persistReducer(userPersistConfig, authReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger as any),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
