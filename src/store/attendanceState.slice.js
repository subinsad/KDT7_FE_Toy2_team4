import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { updateDoc, doc } from 'firebase/firestore';

export const updateAttendanceState = createAsyncThunk(
    'attendance/updateAttendanceState',
    async ({ id, state }, thunkAPI) => {
        try {
            const attendaceDocRef = doc(
                db,
                'users',
                '0vY0bqw8nKT7lGbiSotVrcVzZWs1', // 관리자의 uid를 사용
                'attendance',
                id // 출석 데이터의 id
            );
            await updateDoc(attendaceDocRef, { state }); // 출석 데이터의 상태를 업데이트
            return { id, state };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    error: '',
};

export const attendanceStateSlice = createSlice({
    name: 'attendanceState',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(updateAttendanceState.rejected, (state, action) => {
            state.error = action.payload;
        });
    },
});

export default attendanceStateSlice.reducer;
