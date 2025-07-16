import "./userRegister.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEnvelope,
  faPhone,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VerifyOtp from "../../../components/verifyOtp/VerifyOtp";
import Input from "../../../components/input/Input";
// import '@coreui/coreui-pro/dist/css/coreui.min.css'
const UserRegister = ({ role }) => {
  const [otpOptions, setOtpOptions] = useState(false);
  const [showVerifyOTP, setShowVerifyOTP] = useState(false);
  const [selectOption, setSelectOption] = useState(null);
  const navigate = useNavigate();
  const handleRegisterForm = (e) => {
    e.preventDefault();
    setOtpOptions(true);
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
          <h2 className="authTitle">Create Your {role === "admin" ?<span className="extendedTitle">Admin Account</span> : "Account"}</h2>
          <p className="authSubTitle">
            {role === "admin"
              ? "Start your business today  create your admin account and launch your online store."
              : "Join us and enjoy a smooth shopping experience from day one."}
          </p>
          <form onSubmit={handleRegisterForm}>
            <div className="inputGroup">
              <Input
                label="Email"
                htmlFor="email"
                id="email"
                name="email"
                className="inputField"
                placeholder="Enter Your Email"
              />
            </div>

            <div className="inputGroup">
              <Input
                label="Contact"
                htmlFor="contact"
                id="contact"
                name="contact"
                className="inputField"
                placeholder="Enter Your Contact"
              />
            </div>

            <div className="inputGroup">
              <Input
                label={"Password"}
                htmlFor={"password"}
                name={"password"}
                password={true}
                placeHolder={"Enter your Password"}
              />
            </div>

            <div className="formDivider" />

            <button type="submit" className={role === "admin"  ? "authSubmitButtonAdmin" : "authSubmitButton"}>
              Register
            </button>
          </form>

          <div className="authSwitch">
            <span className="authSwitchText">Have an account?</span>
            <Link to={role === "admin" ? "/adminlogin": "/userlogin"} className={role === "admin" ? "authSwitchLinkAdmin":"authSwitchLink"}>
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

            <div className="otpOption" onClick={() => setSelectOption("email")}>
              <div className="otpLabel">
                <FontAwesomeIcon icon={faEnvelope} className="otpIcon" />
                <span className="otpText">ibnfarooq070@gmail.com</span>
              </div>
              <div
                className={`otpCheck ${
                  selectOption === "email" ? "active" : ""
                }`}
              ></div>
            </div>

            <div className="formDivider" />

            <div
              className="otpOption"
              onClick={() => setSelectOption("contact")}
            >
              <div className="otpLabel">
                <FontAwesomeIcon icon={faPhone} className="otpIcon" />
                <span className="otpText">7976755425</span>
              </div>
              <div
                className={`otpCheck ${
                  selectOption === "contact" ? "active" : ""
                }`}
              ></div>
            </div>

            <div className="formDivider" />

            <div className="otpSendContainer">
              <button
                className="otpSendButton"
                onClick={() => {
                  setOtpOptions(false);
                  setShowVerifyOTP(true);
                }}
              >
                Send OTP
              </button>
            </div>
             <div className="otpBackContainer">
      <button className="otpBackButton" onClick={() => setOtpOptions(false)}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <span className="otpBackText">Go Back</span>
      </button>
    </div>
          </div>
        </div>
      )}

      {showVerifyOTP && <VerifyOtp func={setShowVerifyOTP} />}
    </div>
  );
};

export default UserRegister;
