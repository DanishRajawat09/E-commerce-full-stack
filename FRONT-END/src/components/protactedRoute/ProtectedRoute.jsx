import { Navigate } from "react-router-dom";

import useCheckUserLogin from "../../utils/VerifyUserLogin";
const ProtectedRoute = ({children}) => {
   const { isLoggedIn, isLoading  } = useCheckUserLogin();

  if (isLoading) return <div>Loading...</div>;

  if (!isLoggedIn) return <Navigate to="/user/login" replace />;

  return children;
};
export default ProtectedRoute