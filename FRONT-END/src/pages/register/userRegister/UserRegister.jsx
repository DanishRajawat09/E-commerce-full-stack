import "./userRegister.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import { registerUser, sendOTP } from "../../../api/handleAPi";
import { useDispatch } from "react-redux";
import { addOTPData } from "../../../features/resendOTP.js";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../features/snackbarSlice.js";
const UserRegister = ({ role }) => {
  const [otpOptions, setOtpOptions] = useState(false);

  const [selectOption, setSelectOption] = useState({
    select: "",
    selectData: "",
  });

 
  const [apiData, setApiData] = useState({
    data: {},
    message: "",
  });

  const navigate = useNavigate();
  const disptach = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerMutation = useMutation({
    mutationFn: (formData) => {
      const path =
        role === "admin" ? "/api/v1/admin/register" : "/api/v1/user/register";
      console.log(path);

      return registerUser(path, formData);
    },
    onSuccess: (data) => {
      console.log(data);

      disptach(
        showSuccessMessage({ successMessage: data.data.message, open: true })
      );

      setApiData({
        ...apiData,
        data: { email: data.data.data.email, contact: data.data.data.contact },
      });

      setOtpOptions(true);
    },
    onError: (error) => {
      console.log(error);

      if (error.response?.status === 401) {
        disptach(
          showSuccessMessage({
            successMessage: error.response.data.message,
            open: true,
          })
        );
        setApiData({
          ...apiData,
          data: {
            email: error.response.data.data.email,
            contact: error.response.data.data.contact,
          },
        });
        setOtpOptions(true);
      } else if (error.response?.status === 422) {
        disptach(
          showErrorMessage({
            errorMessage:
              "please enter the Credentials properly, Enter email,contact and password again",
            open: true,
          })
        );
      } else if (error.response?.status === 500) {
        disptach(
          showErrorMessage({
            errorMessage: "Could not Create Your Account, Server Error",
            open: true,
          })
        );
      } else if (
        error.response?.status === 409 &&
        !error.response?.data?.message
      ) {
        disptach(
          showErrorMessage({
            errorMessage: `${role.toUpperCase()} is Already Exist, please login your Account`,
            open: true,
          })
        );
      } else {
        disptach(
          showErrorMessage({
            errorMessage:
              "Registration is not Complete due to Some Error, Please try again later",
            open: true,
          })
        );
      }
    },
  });

  const sendOTPMutation = useMutation({
    mutationFn: (data) => {
      const path =
        role === "admin"
          ? "/api/v1/admin/register/send-otp"
          : "/api/v1/user/register/send-otp";
      return sendOTP(path, data);
    },
    onSuccess: (data) => {
      console.log(data);
      disptach(
        showSuccessMessage({ successMessage: data.data.message, open: true })
      );
      setOtpOptions(false);
      disptach(
        addOTPData({
          contact:
            selectOption.select === "contact" ? selectOption.selectData : "",
          email: selectOption.select === "email" ? selectOption.selectData : "",
        })
      );
      navigate(role === "admin" ? `/admin/verifyotp` : `/user/verifyotp`);
    },
    onError: (error) => {
      console.log(error);
      if (error.response?.status === 422) {
        disptach(
          showErrorMessage({
            errorMessage:
              "Unauthorized Request or Unable to retrieve information",
            open: true,
          })
        );
      } else if (error.response?.status === 404) {
        disptach(
          showErrorMessage({
            errorMessage: `Access Denied or ${role.toUpperCase()}  is not Register Properly, try again later`,
            open: true,
          })
        );
      } else if (error.response?.status === 400) {
        disptach(
          showErrorMessage({
            errorMessage: "Credentials did'nt Send Properly",
            open: true,
          })
        );
      } else {
        disptach(
          showErrorMessage({
            errorMessage: "OTP is not sent due to Some Error, try again later",
            open: true,
          })
        );
      }
    },
  });

  const handleSendOtp = () => {
    if (selectOption.select === "" && selectOption.selectData === "") {
      disptach(
        showErrorMessage({
          errorMessage: "Please Select Atleast one Option for Send OTP",
          open: true,
        })
      );
      return;
    }
    console.log(selectOption);

    sendOTPMutation.mutate({
      contact: selectOption.select === "contact" ? selectOption.selectData : "",
      email: selectOption.select === "email" ? selectOption.selectData : "",
    });
  };
  return (
    <div className="authPage">
      <header className="authHeader">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="backIcon"
          onClick={() => navigate(-1)}
        />
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
            onSubmit={handleSubmit((formData) =>
              registerMutation.mutate(formData)
            )}
          >
            <div className="inputGroup">
              <FormControl>
                <InputLabel
                  error={
                    errors.email?.type === "required" ||
                    errors.email?.type === "validate"
                      ? true
                      : false
                  }
                  htmlFor="component-outlined-email"
                >
                  Email
                </InputLabel>
                <OutlinedInput
                  {...register("email", {
                    validate: (value) =>
                      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
                      "Enter a valid email Address",
                    required: "true",
                  })}
                  error={
                    errors.email?.type === "required" ||
                    errors.email?.type === "validate"
                      ? true
                      : false
                  }
                  id="component-outlined-email"
                  label="Email"
                />
                {errors.email?.type === "required" && (
                  <Typography
                    sx={{ color: "red", fontSize: "14px", marginTop: "3px" }}
                  >
                    Email is Required
                  </Typography>
                )}
                {errors.email?.type === "validate" && (
                  <Typography
                    sx={{ color: "red", fontSize: "14px", marginTop: "3px" }}
                  >
                    Email is Invalid
                  </Typography>
                )}
              </FormControl>
            </div>

            <div className="inputGroup">
              <FormControl>
                <InputLabel
                  error={
                    errors.contact?.type === "required" ||
                    errors.contact?.type === "validate"
                      ? true
                      : false
                  }
                  htmlFor="component-outlined-contact"
                >
                  Contact
                </InputLabel>
                <OutlinedInput
                  {...register("contact", {
                    required: "Enter your contact",
                    validate: (value) =>
                      /^[6-9]\d{9}$/.test(value) ||
                      "Enter Legit 10-digit Number",
                  })}
                  error={
                    errors.contact?.type === "required" ||
                    errors.contact?.type === "validate"
                      ? true
                      : false
                  }
                  id="component-outlined-contact"
                  label="Contact"
                />
                {errors.contact?.type === "required" && (
                  <Typography
                    sx={{ color: "red", fontSize: "14px", marginTop: "3px" }}
                  >
                    Contact is Required
                  </Typography>
                )}
                {errors.contact?.type === "validate" && (
                  <Typography
                    sx={{ color: "red", fontSize: "14px", marginTop: "3px" }}
                  >
                    Contact Number is Invalid
                  </Typography>
                )}
              </FormControl>
            </div>

            <div className="inputGroup">
              <FormControl variant="outlined">
                <InputLabel
                  error={errors.password?.type === "required" ? true : false}
                  htmlFor="outlined-adornment-password"
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  {...register("password", {
                    required: "password is required",
                  })}
                  error={errors.password?.type === "required" ? true : false}
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
                {errors.password?.type === "required" && (
                  <Typography
                    sx={{ color: "red", fontSize: "14px", marginTop: "3px" }}
                  >
                    Password is Required
                  </Typography>
                )}
              </FormControl>
            </div>

            <div className="formDivider" />

            <button
              type="submit"
              className={
                role === "admin" ? "authSubmitButtonAdmin" : "authSubmitButton"
              }
            >
              {registerMutation.isPending && registerMutation ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress size={25} color="white" />
                </Box>
              ) : (
                "Register"
              )}
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

            <div
              className="otpOption"
              onClick={() =>
                setSelectOption({
                  ...selectOption,
                  select: "email",
                  selectData: apiData.data.email,
                })
              }
            >
              <div className="otpLabel">
                <FontAwesomeIcon icon={faEnvelope} className="otpIcon" />
                <span className="otpText">{apiData.data.email}</span>
              </div>
              <div
                className={`otpCheck ${
                  selectOption.select === "email" ? "active" : ""
                }`}
              ></div>
            </div>

            <div className="formDivider" />

            <div
              className="otpOption"
              onClick={() =>
                setSelectOption({
                  ...selectOption,
                  select: "contact",
                  selectData: apiData.data.contact,
                })
              }
            >
              <div className="otpLabel">
                <FontAwesomeIcon icon={faPhone} className="otpIcon" />
                <span className="otpText">{apiData.data.contact}</span>
              </div>
              <div
                className={`otpCheck ${
                  selectOption.select === "contact" ? "active" : ""
                }`}
              ></div>
            </div>

            <div className="formDivider" />

            <div className="otpSendContainer">
              <button
                className="otpSendButton"
                onClick={() => {
                  handleSendOtp();
                }}
              >
                {sendOTPMutation.isPending && sendOTPMutation ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress size={25} color="white" />
                  </Box>
                ) : (
                  "SendOTP"
                )}
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
    </div>
  );
};

export default UserRegister;
