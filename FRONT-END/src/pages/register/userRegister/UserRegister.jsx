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
  const [otpOptions, setOtpOptions] = useState(true);
  const [selectOption, setSelectOption] = useState(null);

  return (
    <div className="mainBody">
      <header className="loginHeader">
        <FontAwesomeIcon icon={faArrowLeft} className="goBack" />
      </header>
      <main className="main">
        <div className="formSection">
          <h2 className="loginHeading">Registration Form </h2>
          <form action="">
            <div className="emailNumberLoginInput">
              <label htmlFor="emailAndNumber" className="emailContactLabel">
                Email
              </label>
              <input
                type="text"
                id="emailAndNumber"
                name="email"
                className="emailContactInput"
              />
            </div>
            <div className="emailNumberLoginInput">
              <label htmlFor="contact" className="emailContactLabel">
                Contact
              </label>
              <input
                type="text"
                id="emailAndNumber"
                name="contact"
                className="emailContactInput"
              />
            </div>
            <div className="emailNumberLoginInput">
              <label htmlFor="password" className="emailContactLabel">
                Password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                className="emailContactInput"
              />
            </div>
            <div className="loginLines" />

            <button type="submit" className="LoginBtn">
              Register
            </button>
          </form>

          <div className="createAcContainer">
            <span className="newTO">Have an Account?</span>
            <a href="#" className="createAccount">
              Log In
            </a>
          </div>
        </div>
      </main>
      {otpOptions && (
        <div className="otpMainBody">
          <div className="otpOptionscontainer">
  <div className="headerpart">
              <h2 className="OtpOptionsHeading">Select Verification Method</h2>
            <div className="sendOtpcancleBtn" onClick={() => setOtpOptions(false)}>
                <FontAwesomeIcon icon={faXmark} className="sendOtpCancle"/>
            </div>
  </div>
            <div className="loginLines" />
            <div className="emailSelect" onClick={() => setSelectOption("email")}>
              <div >
                <FontAwesomeIcon
                className="emailIcon"
                  icon={faEnvelope}
                  style={{ marginRight: "10px" }}
                />{" "}
                <span className="emailText">ibnfarooq070@gmail.com</span>
              </div>
              <div className="checkBoxEmail" style={{backgroundColor : selectOption === "email" ? "yellowgreen" : "white"}}></div>
            </div>
            <div className="loginLines" />
            <div className="emailSelect" onClick={() => setSelectOption("contact")}>
              <div>
                
                <FontAwesomeIcon
                  icon={faPhone}
                   className="contactIcon"
                  style={{ marginRight: "10px" }}
                />
                <span className="emailText">7976755425</span>
              </div>
                <div className="checkBoxContact" style={{backgroundColor : selectOption === "contact" ? "yellowgreen" : "white"}}></div>
            </div>
              <div className="loginLines" />
           <div className="sendOtpBtnContainer">
             <button className="sendOtp" onClick={()=>setOtpOptions(false)}>Send Otp</button>
           </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRegister;
