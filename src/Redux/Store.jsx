import { configureStore, combineReducers  } from '@reduxjs/toolkit';
import adminFeaturesSlice from "../Features/Admin_Features/AdminSlice"
import authFeatuureSlice from "../Authentication/AuthSlice"
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


const authPersistConfig = {
  key: "authReducer",
  storage,
};

const rootReducer = combineReducers({
  authReducer: persistReducer(authPersistConfig, authFeatuureSlice), //  persisted
  adminReducer:adminFeaturesSlice, // not persisted
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// const store = configureStore({
//   reducer: {
//     adminFeaturesSlice,
//     authFeatuureSlice
    
//   },
// });

// export default store;
export const persistor = persistStore(store);
