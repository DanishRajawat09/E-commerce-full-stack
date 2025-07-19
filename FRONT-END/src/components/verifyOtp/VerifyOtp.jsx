import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./verifyOtp.css";
import { useRef, useState } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const VerifyOtp = ({ role }) => {
  const inputs = useRef([]);
const navigate = useNavigate()

const [OTP , setOTP] = useState("")

  const handleChange = (e, index) => {
    const value = e.target.value;
setOTP(prev => prev += value)


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
      }
    });

    const nextIndex = pasted.length < 6 ? pasted.length : 5;
    if (inputs.current[nextIndex]) {
      inputs.current[nextIndex].focus();
    }
  };



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
           onClick={() => { console.log(OTP);}}
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
