import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useNavigate } from "react-router-dom"
import Input from "../../components/input/Input"
import "./address.css"
const Address = ({role}) => {
  const navigate = useNavigate()
  return (
     <div className="addressPage">
      <header className="addressHeader">
      {role === "admin" ? "" : ( <> <FontAwesomeIcon
          icon={faArrowLeft}
          className="backIcon"
          onClick={() => navigate(-1)}
        /> 
        <div>
          <Link to={"/"} className="addressSkip">SKIP</Link>
        </div>
        </>
        )}
      </header>

      <main className="addressMain">
        <div className="addressForm">
          <h2 className="addressTitle">Add Your {role === "admin" ?<span className="extendedTitle">Admin</span> : ""} Address </h2>
        
          <form>

            <div className="inputGroup">
              <Input
                label="State"
                htmlFor="state"
                id="state"
                name="state"
                placeholder="Enter Your State"
              />
            </div>

            <div className="inputGroup">
              <Input
                label="City"
                htmlFor="city"
                id="city"
                name="city"
                placeholder="Enter Your City"
              />
            </div>


            <div className="inputGroup">
              <Input
                label={"Pin Code"}
                htmlFor={"pincode"}
                name={"pinCode"}
                placeHolder={"Enter your Pin Code"}
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="address" className="addressLabel">Address</label>
           <textarea name="address" id="address" className="addressTextArea" cols="3" rows="3" placeholder="Enter Your Address" style={{resize : "none"}}>

           </textarea>
            </div>

            <div className="formDivider" />

            <button type="submit" className={role === "admin"  ? "authSubmitButtonAdmin" : "authSubmitButton"}>
              Add Address
            </button>
          </form>

       
        </div>
      </main>
      </div>
  )
}

export default Address
