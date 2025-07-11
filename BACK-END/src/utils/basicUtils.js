const generateOtp = () => {
  let otp = "";

  for (let i = 0; i < 6; i++) {
    const randomVal = Math.floor(Math.random() * 10);

    otp += randomVal;
  }
  const expiry = new Date(Date.now() + 5 * 60 * 1000);

  return { otp, expiry };
};
const responseFormat = async (user , excludedKeys) => {
  const userdata = user.toObject();


  const newdata = {};

  Object.keys(userdata).forEach((key) => {
    if (!excludedKeys.includes(key)) {
      newdata[key] = userdata[key];
    }
  });
  if (newdata.avatar) {
  delete newdata.avatar.publicId }
  return newdata;
};

const resetTokenNameFunc = async (role) => {
  let resetTokenName = role === "admin" ? "adminResetToken" : "userResetToken";

  return resetTokenName;
};

const verifyTokenName = async (role) => {
  let verifyAccessTokenName =
    role === "admin" ? "adminAccessToken" : "userAccessToken";
  let verifyRefreshTokenName =
    role === "admin" ? "adminRefreshToken" : "userRefreshToken";
  return { verifyAccessTokenName, verifyRefreshTokenName };
};
export { generateOtp, responseFormat, resetTokenNameFunc, verifyTokenName };
