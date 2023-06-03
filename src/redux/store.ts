import {configureStore} from '@reduxjs/toolkit';
import userSlice from "./slices/authUserSlice";
import {useDispatch} from "react-redux";
import registrationSlice from "./slices/registrationSlice";
import searchSlice from "./slices/searchSlice";


export const store = configureStore({
  reducer: {
    userSlice,
    registrationSlice,
    searchSlice
  }
  ,
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()