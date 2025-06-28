import { NODE_ENV } from "../../config/env.js";

const cookieOption = (maxAge, sameSite = "none") => {
  const options = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    maxAge: maxAge,
    sameSite,
  };
  return options;
};

export default cookieOption;
