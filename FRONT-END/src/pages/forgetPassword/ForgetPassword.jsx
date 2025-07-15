import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import "./forgetPass.css";
import { useState } from "react";
import VerifyOtp from "../../components/verifyOtp/VerifyOtp";
import Input from "../../components/input/Input";

const ForgetPassword = () => {
  const [showVerifyOTP, setShowVerifyOTP] = useState(false);
  const navigate = useNavigate();

  const handleForgetPass = (e) => {
    e.preventDefault();
    setShowVerifyOTP(true);
  };

  return (
    <div className="forgetWrapper">
      <main className="forgetMain">
        <div className="forgetFormBox">
          <h2 className="forgetTitle">Forgot your password?</h2>
          <p className="forgetSubtitle">
            Don’t worry — we’ll send you a verification code to reset your
            password securely.
          </p>

          <form onSubmit={handleForgetPass}>
            <div className="inputGroup">
              <Input
                label="Email or Contact"
                htmlFor="emailOrContact"
                id="emailOrContact"
                name="emailOrContact"
                className="inputField"
                placeholder="Enter Your Email or Contact"
              />
            </div>

            <div className="forgetDivider" />

            <button type="submit" className="forgetSubmitButton">
              Find and Send OTP
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

      {showVerifyOTP && <VerifyOtp func={setShowVerifyOTP} />}
    </div>
  );
};

export default ForgetPassword;
