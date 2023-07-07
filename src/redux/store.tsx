import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";

import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const rootPersistConfig = {
  key: "root",
  storage,
};

const userPersistConfig = {
  key: "user",
  storage: storageSession,
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
