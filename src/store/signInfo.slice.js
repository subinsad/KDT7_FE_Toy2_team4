import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signInfo: {}
}

export const signInfoSlice = createSlice({
    name: 'sign',
    initialState,
    reducers: {
        clearUserInfo: (state) => { //로그인 화면 시 넣기
            state.signInfo = {}
        },
        addUserInfo1: (state, action) => {
            const { name, email, password } = action.payload
            state.signInfo = {
                ...state.signInfo,
                name,
                email,
                password,
            }
        },
        addUserInfo2: (state, action) => {
            const { team, position, phone, shortInfo } = action.payload
            state.signInfo = {
                ...state.signInfo,
                team,
                position,
                phone,
                shortInfo,
            }
        },
        addUserImg: (state, action) => {
            state.signInfo = {
                ...state.signInfo,
                image: action.payload
            }
        },
        addUserBg: (state, action) => {
            state.signInfo = {
                ...state.signInfo,
                backgroundImage: action.payload
            }
        }
    }
})

export const { addUserInfo1, clearUserInfo, addUserInfo2, addUserImg, addUserBg } = signInfoSlice.actions
export default signInfoSlice.reducer