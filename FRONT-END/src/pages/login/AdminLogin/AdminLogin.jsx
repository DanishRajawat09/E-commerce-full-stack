import "./adminLogin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft , } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
const AdminLogin = () => {


  return (
    <div className="mainBody">
      <header className="loginHeader">
        <FontAwesomeIcon icon={faArrowLeft} className="goBack" />
      </header>
      <main className="main">
        <div className="formSection">
          <h2 className="loginHeading">Welcome Back <br /> <span className="adminText"> To Admin</span></h2>
          <form action="">
            <div className="emailNumberLoginInput">
              <label htmlFor="emailAndNumber" className="emailContactLabel">
                Email or Contact
              </label>
              <input
              
                type="text"
                id="emailAndNumber"
                name="email"
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
            <div className="loginLines"/>
          <div className="forgetPassContainer">
            <a href="#" className="forgotPassword">forgot password?</a>
          </div>
            <button type="submit" className="LoginBtn LoginAdmin">Log In</button>
          </form>
          <button className="googleAuth"><FontAwesomeIcon icon={faGoogle} color="white" /></button>
       <div className="createAcContainer">
         <span className="newTO">New on Shop.co?</span><a href="#" className="createAccount">Sign Up</a>
       </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;