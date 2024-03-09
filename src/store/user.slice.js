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
                    shortInfo: userData.shortInfo || "",
                    phone: userData.phone || "",
                    position: userData.position || "",
                    userBg: userData.userBg || "",
                    userImg: userData.userImg || "",
                    name: userData.name || "",
                    email: userData.email || "",
                    team: userData.team || ""
                };
            } catch (error) {
                return thunkAPI.rejectWithValue(error.message);
            }
        }
    }
)

export const userIsAdmin = createAsyncThunk(
    "user/isAdmin",
    async (user) => {
        if (user) {
            const userDocRef = doc(db, "users", user.uid, "userInfo", "data");
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                const role = userData.role;
                if (role === "admin") {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
)

const initialState = {
    userInfo: {
        name: "",
        email: "",
        userImg: "",
        userBg: "",
        phone: "",
        position: "",
        team: "",
        shortInfo: ""
    },
    isAdmin: false,
    isAdminLoading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        editUserImg: (state, action) => {
            state.userInfo = {
                ...state.userInfo,
                userImg: action.payload
            }
        },
        editUserBg: (state, action) => {
            state.userInfo = {
                ...state.userInfo,
                userBg: action.payload
            }
        },
        clearUser: (state) => {
            state.userInfo = {
                name: "",
                email: "",
                userImg: "",
                userBg: "",
                phone: "",
                position: "",
                team: "",
                shortInfo: ""
            },
                state.isAdmin = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
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
            .addCase(userIsAdmin.pending, (state) => {
                state.isAdminLoading = true;
            })
            .addCase(userIsAdmin.fulfilled, (state, action) => {
                state.isAdmin = action.payload;
                state.isAdminLoading = false;
            })
    }
})

export const { editUserImg, editUserBg, clearUser } = userSlice.actions
export default userSlice.reducer