import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const fetchUserInfo = createAsyncThunk(
    "user/fetchUserInfo",
    async (user, thunkAPI) => {
        if (user) {
            try {
                const userDocRef = doc(db, "users", user.uid, "userInfo", "data")
                const userDoc = await getDoc(userDocRef)

                const userData = userDoc.data() || {}; // 데이터가 없을 경우 빈 객체로 초기화

                const shortInfo = userData.shortInfo || ""
                const phone = userData.phone || ""
                const position = userData.position || ""
                const userBg = userData.userBg || ""
                const userImg = userData.userImg || ""
                const team = userData.team || ""
                const name = userData.name || ""
                const email = userData.email || ""

                if (!userDoc.data()) {
                    try {
                        const state = thunkAPI.getState();
                        const { name, email, team, position, phone, shortInfo } = state.signInfoSlice.signInfo;
                        await setDoc(userDocRef, {
                            name: name,
                            email: email,
                            phone: phone,
                            position: position,
                            shortInfo: shortInfo,
                            team: team
                        }, { merge: true });

                        return {
                            shortInfo,
                            phone,
                            position,
                            name,
                            email,
                            team
                        }

                    } catch (error) {
                        console.error(error);
                    }
                }
                return {
                    shortInfo,
                    phone,
                    position,
                    userBg,
                    userImg,
                    name,
                    email,
                    team
                };
            } catch (error) {
                return thunkAPI.rejectWithValue(error.message);
            }
        }
    }
)

const initialState = {
    userInfo: {
    },
    isLoading: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.isLoading = false
                state.userInfo = {
                    ...state.userInfo,
                    name: action.payload.name,
                    email: action.payload.email,
                    userImg: action.payload.userImg || "",
                    userBg: action.payload.userBg || "",
                    phone: action.payload.phone,
                    position: action.payload.position,
                    team: action.payload.team,
                    shortInfo: action.payload.shortInfo
                };
            })
    }
})

export default userSlice.reducer