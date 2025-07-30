import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./verifyOtp.css";
import { useRef, useState } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { sendOTP, verifyOTP } from "../../api/handleAPi";

import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../features/snackbarSlice";
const VerifyOtp = ({ role }) => {
  const inputs = useRef([]);
  const navigate = useNavigate();
  const OTPData = useSelector((state) => state.otp);

  const dispatch = useDispatch();

  const [OTP, setOTP] = useState("");

  const handleChange = (e, index) => {
    const value = e.target.value;
    setOTP((prev) => (prev += value));

    if (/^\d$/.test(value)) {
      if (index < 5) {
        inputs.current[index + 1].focus();
      }
    } else {
      e.target.value = "";
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    pasted.split("").forEach((char, i) => {
      if (inputs.current[i]) {
        inputs.current[i].value = char;
        setOTP((prev) => (prev += char));
      }
    });

    const nextIndex = pasted.length < 6 ? pasted.length : 5;
    if (inputs.current[nextIndex]) {
      inputs.current[nextIndex].focus();
    }
  };

  const queryClient = useQueryClient();

  const verifyOTPMutation = useMutation({
    mutationFn: (data) => {
      const path =
        role === "admin"
          ? "/api/v1/admin/register/verify-otp"
          : "/api/v1/user/register/verify-otp";

      return verifyOTP(path, data);
    },
    onSuccess: async (data) => {
      console.log(data, "success");
      dispatch(
        showSuccessMessage({
          successMessage: `${role.toUpperCase()} Verified SuccessFully`,
          open: true,
        })
      );

      await queryClient.invalidateQueries(["user"]);
      navigate(role === "admin" ? "/admin/profile" : "/user/profile");
    },
    onError: (error) => {
      if (error.response?.status === 422) {
        dispatch(
          showErrorMessage({
            errorMessage: `Unable to Access OTP or ${role.toUpperCase()} is not Logged in Properly , try again later`,
            open: true,
          })
        );
      } else if (error.response?.status === 500) {
        dispatch(
          showErrorMessage({ errorMessage: `Server Error`, open: true })
        );
      } else if (error.response?.status === 401) {
        dispatch(
          showErrorMessage({
            errorMessage: `OTP is Incorrect , try again`,
            open: true,
          })
        );
      } else if (error.response?.status === 403) {
        dispatch(
          showErrorMessage({ errorMessage: `OTP is Expired`, open: true })
        );
      } else if (error.response?.status === 404) {
        dispatch(
          showErrorMessage({
            errorMessage: `User not Found, please Login`,
            open: true,
          })
        );
      } else {
        dispatch(
          showErrorMessage({
            errorMessage: `Something Went Wrong while Verifing OTP`,
            open: true,
          })
        );
      }
    },
  });

  const handleOTP = () => {
    console.log(OTP, OTP.length);

    if (OTP.length < 6) {
      dispatch(
        showErrorMessage({
          errorMessage: "OTP must be 6 charectors",
          open: true,
        })
      );
    } else {
      verifyOTPMutation.mutate({ otp: OTP });
    }
  };

  const resendMutation = useMutation({
    mutationFn: (OTPData) => {
      const path =
        role === "admin"
          ? "/api/v1/admin/register/send-otp"
          : "/api/v1/user/register/send-otp";
     return sendOTP(path, OTPData);
    },
    onSuccess: (data) => {
      dispatch(
        showSuccessMessage({
          successMessage: `Resend OTP Successfully On ${
            (data.data.data.email && "Your Email") ||
            (data.data.data.contact && "Your Contact")
          }`,
          open: true,
        })
      );
    },
    onError: (error) => {
      dispatch(
        showErrorMessage({
          errorMessage: "Error While Resending the OTP , try again later",
        })
      );
    },
  });

  return (
    <div className="otpOverlay">
      <div className="otpModalBox">
        <div className="otpHeader">
          <h2 className="otpHeading">Verify OTP</h2>
        </div>

        <div className="otpMessageArea">
          <p className="otpInstructionText">
            {role === "admin"
              ? "We’ve sent a 6-digit verification code to your registered contact. Enter it below to continue as Admin."
              : "Please enter the 6-digit code sent to your email or phone to continue."}
          </p>
        </div>

        <div className="otpInputGroup">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength="1"
              inputMode="numeric"
              className="otpInput"
              ref={(el) => (inputs.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
            />
          ))}
        </div>

        <div className="otpDivider" />

        <div className="otpResendSection">
          <p className="otpResendText">
            Didn’t receive the code?{" "}
            <span
              className={
                role === "admin" ? "otpResendLinkAdmin" : "otpResendLink"
              }
              onClick={() => resendMutation.mutate(OTPData)}
            >
              Resend
            </span>
          </p>
        </div>

        <div className="otpButtonContainer">
          <button
            className={
              role === "admin" ? "otpSubmitButtonAdmin" : "otpSubmitButton"
            }
            onClick={() => {
              handleOTP();
            }}
          >
            Verify
          </button>
        </div>

        <div className="otpBackContainer">
          <button className="otpBackButton" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className="otpBackText">Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
