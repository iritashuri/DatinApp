import { configureStore } from "@reduxjs/toolkit";
import meetCuteSlice from "./meetCuteSlice";

const store = configureStore({
  reducer: {
    meetCute: meetCuteSlice,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;