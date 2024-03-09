import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const fetchUserInfo = createAsyncThunk(
    "salary/fetchUserInfo",
    async (user) => {
        if (user) {
            const userDocRef = doc(db, "users", user.uid, "salary", "data")
            const userDoc = await getDoc(userDocRef)
            const userData = userDoc.data()
            const allUserInfo = userData.allUserInfo || [];
            return { allUserInfo };
        }
    }
)


const initialState = {
    userInfo: [
    ],
}

export const salaryAdminSlice = createSlice({
    name: 'salaryAdmin',
    initialState,
    reducers: {
        clearSalaryInfo: (state) => {
            state.userInfo = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.userInfo = action.payload.allUserInfo;
        });
    },
})

export const { clearSalaryInfo } = salaryAdminSlice.actions
export default salaryAdminSlice.reducer