import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ResetRouteProtect = ({ cookieName, expectedPurpose, redirectPath }) => {
  const [isValid, setIsValid] = useState(null); 

  useEffect(() => {
    validateToken();
  }, []);

  const validateToken = () => {
    const token = Cookies.get(cookieName);

    
    if (!token) {
      setIsValid(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

    
      if (decoded.exp < now || decoded.purpose !== expectedPurpose) {
        Cookies.remove(cookieName);
        setIsValid(false);
        return;
      }

     
      setIsValid(true);
    } catch (error) {
      Cookies.remove(cookieName);
      setIsValid(false);
    }
  };


  if (isValid === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }


  if (!isValid) {
    return <Navigate to={redirectPath} replace />;
  }

  
  return <Outlet />;
};

export default ResetRouteProtect;