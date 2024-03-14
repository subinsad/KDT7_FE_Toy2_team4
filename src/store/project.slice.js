import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const fetchProject = createAsyncThunk("Projects/fetchProject", async () => {
  const projectDocRef = collection(db, "project");
  const projectDoc = await getDocs(projectDocRef);
  const projectData = projectDoc.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return { projectData };
});

export const fetchMyProject = createAsyncThunk("Projects/fetchMyProject", async (user) => {
  if (user) {
    const userDocRef = doc(db, "users", user.uid, "project", "data");
    const userDoc = await getDoc(userDocRef);
    const userData = userDoc.data();
    return { userData };
  }
});

const initialState = {
  allProjectInfo: [],
  myProjectInfo: {},
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
    builder.addCase(fetchMyProject.fulfilled, (state, action) => {
      state.myProjectInfo = action.payload.userData;
    });
  },
});

export const { clearProjectInfo } = projectSlice.actions;
export default projectSlice.reducer;
