import "./userLogin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../components/input/Input";
import {useForm} from "react-hook-form"
import { useMutation } from "@tanstack/react-query";
import { logIn } from "../../../api/handleAPi";
const UserLogin = ({ role }) => {
  const {register , handleSubmit} = useForm()
  const navigate = useNavigate();

 const logInMutation = useMutation({
  mutationFn :(formData) =>logIn("/api/v1/user/login" , formData),
  onSuccess : (data) => { console.log(data)},
  onError : (error) => { console.log(error)}
  }
 )
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
          <form onSubmit={handleSubmit(formData => logInMutation.mutate(formData))}>
            <div className="inputGroup">
              <Input
              {...register("emailContact" , {
                required : "Enter Email or Contact",
              validate : (value) =>  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) || /^[6-9]\d{9}$/.test(value) || "Enter a valid email or 10-digit mobile number"
              })}
                label="Email or Contact"
                htmlFor="emailContact"
                id="emailContact"
                name="emailContact"
                className="inputField"
                placeholder="Enter Your Email or Contact"
              />
            </div>

            <div className="formGroup">
                 <Input
                 {...register("password" , {
                required : "Password is required",
              })}
              label={"Password"}
              htmlFor={"password"} name={"password"}password={true} placeholder={"Enter your Password"}
              />
            </div>

            <div className="formDivider" />

            <div className="forgotContainer">
              <Link
                to={role === "admin" ?  "/admin/forgetpassword":"/user/forgetpassword"}
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
              to={role === "admin" ? "/admin/signup" : "/user/signup"}
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
