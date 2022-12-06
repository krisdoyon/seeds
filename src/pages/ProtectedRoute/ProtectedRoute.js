import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner/Spinner";

const ProtectedRoute = ({ admin = false, children }) => {
  const { isLoggedIn, userId, isLoading } = useSelector((state) => state.auth);
  if (isLoading) {
    return <Spinner />;
  }
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  if (admin && userId !== process.env["REACT_APP_ADMIN_ID"]) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
