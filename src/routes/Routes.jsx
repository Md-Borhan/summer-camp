import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../layouts/Dashboard";
import AllUsers from "../pages/Dashboard/ManageUsers";
import AllClasses from "../pages/Dashboard/ManageClasses";
import AddClass from "../pages/Dashboard/AddClass";
import MyClass from "../pages/Dashboard/MyClass";
import MyEnrolledClass from "../pages/Dashboard/MyEnrolledClass";
import MySelectedClass from "../pages/Dashboard/MySelectedClass";
import Welcome from "../pages/Dashboard/Welcome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Welcome />,
      },
      {
        path: "allUsers",
        element: <AllUsers />,
      },
      {
        path: "allClasses",
        element: <AllClasses />,
      },
      {
        path: "addClass",
        element: <AddClass />,
      },
      {
        path: "myClass",
        element: <MyClass />,
      },
      {
        path: "myEnrolledClass",
        element: <MyEnrolledClass />,
      },
      {
        path: "mySelectedClass",
        element: <MySelectedClass />,
      },
    ],
  },
]);
