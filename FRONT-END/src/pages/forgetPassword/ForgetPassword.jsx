import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "./forgetPass.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../api/handleAPi";
import { useDispatch } from "react-redux";
import { showErrorMessage, showSuccessMessage } from "../../features/snackbarSlice";
import getApiPath from "../../utils/getApiPath";
import { addOTPData } from "../../features/resendOTP";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const ForgetPassword = ({ role }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
   const {path , route} = getApiPath({role : role , purpose : "forgotpassword"})
  const forgotPasswordMutation = useMutation({
    mutationFn: (formData) => {
   
      return forgotPassword(path, formData);
    },
    onSuccess: (res) => {
      dispatch(
        showSuccessMessage({
          successMessage: `OTP Send to Your ${
            (res.email && "email") ||
            (res.contact && "contact")
          } `,
        })
      );

      dispatch(addOTPData({email: res.email , contact : res.contact}))
    navigate(route) 
    },
    onError: (error) => {
    if (error.response?.status === 422) {
           dispatch(
             showErrorMessage({
               errorMessage:
                 "Unauthorized Request or Unable to retrieve information",
               open: true,
             })
           );
         } else if (error.response?.status === 404) {
           dispatch(
             showErrorMessage({
               errorMessage: `Access Denied or ${role.toUpperCase()}  is not Register Properly, try again later`,
               open: true,
             })
           );
         } else if (error.response?.status === 400) {
           dispatch(
             showErrorMessage({
               errorMessage: "Credentials did'nt Send Properly",
               open: true,
             })
           );
         } else {
           dispatch(
             showErrorMessage({
               errorMessage: "Something went wrong while sending OTP. Please try again.",
               open: true,
             })
           );
         }
    },
  });

  return (
    <div className="forgetWrapper">
      <main className="forgetMain">
        <div className="forgetFormBox">
          <h2 className="forgetTitle">
            Forgot your{" "}
            {role === "admin" ? (
              <span className="extendedTitle">Password?</span>
            ) : (
              "Password?"
            )}
          </h2>
          <p className="forgetSubtitle">
            {role === "admin"
              ? "Enter your email or phone number linked to your admin account.We’ll send you a verification code to reset your password and secure your access."
              : " Don’t worry — we’ll send you a verification code to reset your password securely."}
          </p>

          <form
            onSubmit={handleSubmit((formData) =>
              forgotPasswordMutation.mutate(formData)
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

            <div className="forgetDivider" />

            <button
              type="submit"
              className={
                role === "admin"
                  ? "forgetSubmitButtonAdmin"
                  : "forgetSubmitButton"
              }
              disabled={forgotPasswordMutation.isPending && forgotPasswordMutation }
            >
              {forgotPasswordMutation.isPending && forgotPasswordMutation ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress size={25} color="white" />
                </Box>
              ) : (
                "Find and Send OTP"
              )}
            </button>
          </form>

          <div className="forgetBackContainer">
            <button className="forgetBackButton" onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faArrowLeft} />
              <span className="forgetBackText">Go Back</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgetPassword;
