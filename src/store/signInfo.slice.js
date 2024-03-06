import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signInfo: {}
}

export const signInfoSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clear: (state) => { //로그인 화면 시 넣기
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
    }
})

export const { addUserInfo1, clear, addUserInfo2 } = signInfoSlice.actions
export default signInfoSlice.reducer