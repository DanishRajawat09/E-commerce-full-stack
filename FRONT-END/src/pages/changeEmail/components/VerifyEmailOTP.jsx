import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmailOTP = () => {
  const inputs = useRef([]);
  const navigate = useNavigate();
  const [OTP, setOTP] = useState("");
  const handleChange = (e, index) => {
    const value = e.target.value;
    const newOTP = [...inputs.current].map((input) => input.value).join("");
    setOTP(newOTP);

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
  useEffect(() => {
    if (inputs.current[0]) inputs.current[0].focus();
  }, []);

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

  return (
    <div className="emailChangeContainer">
      <div className="emailChangeVerifyOTPHeader">
        <h1 className="emailChangeVerifyOTPHeading">
          Verify OTP to Confirm Your New Email
        </h1>
        <p className="emailChangeVerifyOTPSubHeadeing">
          We’ve sent a 6-digit OTP to your new email address. Please enter it
          below to confirm the change
        </p>
      </div>
      <div className="emailChangeFormContainer">
        <div className="formSubContainer">
          <form>
            <div className="otpInputGroupVerifyOTP">
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

            <div className="newEmailVerifyOTPButtonContainer">
              <button type="submit" className={"newEmailVerifyOTPSubmitButton"}>
                Verify OTP
              </button>
            </div>
            <div className="inputContainerVerifyOTP">
              <p className="otpResendText">
                Didn’t receive the code?{" "}
                <span
                  className={"otpResendLink"}
                
                >
                  Resend
                </span>
              </p>
            </div>
          </form>

          <div className="otpBackContainerVerifyOTP">
            <button className="otpBackButton" onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faArrowLeft} />
              <span className="otpBackText">Go Back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailOTP;
