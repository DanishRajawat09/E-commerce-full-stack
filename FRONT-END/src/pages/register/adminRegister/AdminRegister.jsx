import {
  faArrowLeft,
  faEnvelope,
  faPhone,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./adminRegister.css";
import { Link, useNavigate } from "react-router-dom";
const AdminRegister = () => {
  const [otpOptions, setOtpOptions] = useState(false);
  const [selectOption, setSelectOption] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="registerPage">
      <header className="registerHeader">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="backIcon"
          onClick={() => navigate(-1)}
        />
      </header>

      <main className="registerMain">
        <div className="registerForm">
          <h2 className="registerTitle">
            Create Your Account as <span className="adminText">Admin</span>
          </h2>

          <form>
            <div className="formGroup">
              <label htmlFor="email" className="formLabel">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="formInput"
              />
            </div>

            <div className="formGroup">
              <label htmlFor="contact" className="formLabel">
                Contact
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                className="formInput"
              />
            </div>

            <div className="formGroup">
              <label htmlFor="password" className="formLabel">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="formInput"
              />
            </div>

            <div className="formDivider" />

            <button type="submit" className="submitButton">
              Become Admin
            </button>
          </form>

          <div className="switchAccount">
            <span className="switchText">Have an account as Admin?</span>
            <Link to={"/adminlogin"} className="switchLink">
              Log In
            </Link>
          </div>
        </div>
      </main>

      {otpOptions && (
        <div className="otpOverlay">
          <div className="otpModal">
            <div className="otpHeader">
              <h2 className="otpTitle">Select Verification Method</h2>
              <div className="closeOtpBtn" onClick={() => setOtpOptions(false)}>
                <FontAwesomeIcon icon={faXmark} className="closeOtpIcon" />
              </div>
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
                onClick={() => setOtpOptions(false)}
              >
                Send OTP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRegister;
