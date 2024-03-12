import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';

export const fetchAttendanceInfo = createAsyncThunk(
    'attendance/fetchAttendanceInfo',
    async (user) => {
        if (user) {
            const attendanceDocRef = doc(
                db,
                'users',
                user.uid,
                'attendance',
                'data'
            );
            const attendanceDoc = await getDoc(attendanceDocRef);
            const attendanceData = attendanceDoc.data();
            const allattendanceInfo = attendanceData.allAttendanceInfo;
            return { allattendanceInfo };
        }
    }
);

const initialState = {
    allAttendance: [],
    error: '',
};

export const attendanceAdminSlice = createSlice({
    name: 'attendanceAdmin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAttendanceInfo.fulfilled, (state, action) => {
            state.allAttendance = action.payload.allattendanceInfo;
        });
    },
});

export default attendanceAdminSlice.reducer;
