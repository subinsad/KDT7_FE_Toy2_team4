import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    currentChennel: null,
}

export const chennelSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setChennel: (state, action) => {
            state.currentChennel = action.payload
        },
    }
})

export const { setChennel } = chennelSlice.actions
export default chennelSlice.reducer