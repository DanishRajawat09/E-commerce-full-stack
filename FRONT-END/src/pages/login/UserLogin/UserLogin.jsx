import "./userLogin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { logIn } from "../../../api/handleAPi";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../features/snackbarSlice";
import getApiPath from "../../../utils/getApiPath";
import { waitForLogin } from "../../../utils/waitLogin";

const UserLogin = ({ role }) => {
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const queryClient = useQueryClient();
  const { path, route } = getApiPath({ role: role, purpose: "login" });
  const logInMutation = useMutation({
    mutationFn: (formData) => {
      return logIn(path, formData);
    },
    onSuccess: async () => {
      dispatch(
        showSuccessMessage({
          successMessage: `${role.toUpperCase()} Login SuccessFully`,
        })
      );
      waitForLogin({ queryClient, navigate, route });
    },
    onError: (error) => {
      console.log(error.response.status);

      if (error.response.status === 422) {
        dispatch(
          showErrorMessage({
            errorMessage: "please provide the credentials properly",
          })
        );
      } else if (error.response.status === 404) {
        dispatch(
          showErrorMessage({
            errorMessage: "No Account Found, Register first ",
          })
        );
      } else if (error.response.status === 403) {
        dispatch(
          showErrorMessage({
            errorMessage:
              "Account is not Verified, complete the verification firt",
          })
        );
      } else if (error.response.status === 401) {
        dispatch(
          showErrorMessage({ errorMessage: "Invalid Password try again" })
        );
      } else {
        dispatch(showErrorMessage({ errorMessage: "Something went wrong" }));
      }
    },
  });
  return (
    <div className="loginPage">
      <header className="loginHeader">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="backIcon"
          onClick={() => navigate(-1)}
        />
      </header>

      <main className="loginMain">
        <div className="loginForm">
          <h2 className="loginTitle">
            Welcome Back{" "}
            {role === "admin" && <span className="extendedTitle">Admin</span>}
          </h2>

          <p className="loginSubtitle">
            {role === "admin"
              ? "Enter your credentials to securely access the admin dashboard."
              : "We’re glad to have you back — let’s continue where you left off."}
          </p>
          <form
            onSubmit={handleSubmit((formData) =>
              logInMutation.mutate(formData)
            )}
          >
            <div className="inputGroup">
              <FormControl>
                <InputLabel
                  error={
                    errors.emailContact?.type === "required" ||
                    errors.emailContact?.type === "validate"
                      ? true
                      : false
                  }
                  htmlFor="component-outlined-emailContact"
                >
                  Email or Contact
                </InputLabel>
                <OutlinedInput
                  {...register("emailContact", {
                    required: "Enter Email or Contact",
                    validate: (value) =>
                      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
                      /^[6-9]\d{9}$/.test(value) ||
                      "Enter a valid email or 10-digit mobile number",
                  })}
                  error={
                    errors.emailContact?.type === "required" ||
                    errors.emailContact?.type === "validate"
                      ? true
                      : false
                  }
                  id="component-outlined-emailContact"
                  label="Email or Contact"
                />
              </FormControl>
              {errors.emailContact?.type === "required" && (
                <Typography
                  sx={{ color: "red", fontSize: "14px", marginTop: "3px" }}
                >
                  Email or Contact is Required
                </Typography>
              )}
              {errors.emailContact?.type === "validate" && (
                <Typography
                  sx={{ color: "red", fontSize: "14px", marginTop: "3px" }}
                >
                  Email or Contact Number is Invalid
                </Typography>
              )}
            </div>

            <div className="formGroup">
              <FormControl variant="outlined">
                <InputLabel
                  error={
                    errors.password?.type === "required" ||
                    errors.password?.type === "minLength" ||
                    errors.password?.type === "pattern"
                      ? true
                      : false
                  }
                  htmlFor="outlined-adornment-password"
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message:
                        "Password must contain at least 1 uppercase, 1 lowercase, and 1 number",
                    },
                  })}
                  error={
                    errors.password?.type === "required" ||
                    errors.password?.type === "minLength" ||
                    errors.password?.type === "pattern"
                      ? true
                      : false
                  }
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
                {errors.password?.type === "pattern" && (
                  <Typography
                    sx={{ color: "red", fontSize: "12px", marginTop: "3px" }}
                  >
                    {errors.password?.message}
                  </Typography>
                )}
                {errors.password?.type === "minLength" && (
                  <Typography
                    sx={{ color: "red", fontSize: "14px", marginTop: "3px" }}
                  >
                    Password Must be 8 characters
                  </Typography>
                )}
              </FormControl>
            </div>

            <div className="formDivider" />

            <div className="forgotContainer">
              <Link
                to={
                  role === "admin"
                    ? "/admin/forgetpassword"
                    : "/user/forgetpassword"
                }
                className={
                  role === "admin"
                    ? "forgotLinkAdminLogin"
                    : "forgotLinkUserLogin"
                }
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className={
                role === "admin"
                  ? "submitButtonAdminLogin"
                  : "submitButtonUserLogin"
              }
            >
              {logInMutation.isPending && logInMutation ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress size={25} color="white" />
                </Box>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <button className="googleButton">
            <FontAwesomeIcon icon={faGoogle} color="white" />
          </button>

          <div className="signupContainer">
            <span className="signupText">New on Shop.co?</span>
            <Link
              to={role === "admin" ? "/admin/signup" : "/user/signup"}
              className={
                role === "admin"
                  ? "signupLinkAdminLogin"
                  : "signupLinkUserLogin"
              }
            >
              Sign Up
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserLogin;
