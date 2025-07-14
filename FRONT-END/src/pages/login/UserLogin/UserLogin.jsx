import "./userLogin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft , } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";
const UserLogin = () => {


  return (
<div className="loginPage">
  <header className="loginHeader">
    <FontAwesomeIcon icon={faArrowLeft} className="backIcon" />
  </header>

  <main className="loginMain">
    <div className="loginForm">
      <h2 className="loginTitle">Welcome Back</h2>
      <form>
        <div className="formGroup">
          <label htmlFor="emailAndNumber" className="formLabel">
            Email or Contact
          </label>
          <input
            type="text"
            id="emailAndNumber"
            name="email"
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

        <div className="forgotContainer">
          <a href="#" className="forgotLink">Forgot password?</a>
        </div>

        <button type="submit" className="submitButton">Log In</button>
      </form>

      <button className="googleButton">
        <FontAwesomeIcon icon={faGoogle} color="white" />
      </button>

      <div className="signupContainer">
        <span className="signupText">New on Shop.co?</span>
        <Link to={"/userSignUp"} className="signupLink">Sign Up</Link>
      </div>
    </div>
  </main>
</div>

  );
};

export default UserLogin;