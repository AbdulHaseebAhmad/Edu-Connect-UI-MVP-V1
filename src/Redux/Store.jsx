import { configureStore, combineReducers } from "@reduxjs/toolkit";
import adminFeaturesSlice from "../Features/Admin_Features/AdminSlice";
import authFeaturesSlice from "../Features/Auth_Features/AuthSlice";
import schoolFeaturesSlice from "../Features/School_Features/SchoolSlice";
import analyticsSlice from "../Features/Admin_Features/AnalyticsSlice";
import studentAppslice from "../Features/Students_Features/StudentAppSlice"
import studentProfileSlice from "../Features/Students_Features/StudentProfileslice"

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "authReducer",
  storage,
};
const profilePersistconfig = {
  key: "profileReducer",
  storage,
};

const rootReducer = combineReducers({
  authReducer: persistReducer(authPersistConfig, authFeaturesSlice), //  persisted
  adminReducer: adminFeaturesSlice, // not persisted
  schoolReducer: schoolFeaturesSlice, // not persisted
  analyticsReducer: analyticsSlice,// not persisted
  studentReducer :studentAppslice, //not persisted
  profileReducer:persistReducer(profilePersistconfig,studentProfileSlice)
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// const store = configureStore({
//   reducer: {
//     adminFeaturesSlice,
//     authFeaturesSlice

//   },
// });

// export default store;
export const persistor = persistStore(store);
