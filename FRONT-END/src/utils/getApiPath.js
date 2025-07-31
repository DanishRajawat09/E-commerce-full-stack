const getApiPath = ({ role, purpose }) => {
  const ApiPaths = {
    register: {
      user: "/api/v1/user/registe",
      admin: "/api/v1/admin/register",
    },
    createProfile: {
      user: "/api/v1/user/profile/create",
      admin: "/api/v1/admin/profile/create-profile",
    },
    sendOTPRegister: {
      user: "/api/v1/user/register/send-otp",
      admin: "/api/v1/admin/register/send-otp",
    },
    logIn: {
      user: "/api/v1/user/login",
      admin: "/api/v1/admin/login",
    },
    forgotPassword : {
        user : "/api/v1/user/password/forgot/send-otp",
        admin : "/api/v1/admin/password/forget/send-otp"
    },
     logOut : {
        user  : "/api/v1/user/logout",
        admin : "/api/v1/admin/logout"
     } 
  };

  const roleKey = role.trim() === "admin" ? "admin" : "user";

  if (!ApiPaths[purpose.trim()] || !ApiPaths[purpose.trim()][roleKey]) {
    throw new Error(
      `No API path found for role "${role}" and purpose "${purpose}"`
    );
  }

  return ApiPaths[purpose.trim()][roleKey];
};

export default getApiPath;
