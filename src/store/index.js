<<<<<<< HEAD
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist/es/constants";
import signInfoSlice from "./signInfo.slice";
import userSlice from "./user.slice";
import salaryAdminSlice from "./salaryAdmin.slice";
import salarySlice from "./salary.slice";
import chennelSlice from "./chennel.slice";
import projectSlice from "./project.slice";
import projectUserSlice from "./projectUser.slice";

const rootReducer = combineReducers({
  signInfoSlice: signInfoSlice,
  userSlice: userSlice,
  salaryAdminSlice: salaryAdminSlice,
  salarySlice: salarySlice,
  projectSlice: projectSlice,
  projectUserSlice: projectUserSlice,
  chennelSlice: chennelSlice,
});

const persistConfig = {
  key: "root",
  storage: storage,
=======
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist/es/constants';
import signInfoSlice from './signInfo.slice';
import userSlice from './user.slice';
import attendanceSlice from './attendance.slice';
import salaryAdminSlice from './salaryAdmin.slice';
import attendanceAdminSlice from './attendanceAdmin.slice';

const rootReducer = combineReducers({
    signInfoSlice: signInfoSlice,
    userSlice: userSlice,
    attendanceSlice: attendanceSlice,
    salaryAdminSlice: salaryAdminSlice,
    attendanceAdminSlice: attendanceAdminSlice,
});

const persistConfig = {
    key: 'root',
    storage: storage,
>>>>>>> feature/attendance
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
<<<<<<< HEAD
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
=======
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
>>>>>>> feature/attendance
});

export const persistor = persistStore(store);
