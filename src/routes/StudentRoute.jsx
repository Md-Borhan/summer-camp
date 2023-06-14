import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router";
import Loader from "../loader/Loader";
import useStudent from "../hooks/useStudent";

const StudentRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isStudent, isStudentLoading] = useStudent();
  console.log(isStudent);
  const location = useLocation();

  if (loading || isStudentLoading) {
    return <Loader />;
  }

  if (user && isStudent.role === "student") {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default StudentRoute;
