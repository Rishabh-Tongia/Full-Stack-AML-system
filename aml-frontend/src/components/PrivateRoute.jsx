import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRole }) => {
  const { token, role } = useSelector((state) => state.auth);

  // If not logged in
  if (!token) {
    return <Navigate to="/" />;
  }

  // If role not allowed
  if (allowedRole && role !== allowedRole) {
    return <Navigate to={`/${role}`} />;
  }

  return children;
};

export default PrivateRoute;