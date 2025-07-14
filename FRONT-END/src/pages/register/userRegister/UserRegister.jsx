import "./userRegister.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEnvelope,
  faPhone,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const UserRegister = () => {
  const [otpOptions, setOtpOptions] = useState(false);
  const [selectOption, setSelectOption] = useState(null);

  return (
    <div className="registerPage">
      <header className="registerHeader">
        <FontAwesomeIcon icon={faArrowLeft} className="backIcon" />
      </header>

      <main className="registerMain">
        <div className="registerForm">
          <h2 className="registerTitle">Create Your Account</h2>

          <form>
            <div className="formGroup">
              <label htmlFor="email" className="formLabel">Email</label>
              <input type="text" id="email" name="email" className="formInput" />
            </div>

            <div className="formGroup">
              <label htmlFor="contact" className="formLabel">Contact</label>
              <input type="text" id="contact" name="contact" className="formInput" />
            </div>

            <div className="formGroup">
              <label htmlFor="password" className="formLabel">Password</label>
              <input type="password" id="password" name="password" className="formInput" />
            </div>

            <div className="formDivider" />

            <button type="submit" className="submitButton">Register</button>
          </form>

          <div className="switchAccount">
            <span className="switchText">Have an account?</span>
            <a href="#" className="switchLink">Log In</a>
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

            <div
              className="otpOption"
              onClick={() => setSelectOption("email")}
            >
              <div className="otpLabel">
                <FontAwesomeIcon icon={faEnvelope} className="otpIcon" />
                <span className="otpText">ibnfarooq070@gmail.com</span>
              </div>
              <div
                className={`otpCheck ${selectOption === "email" ? "active" : ""}`}
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
                className={`otpCheck ${selectOption === "contact" ? "active" : ""}`}
              ></div>
            </div>

            <div className="formDivider" />

            <div className="otpSendContainer">
              <button className="otpSendButton" onClick={() => setOtpOptions(false)}>Send OTP</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRegister;

