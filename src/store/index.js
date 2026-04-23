// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import splitReducer from "./slices/splitSlice";
import searchReducer from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    splits : splitReducer,
    search : searchReducer,

    // Add other slices here (e.g., user: userReducer)
  },
});
