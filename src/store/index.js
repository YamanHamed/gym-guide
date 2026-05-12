// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import exercisesReducer from "./slices/exercisesSlice";
import authReducer from "./slices/authSlice ";
import splitsReducer from "./slices/splitsSlice";
import tipsReducer from "./slices/tipsSlice";
import chatReducer from "./slices/chatSlice";
export const store = configureStore({
  reducer: {
    search: searchReducer,
    exercises: exercisesReducer,
    auth: authReducer,
    splits: splitsReducer,
    tips: tipsReducer,
    chat: chatReducer,
  },
});
