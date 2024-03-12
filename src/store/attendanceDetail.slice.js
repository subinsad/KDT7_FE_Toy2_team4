import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';

export const fetchAttendanceById = createAsyncThunk(
    'user/fetchAttendanceById',
    async ({ attendanceId, user }, thunkAPI) => {
        const userData = user;
        try {
            const attendanceDoc = await getDoc(
                doc(db, 'users', userData.uid, 'attendance', attendanceId)
            );
            if (attendanceDoc.exists()) {
                return attendanceDoc.data();
            } else {
                throw new Error('No such document!');
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    attendanceDetail: {
        content: '',
        createdAt: '',
        attendanceStart: '',
        attendanceEnd: '',
        attendanceContext: '',
        category: '',
        title: '',
        name: '',
        id: '',
        state: '대기중',
    },
    error: '',
};

export const attendanceDetailSlice = createSlice({
    name: 'attendanceDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAttendanceById.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(fetchAttendanceById.fulfilled, (state, action) => {
                state.attendanceDetail = {
                    content: action.payload.content,
                    createdAt: action.payload.createdAt,
                    attendanceStart: action.payload.attendanceStart,
                    attendanceEnd: action.payload.attendanceEnd,
                    attendanceContext: action.payload.attendanceContext,
                    category: action.payload.category,
                    title: action.payload.title,
                    name: action.payload.name,
                    id: action.payload.id,
                    state: action.payload.state,
                };
                state.error = '';
            });
    },
});

export default attendanceDetailSlice.reducer;
