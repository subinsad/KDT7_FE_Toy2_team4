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
import attendanceDetailSlice from './attendanceDetail.slice';
import attendanceAdminSlice from './attendanceAdmin.slice';
import attendanceStateSlice from './attendanceState.slice';

const rootReducer = combineReducers({
    signInfoSlice: signInfoSlice,
    userSlice: userSlice,
    attendanceSlice: attendanceSlice,
    attendanceDetailSlice: attendanceDetailSlice,
    salaryAdminSlice: salaryAdminSlice,
    attendanceAdminSlice: attendanceAdminSlice,
    attendanceStateSlice: attendanceStateSlice,
});

const persistConfig = {
    key: 'root',
    storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
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
});

export const persistor = persistStore(store);
