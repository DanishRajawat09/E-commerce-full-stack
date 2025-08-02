const getApiPath = ({ role, purpose, key }) => {

  const roleKey = role === "admin" ? "admin" : "user";
  const purposeKey = purpose?.trim().toLowerCase();


  const apiPaths = {
    userdata: {
      user: { path: "/api/v1/user/" },
    },

    register: {
      user: { path: "/api/v1/user/register" },
      admin: { path: "/api/v1/admin/register" },
    },

    sendotpregister: {
      user: {
        path: "/api/v1/user/register/send-otp",
        route: "/user/verifyotp",
      },
      admin: {
        path: "/api/v1/admin/register/send-otp",
        route: "/admin/verifyotp",
      },
    },

    registerverify: {
      user: {
        path: "/api/v1/user/register/verify-otp",
        resendOTPRoute: "/api/v1/user/register/send-otp",
        route: "/user/profile",
      },
      admin: {
        path: "/api/v1/admin/register/verify-otp",
        resendOTPRoute: "/api/v1/admin/register/send-otp",
        route: "/admin/profile",
      },
    },

    createprofile: {
      user: {
        path: "/api/v1/user/profile/create",
        route: "/user/address",
      },
      admin: {
        path: "/api/v1/admin/profile/create-profile",
        route: "/admin/address",
      },
    },

    login: {
      user: {
        path: "/api/v1/user/login",
        route: "/",
      },
      admin: {
        path: "/api/v1/admin/login",
        route: "/admin",
      },
    },

    forgotpassword: {
      user: {
        path: "/api/v1/user/password/forgot/send-otp",
        route: "/user/forgot/password/verifyotp",
      },
      admin: {
        path: "/api/v1/admin/password/forget/send-otp",
        route: "/admin/forgot/password/verifyotp",
      },
    },

    resetpasswordverify: {
      user: {
        path: "/api/v1/user/password/forgot/verify-otp",
        resendOTPRoute: "/api/v1/user/password/forgot/send-otp",
        route: "/user/new/password",
      },
      admin: {
        path: "/api/v1/admin/password/forget/verify-otp",
        resendOTPRoute: "/api/v1/admin/password/forget/send-otp",
        route: "/admin/new/password",
      },
    },

    logout: {
      user: {
        path: "/api/v1/user/logout",
        route: "/",
      },
      admin: {
        path: "/api/v1/admin/logout",
        route: "/admin",
      },
    },

    addaddress: {
      user: {
        path: "/api/v1/user/address/add-address",
        route: "/",
      },
      admin: {
        path: "/api/v1/admin/profile/add/shop-address",
        route: "/admin",
      },
    },
  };


  const roleData = apiPaths[purposeKey];
  if (!roleData) {
    throw new Error(`Invalid API purpose: "${purpose}"`);
  }

  const pathData = roleData[roleKey];
  if (!pathData) {
    throw new Error(
      `No API path found for role "${role}" and purpose "${purpose}"`
    );
  }


  return key ? pathData[key] : pathData;
};

export default getApiPath;
