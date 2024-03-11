import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Main from "../pages/Main";
import Work from "../pages/Work";
import StyleGuide from "../pages/Styleguide";
import Mypage from "../pages/Mypage";
import Login from "../pages/Login";
import CreateAccount from "../pages/CreateAccount";
import Attendance from "../pages/Attendance";
import About from "../pages/About";
import Salary from "../pages/Salary";
import NotFound from "../pages/NotFound";
import SalaryWrite from "../components/Board/SalaryWrite";
import AttendanceWrite from "../components/Board/AttendanceWrite";
import AttendanceRead from "../components/Board/AttendanceRead";
import MypageEdit from "../pages/MypageEdit";
import ProtectedRoute from "./ProtectedRoute";

const AdminRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute>
      <Layout />
    </ProtectedRoute>,
    children: [
      {
        path: "main",
        element: <Main />,
      },
      {
        path: "work",
        element: <Work />,
      },
      //salaryAdmin, salary/write는 admin 계정에서만 라우팅 될 수 있게 path 변경. 
      {
        path: "salaryAdmin",
        element: <Salary />,
      },
      {
        path: "salary/write",
        element: <SalaryWrite />,
      },
      {
        path: "attendance",
        element: <Attendance />,
      },
      {
        path: "attendance/write",
        element: <AttendanceWrite />,
      },
      {
        path: "attendance/read",
        element: <AttendanceRead />,
      },
      {
        path: "styleguide",
        element: <StyleGuide />,
      },
      {
        path: "mypage",
        element: <Mypage />,
      },
      {
        path: "mypage/edit",
        element: <MypageEdit />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "create-account",
    element: <CreateAccount />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default AdminRouter;
