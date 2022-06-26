import { configureStore } from "@reduxjs/toolkit";
import authTokenReducer from "./redux/authTokens";
import { setupListeners } from "@reduxjs/toolkit/query";
import { fetchData } from "./redux/PrivateApi";
import UserDetailsReducer from "./redux/UserDetails";
import OtherUserIdReducer from "./redux/OtherUserId";
import FetchPostReducer from "./redux/FetchPost";
import ChatThreadReducer from "./redux/ChatThreads";
import ChatUserReducer from "./redux/ChatUser";

export const store = configureStore({
  reducer: {
    authToken: authTokenReducer,
    [fetchData.reducerPath]: fetchData.reducer,
    userDetails: UserDetailsReducer,
    otherUserId:OtherUserIdReducer,
    fetchPost:FetchPostReducer,
    chatThread : ChatThreadReducer,
    chatUser:ChatUserReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchData.middleware),
});

setupListeners(store.dispatch);
