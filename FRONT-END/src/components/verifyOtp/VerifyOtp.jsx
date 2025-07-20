import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./verifyOtp.css";
import { useEffect, useRef, useState } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { sendOTP, verifyOTP } from "../../api/handleAPi";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
const VerifyOtp = ({ role }) => {
  const inputs = useRef([]);
  const navigate = useNavigate();
  const OTPData = useSelector((state) => state.otp);
  console.log(OTPData);

  const [OTP, setOTP] = useState("");
  const [errorM, setErrorM] = useState({
    open: false,
    errorCode: null,
    errorMessage: null,
  });
  const [success, setSuccess] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    successMessage: "",
  });
  const { vertical, horizontal } = success;
  const handleCloseSuccess = () =>
    setSuccess({ ...success, open: false, successMessage: "" });
  const handleCloseError = () =>
    setErrorM({
      open: false,
      errorCode: null,
      errorMessage: null,
    });

  useEffect(() => {
    if (success.open === true) {
      const successInterval = setInterval(() => {
        success({ ...success, open: false });
      }, 5000);

      return () => {
        clearInterval(successInterval);
      };
    }
  });
  useEffect(() => {
    if (errorM.open === true) {
      const errorInterval = setInterval(() => {
        setErrorM({ ...errorM, open: false });
      }, 5000);

      return () => {
        clearInterval(errorInterval);
      };
    }
  });

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
        setOTP(prev => prev += char)
      }
    });

    const nextIndex = pasted.length < 6 ? pasted.length : 5;
    if (inputs.current[nextIndex]) {
      inputs.current[nextIndex].focus();
    }
  };

  const verifyOTPMutation = useMutation({
    mutationFn : (data) => verifyOTP(role === "admin" ? "/api/v1/admin/register/verify-otp" : "/api/v1/user/register/verify-otp",data),
    onSuccess : (data) => {
      console.log(data);
      
     setSuccess({...success , open : true , successMessage : "verified"}) 
    },
    onError : () => {
      setErrorM({...errorM , open : true , errorMessage : "user is not verifies"})
    }
    
    

    
  })

  const handleOTP = () => {
    console.log(OTP , OTP.length);
    
    if (OTP.length < 6) {
      setErrorM({...errorM , open : true , errorMessage : "OTP is cheracter"})
    }else{
      verifyOTPMutation.mutate({otp : OTP})
    }

  };

  const handleResend = async () => {
    try {
      const resendOTP = await sendOTP(
        role === "admin"
          ? "/api/v1/admin/register/send-otp"
          : "/api/v1/user/register/send-otp",
        OTPData
      );

      if (resendOTP.data.statusCode === 200) {
        setSuccess({
          ...success,
          open: true,
          successMessage: "resend OTP SuccessFully",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="otpOverlay">
      <div className="otpModalBox">
        <div className="otpHeader">
          {success.open && (
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={success.open}
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
                {success.successMessage}
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
              onClick={handleResend}
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
