import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  const  user  = useSelector((state) => state.userDetail);
console.log(user);

  if (!user.userData.isVerified) {
    return <Navigate to="/user/login" replace />;
  }

  return <Outlet/>;
};
export default ProtectedRoute