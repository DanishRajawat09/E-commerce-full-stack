
import "./verifyOtp.css";
import { useRef } from "react";

const VerifyOtp = () => {
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

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
      <div className="otpModal">
        <div className="otpHeader">
          <h2 className="otpTitle">Verify OTP</h2>
          {/* <div className="closeOtpBtn" >
                 <FontAwesomeIcon icon={faXmark} className="closeOtpIcon" />
               </div> */}
        </div>

        <div className="textArea">
          <p className="subHeading">
            Please enter the 6-digit code sent to your email or phone to
            continue.
          </p>
        </div>

      

        <div className="otpContainer">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength="1"
              inputMode="numeric"
              className="otpBox"
              ref={(el) => (inputs.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
            />
          ))}
        </div>
        <div className="formDivider" />
        <div className="resendOtpOption">
          <p className="resendOtp">
            Didn&#39;t Got the Code? <span className="resend">Resend</span>
          </p>
        </div>
        <div className="otpSendContainer">
          <button
            className="otpSendButton"
            //  onClick={() => setOtpOptions(false)}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
