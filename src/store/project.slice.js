import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const fetchProject = createAsyncThunk("Projects/fetchUserInfo", async () => {
  const projectDocRef = collection(db, "project");
  const projectDoc = await getDocs(projectDocRef);
  // const projectData = projectDoc.data();
  const projectData = projectDoc.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return { projectData };

  // const allUserInfo = userData.allUserInfo;
  // const allSalaryInfo = userData.allSalaryInfo;
});

// export const fetchSalaryInfo = createAsyncThunk("Projects/fetchSalaryInfo", async (info, thunkAPI) => {
//   const state = thunkAPI.getState();
//   const { user, salary, type } = info;
//   const { uid } = state.userSlice.userInfo;
//   const userDocRef = doc(db, "users", uid, "salary", "data");
//   await updateDoc(userDocRef, {
//     allSalaryInfo: arrayUnion({
//       uid: user.uid,
//       name: user.name,
//       userImg: user.userImg,
//       position: user.position,
//       salary,
//       type,
//     }),
//   });
//   return {
//     uid: user.uid,
//     name: user.name,
//     userImg: user.userImg,
//     position: user.position,
//     salary,
//     type,
//   };
// });

const initialState = {
  allProjectInfo: [],
};

export const projectSlice = createSlice({
  name: "Projects",
  initialState,
  reducers: {
    clearProjectInfo: (state) => {
      state.allProjectInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProject.fulfilled, (state, action) => {
      state.allProjectInfo = action.payload.projectData;
    });
  },
});

export const { clearProjectInfo } = projectSlice.actions;
export default projectSlice.reducer;
