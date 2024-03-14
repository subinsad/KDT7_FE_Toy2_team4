import React, { useState } from "react";
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
import NotFound from "../pages/NotFound";
import AttendanceWrite from "../components/Board/AttendanceWrite";
import AttendanceRead from "../components/Board/AttendanceRead";
import MypageEdit from "../pages/MypageEdit";
import ProtectedRoute from "./ProtectedRoute";
import Chat from "../pages/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "main",
        element: <Main />,
      },
      {
        path: "work",
        element: <Work />,
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
        path: 'attendance/read/:attendanceId',
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
      {
        path: "chat",
        element: <Chat />,
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
export default router;
