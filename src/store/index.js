import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist/es/constants";
import signInfoSlice from "./signInfo.slice";
import userSlice from "./user.slice";
import salaryAdminSlice from "./salaryAdmin.slice";
import salarySlice from "./salary.slice";
<<<<<<< HEAD
import chennelSlice from "./chennel.slice";


const rootReducer = combineReducers({
    signInfoSlice: signInfoSlice,
    userSlice: userSlice,
    salaryAdminSlice: salaryAdminSlice,
    salarySlice: salarySlice,
    chennelSlice: chennelSlice
})
=======
import projectSlice from "./project.slice";
import projectUserSlice from "./projectUser.slice";

const rootReducer = combineReducers({
  signInfoSlice: signInfoSlice,
  userSlice: userSlice,
  salaryAdminSlice: salaryAdminSlice,
  salarySlice: salarySlice,
  projectSlice: projectSlice,
  projectUserSlice: projectUserSlice,
});
>>>>>>> feature/work

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

<<<<<<< HEAD
export const persistor = persistStore(store)
=======
export const persistor = persistStore(store);
>>>>>>> feature/work
