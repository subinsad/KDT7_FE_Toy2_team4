import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../firebase';
import {
    collection,
    query,
    orderBy,
    limit,
    getDocs,
    getDoc,
} from 'firebase/firestore';

// 글 작성,조회 작성
export const fetchAttendance = createAsyncThunk(
    'user/fetchAttendance',
    async (user, thunkAPI) => {
        try {
            if (user) {
                const attendQuery = query(
                    collection(db, 'users', user.uid, 'attendance'),
                    orderBy('createdAt', 'desc'),
                    limit(10)
                );
                const snapshot = await getDocs(attendQuery);
                const attends = snapshot.docs.map((doc) => {
                    const {
                        content,
                        createdAt,
                        attendanceStart,
                        attendanceEnd,
                        category,
                        title,
                        attendanceContext,
                        userId,
                        name,
                        position,
                        state,
                    } = doc.data();

                    return {
                        content,
                        createdAt,
                        attendanceStart,
                        attendanceEnd,
                        attendanceContext,
                        category,
                        title,
                        userId,
                        name,
                        position,
                        id: doc.id,
                        state,
                    };
                });
                return attends;
            } else {
                return [];
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    attendance: [],
    error: '',
};

export const attendanceSlice = createSlice({
    name: 'attendance',
    initialState,
    reducers: {
        addAttendance: (state, action) => {
            state.attendance = [...state.attendance, action.payload];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAttendance.fulfilled, (state, action) => {
                state.attendance = [...action.payload];
            })
            .addCase(fetchAttendance.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});
export const { addAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;
