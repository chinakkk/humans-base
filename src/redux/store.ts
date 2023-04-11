import {configureStore} from '@reduxjs/toolkit';
import userSlice from "./slices/userSlice";
import {useDispatch} from "react-redux";
import registrationSlice from "./slices/registrationSlice";


export const store = configureStore({
  reducer: {
    userSlice,
    registrationSlice
  }
  ,
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()