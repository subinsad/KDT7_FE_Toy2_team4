<<<<<<< HEAD
import { RouterProvider } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";
import router from "./routes/PageRouter";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import AdminRouter from "./routes/AdminRouter";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loading from "./components/Loading";
import { clearUser, userIsAdmin } from "./store/user.slice";
import { clearSalaryInfo, fetchUserInfo } from "./store/salaryAdmin.slice";
import { clearSalary } from "./store/salary.slice";
=======
import { RouterProvider } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
import router from './routes/PageRouter';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import AdminRouter from './routes/AdminRouter';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Loading from './components/Loading';
import { clearUser, userIsAdmin } from './store/user.slice';
import { fetchUserInfo } from './store/salaryAdmin.slice';
import { fetchAttendanceInfo } from './store/attendanceAdmin.slice';
>>>>>>> feature/attendance

function App() {
    const { isAdmin, isAdminLoading } = useSelector((state) => state.userSlice);
    const dispatch = useDispatch();

<<<<<<< HEAD
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user === null) {
        dispatch(clearUser());
        dispatch(clearSalaryInfo())
        dispatch(clearSalary())
      } else {
        dispatch(userIsAdmin(user));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
=======
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user === null) {
                dispatch(clearUser());
            } else {
                dispatch(userIsAdmin(user));
            }
        });
        return () => {
            unsubscribe();
        };
    }, [dispatch]);
>>>>>>> feature/attendance

    useEffect(() => {
        const user = auth.currentUser;
        if (user !== null && isAdmin) {
            dispatch(fetchUserInfo(user));
            dispatch(fetchAttendanceInfo(user));
        }
    }, [isAdmin, dispatch]);

    return (
        <>
            {isAdminLoading && <Loading />}
            <GlobalStyles />
            {isAdmin ? (
                <RouterProvider router={AdminRouter} />
            ) : (
                <RouterProvider router={router} />
            )}
        </>
    );
}

export default App;
