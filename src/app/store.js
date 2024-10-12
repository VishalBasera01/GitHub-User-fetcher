import { configureStore } from "@reduxjs/toolkit";
import gitUserReducer from "../features/gitUserSlice";
const store = configureStore({
  reducer: {
    user: gitUserReducer,
  },
});
export default store;
