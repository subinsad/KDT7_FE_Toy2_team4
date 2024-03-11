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
                const userData = userDoc.data() || {};
                if (!userDoc.data()) {
                    try {
                        const state = thunkAPI.getState();
                        const { name, email, team, position, phone, shortInfo, image, backgroundImage } = state.signInfoSlice.signInfo;
                        const currentYear = new Date().getFullYear(); // 현재 년도
                        const currentMonth = new Date().getMonth() + 1;

                        await setDoc(userDocRef, {
                            name: name,
                            email: email,
                            phone: phone,
                            position: position,
                            shortInfo: shortInfo,
                            team: team,
                            userImg: image,
                            userBg: backgroundImage,
                            joinYear: currentYear,
                            joinMonth: currentMonth

                        }, { merge: true });
                        return {
                            shortInfo,
                            phone,
                            position,
                            name,
                            email,
                            team,
                            uid: user.uid, //추가,
                            userImg: image,
                            userBg: backgroundImage,
                            joinYear: currentYear,
                            joinMonth: currentMonth
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
                    team: userData.team || "",
                    uid: user.uid, //추가,
                    joinYear: userData.joinYear || 0, // 기본값 설정
                    joinMonth: userData.joinMonth || 0 // 기본값 설정
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
        shortInfo: "",
        uid: "",
        joinYear: "",
        joinMonth: ""
    },
    isAdmin: false,
    isAdminLoading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUser: (state) => {
            state.userInfo = {
                name: "",
                email: "",
                userImg: "",
                userBg: "",
                phone: "",
                position: "",
                team: "",
                shortInfo: "",
                uid: "",
                joinYear: "",
                joinMonth: ""
            },
                state.isAdmin = false
        },
        editUserInfo: (state, action) => {
            state.userInfo = {
                ...state.userInfo,
                phone: action.payload.phone,
                position: action.payload.position,
                team: action.payload.team,
                shortInfo: action.payload.shortInfo
            }
        },
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
                    shortInfo: action.payload.shortInfo,
                    uid: action.payload.uid, //추가
                    joinYear: action.payload.joinYear,
                    joinMonth: action.payload.joinMonth
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

export const { clearUser, editUserInfo, editUserImg, editUserBg } = userSlice.actions
export default userSlice.reducer