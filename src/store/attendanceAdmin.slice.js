import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

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

export const updateAttendance = createAsyncThunk(
    'attendance/updateAttendance',
    async (info, thunkAPI) => {
        const state = thunkAPI.getState();
        const { userSlice } = state;
        const { userInfo } = userSlice;

        const { attendanceData, attendanceId } = info;

        const userDocRef = doc(db, 'users', userInfo.uid, 'attendance', 'data');
        await updateDoc(userDocRef, {
            allAttendanceInfo: arrayUnion({
                title: attendanceData.title,
                attendanceContext: attendanceData.attendanceContext,
                category: attendanceData.category,
                attendanceStart: attendanceData.attendanceStart,
                attendanceEnd: attendanceData.attendanceEnd,
                createdAt: new Date().toLocaleString(),
                name: userInfo.name,
                position: userInfo.position,
                userId: userInfo.uid,
                state: info.state,
                id: attendanceId,
            }),
        });

        return {
            title: attendanceData.title,
            attendanceContext: attendanceData.attendanceContext,
            category: attendanceData.category,
            attendanceStart: attendanceData.attendanceStart,
            attendanceEnd: attendanceData.attendanceEnd,
            createdAt: new Date().toLocaleString(),
            name: userInfo.name,
            position: userInfo.position,
            userId: userInfo.uid,
            state: info.state,
            id: attendanceId,
        };
    }
);

const initialState = {
    allAttendance: [],
    error: '',
};
export const attendanceAdminSlice = createSlice({
    name: 'attendanceAdmin',
    initialState,
    reducers: {
        updateAttendanceState: (state, action) => {
            state.attendanceState = action.payload; // 출석 상태 업데이트
        },
        clearAttendanceState(state, action) {
            return {
                ...state,
                allAttendance: [], // 출석 정보 초기화
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAttendanceInfo.fulfilled, (state, action) => {
            state.allAttendance = action.payload.allattendanceInfo;
        });
    },
});

export const { updateAttendanceState, clearAttendanceState } =
    attendanceAdminSlice.actions;

export default attendanceAdminSlice.reducer;
