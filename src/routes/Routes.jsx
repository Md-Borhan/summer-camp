import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../layouts/Dashboard";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import ManageClasses from "../pages/Dashboard/ManageClasses";
import AddClass from "../pages/Dashboard/AddClass";
import MyClass from "../pages/Dashboard/MyClass";
import MyEnrolledClass from "../pages/Dashboard/MyEnrolledClass";
import MySelectedClass from "../pages/Dashboard/MySelectedClass";
import Welcome from "../pages/Dashboard/Welcome";
import Classes from "../pages/Classes/Classes";
import Instructor from "../pages/Instructor/Instructor";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import StudentRoute from "./StudentRoute";

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
      {
        path: "instructor",
        element: <Instructor />,
      },
      {
        path: "/classes",
        element: <Classes />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <Welcome />,
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manageClasses",
        element: (
          <AdminRoute>
            <ManageClasses />
          </AdminRoute>
        ),
      },
      {
        path: "addClass",
        element: (
          <InstructorRoute>
            <AddClass />
          </InstructorRoute>
        ),
      },
      {
        path: "myClass",
        element: (
          <InstructorRoute>
            <MyClass />
          </InstructorRoute>
        ),
      },
      {
        path: "myEnrolledClass",
        element: (
          <StudentRoute>
            <MyEnrolledClass />
          </StudentRoute>
        ),
      },
      {
        path: "mySelectedClass",
        element: (
          <StudentRoute>
            <MySelectedClass />
          </StudentRoute>
        ),
      },
      {
        path: "paymentHistory",
        element: (
          <StudentRoute>
            <PaymentHistory />
          </StudentRoute>
        ),
      },
      {
        path: "payment/:id",
        element: <Payment />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_api_url}/booked/${params.id}`),
      },
    ],
  },
]);
