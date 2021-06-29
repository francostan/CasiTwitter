import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import tweetsReducer from "./tweets";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    tweets: tweetsReducer,
  },
});

export default store;
