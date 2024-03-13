import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const fetchMySalary = createAsyncThunk(
    "salary/fetchMySalary",
    async (user) => {
        if (user) {
            const userDocRef = doc(db, "users", user.uid, "salary", "data")
            const userDoc = await getDoc(userDocRef)
            const userData = userDoc.data()
            return {
                baseSalary: userData.baseSalary || "",
                bonusSalary: userData.bonusSalary || "",
                SpecialSalary: userData.specialSalary || "",
            };
        }
    }
)

const initialState = {
    salary: {}
}

export const salarySlice = createSlice({
    name: 'salary',
    initialState,
    reducers: {
        clearSalary: (state) => {
            state.salary = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMySalary.fulfilled, (state, action) => {
            state.salary = {
                ...state.salary,
                baseSalary: action.payload.baseSalary,
                bonusSalary: action.payload.bonusSalary,
                SpecialSalary: action.payload.SpecialSalary,
            }
        });
    },
})

export const { clearSalary } = salarySlice.actions
export default salarySlice.reducer