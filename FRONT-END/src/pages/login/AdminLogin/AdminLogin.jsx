import "./adminLogin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const navigate = useNavigate()
  return (
    <div className="adminLoginPage">
      <header className="adminHeader">
        <FontAwesomeIcon icon={faArrowLeft} className="backIcon" onClick={() => navigate(-1)} />
      </header>

      <main className="adminMain">
        <div className="adminFormWrapper">
          <h2 className="adminTitle">
            Welcome Back <br />
            <span className="adminSubtitle">Manage Everything Seamlessly</span>
          </h2>

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

            <div className="forgotWrapper">
              <Link to={"/forgetpassworduser"} className="forgotLink">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="submitButton adminButton">
              Log In
            </button>
          </form>

          <button className="googleButton">
            <FontAwesomeIcon icon={faGoogle} color="white" />
          </button>

          <div className="signupWrapper">
            <span className="signupText">New on Shop.co?</span>
            <Link to={"/adminsignup"} className="signupLink">
              Sign Up
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;
