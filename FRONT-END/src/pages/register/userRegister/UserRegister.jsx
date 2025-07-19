import "./userRegister.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VerifyOtp from "../../../components/verifyOtp/VerifyOtp";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../../api/handleAPi";
import Alert from "@mui/material/Alert";
// import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
// import '@coreui/coreui-pro/dist/css/coreui.min.css'
const UserRegister = ({ role }) => {
  const [otpOptions, setOtpOptions] = useState(false);
  const [showVerifyOTP, setShowVerifyOTP] = useState(false);
  const [selectOption, setSelectOption] = useState(null);
  const [showSuccess, setShowSuccess] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [errorM, setErrorM] = useState({
    open: false,
    errorCode: null,
    errorMessage: null,
  });

  const navigate = useNavigate();

  const handleCloseSuccess = () =>
    setShowSuccess({ ...showSuccess, open: false });
  const handleCloseError = () =>
    setErrorM({
      open: false,
      errorCode: null,
      errorMessage: null,
    });

  const { vertical, horizontal } = showSuccess;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const { register, handleSubmit } = useForm();

  const registerMutation = useMutation({
    mutationFn: (data) => registerUser("/api/v1/user/register", data),
    onSuccess: (data) => {
      console.log(data);

      setShowSuccess({ ...showSuccess, open: true });
    },
    onError: (error) => {
      setErrorM({
        open: true,
        errorCode: error.response?.status || 500,
        errorMessage: error.response?.data?.message || "Something went wrong",
      });
      if (error.response?.status === 409) {
        setOtpOptions(true);
      }
    },
  });

  console.log(errorM);

  return (
    <div className="authPage">
      <header className="authHeader">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="backIcon"
          onClick={() => navigate(-1)}
        />
        {showSuccess.open && (
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={showSuccess.open}
            autoHideDuration={6000}
            onClose={handleCloseSuccess}
            key={"success" + vertical + horizontal}
          >
            <Alert
              onClose={handleCloseSuccess}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Account Created Successfully
            </Alert>
          </Snackbar>
        )}

        {errorM.open && (
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={errorM.open}
            autoHideDuration={6000}
            onClose={handleCloseError}
            key={"error" + vertical + horizontal}
          >
            <Alert
              onClose={handleCloseError}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {errorM.errorMessage || "Something went wrong"}
            </Alert>
          </Snackbar>
        )}
      </header>

      <main className="authMain">
        <div className="authForm">
          <h2 className="authTitle">
            Create Your{" "}
            {role === "admin" ? (
              <span className="extendedTitle">Admin Account</span>
            ) : (
              "Account"
            )}
          </h2>
          <p className="authSubTitle">
            {role === "admin"
              ? "Start your business today  create your admin account and launch your online store."
              : "Join us and enjoy a smooth shopping experience from day one."}
          </p>
          <form
            onSubmit={handleSubmit((data) => registerMutation.mutate(data))}
          >
            <div className="inputGroup">
              <FormControl>
                <InputLabel htmlFor="component-outlined-email">
                  Email
                </InputLabel>
                <OutlinedInput
                  {...register("email", {
                    validate: (value) =>
                      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
                      "Enter a valid email Address",
                    required: "Email is Required",
                  })}
                  id="component-outlined-email"
                  label="Email"
                />
              </FormControl>
            </div>

            <div className="inputGroup">
              <FormControl>
                <InputLabel htmlFor="component-outlined-contact">
                  Contact
                </InputLabel>
                <OutlinedInput
                  {...register("contact", {
                    required: "Enter your contact",
                    // validate : (value) => /^[6-9]\d{9}$/.test(value) || "Enter Legit 10-digit Number",
                  })}
                  id="component-outlined-contact"
                  label="Contact"
                />
              </FormControl>
            </div>

            <div className="inputGroup">
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  {...register("password", {
                    required: "password is required",
                  })}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </div>

            <div className="formDivider" />

            <button
              type="submit"
              className={
                role === "admin" ? "authSubmitButtonAdmin" : "authSubmitButton"
              }
            >
              Register
            </button>
          </form>

          <div className="authSwitch">
            <span className="authSwitchText">Have an account?</span>
            <Link
              to={role === "admin" ? "/admin/login" : "/user/login"}
              className={
                role === "admin" ? "authSwitchLinkAdmin" : "authSwitchLink"
              }
            >
              Log In
            </Link>
          </div>
        </div>
      </main>

      {otpOptions && (
        <div className="otpOverlay">
          <div className="otpModal">
            <div className="otpHeader">
              <h2 className="otpTitle">Select Verification Method </h2>
              {/* <div className="closeOtpBtn" onClick={() => setOtpOptions(false)}>
                <FontAwesomeIcon icon={faXmark} className="closeOtpIcon" />
              </div> */}
            </div>

            <div className="formDivider" />

            <div className="otpOption" onClick={() => setSelectOption("email")}>
              <div className="otpLabel">
                <FontAwesomeIcon icon={faEnvelope} className="otpIcon" />
                <span className="otpText">ibnfarooq070@gmail.com</span>
              </div>
              <div
                className={`otpCheck ${
                  selectOption === "email" ? "active" : ""
                }`}
              ></div>
            </div>

            <div className="formDivider" />

            <div
              className="otpOption"
              onClick={() => setSelectOption("contact")}
            >
              <div className="otpLabel">
                <FontAwesomeIcon icon={faPhone} className="otpIcon" />
                <span className="otpText">7976755425</span>
              </div>
              <div
                className={`otpCheck ${
                  selectOption === "contact" ? "active" : ""
                }`}
              ></div>
            </div>

            <div className="formDivider" />

            <div className="otpSendContainer">
              <button
                className="otpSendButton"
                onClick={() => {
                  setOtpOptions(false);
                  setShowVerifyOTP(true);
                }}
              >
                Send OTP
              </button>
            </div>
            <div className="otpBackContainer">
              <button
                className="otpBackButton"
                onClick={() => setOtpOptions(false)}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span className="otpBackText">Go Back</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {showVerifyOTP && <VerifyOtp func={setShowVerifyOTP} />}
    </div>
  );
};

export default UserRegister;
