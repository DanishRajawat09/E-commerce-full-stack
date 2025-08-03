import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./newPassword.css";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Input from "../input/Input";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useMutation } from "@tanstack/react-query";
import getApiPath from "../../utils/getApiPath";
import { newPasswordFn } from "../../api/handleAPi";
import { useDispatch, useSelector } from "react-redux";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../features/snackbarSlice";
const NewPassword = ({ role }) => {
  const [error, setError] = useState({
    error: "false",
    errorMess: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
 
  
  const dispatch = useDispatch();
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const { path, route } = getApiPath({ role, purpose: "newpassword" });
  const newPasswordMutation = useMutation({
    mutationFn: (newPassword) => newPasswordFn(path, newPassword),
    onSuccess: (res) => {
      dispatch(
        showSuccessMessage({
          successMessage: "Password has been successfully updated.",
        })
      );
      navigate(route);
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        dispatch(
          showErrorMessage({ errorMessage: "Access Denied , try again later" })
        );
      } else if (error.response?.status === 422) {
        dispatch(
          showErrorMessage({
            errorMessage:
              "New Password is less then 8 characters , or Not Valid",
          })
        );
      } else if (error.response?.status === 404) {
        dispatch(
          showErrorMessage({
            errorMessage: "Unable to Find Your Account, try again later",
          })
        );
      } else {
        dispatch(
          showErrorMessage({
            errorMessage: "Something Went Wrong while Updating Password",
          })
        );
      }
    },
  });

const handleNewPasswords = (passwords) => {
  const password = passwords.password?.trim();
  const confirmPassword = passwords.confirmPassword?.trim();

  setError({ ...error, error: false, errorMess: "" });

  if (!password || !confirmPassword) {
    setError({
      ...error,
      error: true,
      errorMess: "Password fields cannot be empty",
    });
    return;
  }

  if (password !== confirmPassword) {
    setError({
      ...error,
      error: true,
      errorMess: "Passwords do not match, try again",
    });
    return;
  }


  newPasswordMutation.mutate({ newPassword: password });
};
  return (
    <div className="newPassOverlay">
      <div className="newPassBox">
        <div className="newPassHeader">
          {role === "admin" ? (
            <h2 className="newPassHeading">
              Set Your New <span className="extendedTitle">Admin</span> Password
            </h2>
          ) : (
            <h2 className="newPassHeading">Enter New Password</h2>
          )}
        </div>

        <div className="newPassMessageArea">
          <p className="newPassInstructionText">
            {role === "admin"
              ? "Set a strong new password to secure your admin account and regain full access."
              : "Choose a new password that’s secure and easy for you to remember."}
          </p>
        </div>
        <form
          onSubmit={handleSubmit((passwords) => handleNewPasswords(passwords))}
        >
          <div className="inputGroup">
            <FormControl variant="outlined">
              <InputLabel
                error={
                  errors.password?.type === "required" ||
                  error.error === true ||
                  errors.password?.type === "minLength" || errors.password?.type === "pattern" 
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
                  error.error === true ||
                  errors.password?.type === "minLength" || errors.password?.type === "pattern"  
                    ? true
                    : false
                }
                id="outlined-adornment-password"
                type={"text"}
                label="Password"
              />
              {errors.password?.type === "required" && (
                <Typography
                  sx={{ color: "red", fontSize: "14px", marginTop: "3px" }}
                >
                  Password is Required
                </Typography>
              )}
              {errors.password?.type === "minLength" && (
                <Typography
                  sx={{ color: "red", fontSize: "14px", marginTop: "3px" }}
                >
                  Password must be 8 characters
                </Typography>
              )}
              {errors.password?.type === "pattern" && (
                <Typography
                  sx={{ color: "red", fontSize: "12px", marginTop: "3px" }}
                >
                  {errors.password?.message}
                </Typography>
              )}
            </FormControl>
          </div>
          <div className="inputGroup">
            <FormControl variant="outlined">
              <InputLabel
                error={
                  errors.confirmPassword?.type === "required" ||
                  error.error === true ||
                  errors.confirmPassword?.type === "minLength" || errors.confirmPassword?.type === "pattern"
                 
                    ? true
                    : false
                }
                htmlFor="outlined-adornment-confirm-password"
              >
                Confirm Password
              </InputLabel>
              <OutlinedInput
                {...register("confirmPassword", {
                  required: "ConfirmPassword is required",
                  minLength: 8,
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message:
                        "Confirm Password must contain at least 1 uppercase, 1 lowercase, and 1 number",
                    },
                })}
                error={
                  errors.confirmPassword?.type === "required" ||
                  error.error === true ||
                  errors.confirmPassword?.type === "minLength" || errors.confirmPassword?.type === "pattern"
        
                    ? true
                    : false
                }
                id="outlined-adornment-confirm-password"
                type={showPasswordConfirm ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPasswordConfirm
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPasswordConfirm}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
              {errors.confirmPassword?.type === "required" && (
                <Typography
                  sx={{ color: "red", fontSize: "14px", marginTop: "3px" }}
                >
                  Confime Password is Required
                </Typography>
              )}
              {errors.confirmPassword?.type === "minLength" && (
                <Typography
                  sx={{ color: "red", fontSize: "14px", marginTop: "3px" }}
                >
                  Confirm Password must be 8 characters
                </Typography>
              )}
           
            </FormControl>
          </div>

          <div className="newPassDivider" />
          {error.error && (
            <Typography sx={{ color: "red", fontSize: "14px" }}>
              {error.errorMess}
            </Typography>
          )}
          <div className="newPassButtonContainer">
            <button
              type="submit"
              className={
                role === "admin"
                  ? "newPassSubmitButtonAdmin"
                  : "newPassSubmitButton"
              }
            >
              Set New Password
            </button>
          </div>
        </form>
        <div className="newPassBackContainer">
          <button
            className="newPassBackButton"
            onClick={() => {

            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className="newPassBackText">Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
