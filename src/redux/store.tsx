import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import uiReducer from "./slices/uiSlice";
import hubspotReducer from "./slices/hubspotSlice";
import storage from "redux-persist/lib/storage";

import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

const rootPersistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  hubspot: hubspotReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
