import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [], //{객체 형식으로 들어감}
};
export const projectUserSlice = createSlice({
  name: "projectuser",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    clearUser: (state) => {
      state.users = [];
    },
    deleteUser: (state, action) => {
      const newArray = state.users.filter((user) => user.uid !== action.payload);
      state.users = newArray;
    },
  },
});
export const { addUser, clearUser, deleteUser } = projectUserSlice.actions;
export default projectUserSlice.reducer;
