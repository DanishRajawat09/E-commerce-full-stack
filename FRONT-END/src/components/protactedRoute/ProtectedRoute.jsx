import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import CheckUserLogin  from "../../utils/VerifyUserLogin";
const ProtectedRoute = () => {
   const { isLoggedIn, isLoading } = CheckUserLogin();

  if (isLoading) return <div>Loading...</div>;

  if (!isLoggedIn) return <Navigate to="/user/login" replace />;

  return <Outlet />;
};
export default ProtectedRoute