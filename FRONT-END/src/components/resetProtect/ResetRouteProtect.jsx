import { useState, useEffect } from "react";

import { Outlet, Navigate } from "react-router-dom";

import { checkResetToken } from "../../api/handleAPi";

const ResetRouteProtect = ({ role, expectedPurpose, redirectPath }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    validateToken();
  }, []);

  const validateToken = async () => {
  console.log(role , expectedPurpose , redirectPath);
  
    try {
      const tokenAccess = await checkResetToken(
        role === "admin"
          ? `/api/v1/admin/resettoken?purpose=${expectedPurpose}`
          : `/api/v1/user/resettoken?purpose=${expectedPurpose}`
      );
      console.log(tokenAccess);

      if (tokenAccess?.data?.statusCode === 200) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } catch (error) {
      console.log("Token check failed:", error.message);
      setIsValid(false); // Important: fallback on error
    }
  };

  if (isValid === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isValid === false) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ResetRouteProtect;
