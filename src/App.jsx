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
import { userIsAdmin } from "./store/user.slice";
import { fetchUserInfo } from "./store/salaryAdmin.slice";

function App() {
  const { isAdmin, isAdminLoading } = useSelector((state) => state.userSlice)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      dispatch(userIsAdmin(user))
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);


  useEffect(() => {
    const user = auth.currentUser
    if (isAdmin) {
      dispatch(fetchUserInfo(user))
    }
  }, [isAdmin]);

  return (
    <>
      {isAdminLoading && (<Loading />)}
      <GlobalStyles />
      {isAdmin ? <RouterProvider router={AdminRouter} /> : <RouterProvider router={router} />}
    </>
  );
}

export default App;
