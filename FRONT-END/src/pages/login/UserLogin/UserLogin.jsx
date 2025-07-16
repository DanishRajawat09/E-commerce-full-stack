import "./userLogin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../components/input/Input";

const UserLogin = ({ role }) => {
  const navigate = useNavigate();

  return (
    <div className="loginPage">
      <header className="loginHeader">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="backIcon"
          onClick={() => navigate(-1)}
        />
      </header>

      <main className="loginMain">
        <div className="loginForm">
          <h2 className="loginTitle">
            Welcome Back{" "}
            {role === "admin" && <span className="extendedTitle">Admin</span>}
          </h2>

          <p className="loginSubtitle">
            {role === "admin"
              ? "Enter your credentials to securely access the admin dashboard."
              : "We’re glad to have you back — let’s continue where you left off."}
          </p>
          <form>
            <div className="inputGroup">
              <Input
                label="Email or Contact"
                htmlFor="emailAndNumber"
                id="emailAndNumber"
                name="emailAndNumber"
                className="inputField"
                placeholder="Enter Your Email or Contact"
              />
            </div>

            <div className="formGroup">
                 <Input
              label={"Password"}
              htmlFor={"password"} name={"password"}password={true} placeHolder={"Enter your Password"}
              />
            </div>

            <div className="formDivider" />

            <div className="forgotContainer">
              <Link
                to={role === "admin" ?  "/forgetpasswordadmin":"/forgetpassword"}
                className={
                  role === "admin"
                    ? "forgotLinkAdminLogin"
                    : "forgotLinkUserLogin"
                }
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className={
                role === "admin"
                  ? "submitButtonAdminLogin"
                  : "submitButtonUserLogin"
              }
            >
              Log In
            </button>
          </form>

          <button className="googleButton">
            <FontAwesomeIcon icon={faGoogle} color="white" />
          </button>

          <div className="signupContainer">
            <span className="signupText">New on Shop.co?</span>
            <Link
              to={role === "admin" ? "/adminsignup" : "/usersignup"}
              className={
                role === "admin"
                  ? "signupLinkAdminLogin"
                  : "signupLinkUserLogin"
              }
            >
              Sign Up
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserLogin;
