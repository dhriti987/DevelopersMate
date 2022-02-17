import { configureStore } from "@reduxjs/toolkit";
import authTokenReducer from "./redux/authTokens";
import { setupListeners } from "@reduxjs/toolkit/query";
import { fetchData } from "./redux/PrivateApi";

export const store = configureStore({
  reducer: {
    authToken: authTokenReducer,
    [fetchData.reducerPath]: fetchData.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchData.middleware),
});

setupListeners(store.dispatch)
