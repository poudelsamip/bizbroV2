import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const ProtectedRoute = ({ children }) => {
  const { dataLoaded } = useContext(AuthContext);

  if (!dataLoaded) {
    return "";
  }

  if (dataLoaded && !localStorage.getItem("loggedIn")) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
