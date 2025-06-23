const generateOtp = () => {
  let otp = "";

  for (let i = 0; i < 6; i++) {
    const randomVal = Math.floor(Math.random() * 10);

    otp += randomVal;
  }
  const expiry = new Date(Date.now() + 5 * 60 * 1000);

  return { otp, expiry };
};
const responseFormat = async (user) => {
  const userdata = user.toObject();
  const excludedKeys = ["password", "refreshToken", "otp", "otpExpiry", "_v"];
  const newdata = {};

  Object.keys(userdata).forEach((key) => {
    if (!excludedKeys.includes(key)) {
      newdata[key] = userdata[key];
    }
  });

  return newdata;
};

export { generateOtp, responseFormat };
