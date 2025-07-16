
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./newPassword.css"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Input from "../input/Input"
import { useNavigate } from "react-router-dom"
const NewPassword = ({openNewPass , role}) => {
    const navigate = useNavigate()

    
    const handleAfterNewPassword = () => {
      if (role === "admin") {
        navigate("/adminlogin")
      }else{
         navigate("/userlogin")
      }
    }
    
  return (
<div className="newPassOverlay">
  <div className="newPassBox">
    <div className="newPassHeader">
      {role === "admin" ? (<h2 className="newPassHeading">Set Your New <span className="extendedTitle">Admin</span> Password</h2>) : (<h2 className="newPassHeading">Enter New Password</h2>)}
    </div>

    <div className="newPassMessageArea">
      <p className="newPassInstructionText">
        {role === "admin" ? "Set a strong new password to secure your admin account and regain full access." : "Choose a new password that’s secure and easy for you to remember."}
      </p>
    </div>

<div className="inputGroup">
    <Input
    label={"New Password"}
    htmlFor={"NewPassword"}
    password={true}
    placeHolder={"Enter New Password"}

    />

    </div>    
<div className="inputGroup">
    <Input
    label={"Confirm Password"}
    htmlFor={"confirmPassword"}
    password={true}
    placeHolder={"Confirm Password"}

    />

    </div>    

    <div className="newPassDivider" />

    

    <div className="newPassButtonContainer">
      <button className={role === "admin" ? "newPassSubmitButtonAdmin" : "newPassSubmitButton"} onClick={(e) =>{handleAfterNewPassword(e)}}>Set New Password</button>
    </div>

    <div className="newPassBackContainer">
      <button className="newPassBackButton" onClick={() =>{ openNewPass(false)}}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <span className="newPassBackText">Go Back</span>
      </button>
    </div>
  </div>
</div>
  )
}

export default NewPassword
