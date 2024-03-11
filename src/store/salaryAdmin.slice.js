import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const fetchUserInfo = createAsyncThunk(
    "salary/fetchUserInfo",
    async (user) => {
        if (user) {
            const userDocRef = doc(db, "users", user.uid, "salary", "data")
            const userDoc = await getDoc(userDocRef)
            const userData = userDoc.data()
            const allUserInfo = userData.allUserInfo;
            const allSalaryInfo = userData.allSalaryInfo;
            return { allUserInfo, allSalaryInfo };
        }
    }
)

export const fetchSalaryInfo = createAsyncThunk(
    "salary/fetchSalaryInfo",
    async (info, thunkAPI) => {
        const state = thunkAPI.getState();
        const { user, salary, type } = info
        const { uid } = state.userSlice.userInfo;
        const userDocRef = doc(db, "users", uid, "salary", "data")
        await updateDoc(userDocRef, {
            allSalaryInfo: arrayUnion({
                uid: user.uid,
                name: user.name,
                userImg: user.userImg,
                position: user.position,
                salary,
                type,
            })
        });
        return {
            uid: user.uid,
            name: user.name,
            userImg: user.userImg,
            position: user.position,
            salary,
            type
        }
    }
)

const initialState = {
    allUserInfo: [],
    allSalaryInfo: []
}

export const salaryAdminSlice = createSlice({
    name: 'salaryAdmin',
    initialState,
    reducers: {
        clearSalaryInfo: (state) => {
            state.allUserInfo = [],
                state.allSalaryInfo = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.allUserInfo = action.payload.allUserInfo;
            state.allSalaryInfo = action.payload.allSalaryInfo;
        });
        builder.addCase(fetchSalaryInfo.fulfilled, (state, action) => {
            const { uid, name, userImg, position, salary, type } = action.payload;
            if (!Array.isArray(state.allSalaryInfo)) {
                state.allSalaryInfo = [];
            }
            state.allSalaryInfo.push({ uid, name, userImg, position, salary, type });
        });
    },
})

export const { clearSalaryInfo } = salaryAdminSlice.actions
export default salaryAdminSlice.reducer