import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import OutlinedInput from "@mui/material/OutlinedInput"
import Typography from "@mui/material/Typography"
import { useState } from "react"


const UpdateEmailForm = ({email , setEmail , nextStep}) => {
    const [password , setPassword] = useState("")

    

  return (
            <div className="emailChangeContainer">
          <div className="emailChangeHeader">
            <h1 className="emailChangeHeading">Change Email</h1>
            <p className="emailChangeSubHeadeing">
              Keep your email address up to date to receive important
              notifications.
            </p>
          </div>
          <div className="emailChangeFormContainer">
            <div className="formSubContainer">
              <form>
                <div className="inputContainer">
                  <div className="inputGroup">
                    <FormControl>
                      <InputLabel
                        //   error={
                        //     errors.emailContact?.type === "required" ||
                        //     errors.emailContact?.type === "validate"
                        //       ? true
                        //       : false
                        //   }
                        htmlFor="component-outlined-emailContact"
                      >
                        New Email
                      </InputLabel>
                      <OutlinedInput
                        //   {...register("emailContact", {
                        //     required: "Enter Email or Contact",
                        //     validate: (value) =>
                        //       /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
                        //       /^[6-9]\d{9}$/.test(value) ||
                        //       "Enter a valid email or 10-digit mobile number",
                        //   })}
                        //   error={
                        //     errors.emailContact?.type === "required" ||
                        //     errors.emailContact?.type === "validate"
                        //       ? true
                        //       : false
                        //   }
                        id="component-outlined-emailContact"
                        label="New Email"
                      />
                    </FormControl>
                    {/* {errors.emailContact?.type === "required" && (
                <Typography
                  sx={{ color: "red", fontSize: "14px", marginTop: "3px" }}
                >
                  Email or Contact is Required
                </Typography>
              )}
              {errors.emailContact?.type === "validate" && (
                <Typography
                  sx={{ color: "red", fontSize: "14px", marginTop: "3px" }}
                >
                  Email or Contact Number is Invalid
                </Typography>
              )} */}
                  </div>
                  <div className="inputGroup">
                    <FormControl variant="outlined">
                      <InputLabel
                        // error={
                        //   errors.password?.type === "required" ||
                        //   error.error === true ||
                        //   errors.password?.type === "minLength" || errors.password?.type === "pattern"
                        //     ? true
                        //     : false
                        // }
                        htmlFor="outlined-adornment-password"
                      >
                        Current Password
                      </InputLabel>
                      <OutlinedInput
                        // {...register("password", {
                        //       required: true,
                        //       minLength: 8,
                        //       pattern: {
                        //         value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        //         message:
                        //           "Password must contain at least 1 uppercase, 1 lowercase, and 1 number",
                        //       },
                        //     })}
                        // error={
                        //   errors.password?.type === "required" ||
                        //   error.error === true ||
                        //   errors.password?.type === "minLength" || errors.password?.type === "pattern"
                        //     ? true
                        //     : false
                        // }
                        id="outlined-adornment-password"
                        type={"text"}
                        label="Current Password"
                      />
                      <Typography sx={{ fontSize: "13px", marginTop: "3px" }}>
                        Enter your current password to authorize this change.
                      </Typography>
                      {/* {errors.password?.type === "required" && (
                <Typography
                  sx={{ color: "red", fontSize: "14px", marginTop: "3px" }}
                >
                  Password is Required
                </Typography>
              )}
              {errors.password?.type === "minLength" && (
                <Typography
                  sx={{ color: "red", fontSize: "14px", marginTop: "3px" }}
                >
                  Password must be 8 characters
                </Typography>
              )}
              {errors.password?.type === "pattern" && (
                <Typography
                  sx={{ color: "red", fontSize: "12px", marginTop: "3px" }}
                >
                  {errors.password?.message}
                </Typography>
              )} */}
                    </FormControl>
                  </div>
                </div>
                <div className="newEmailButtonContainer">
                  <button type="submit" className={"newEmailSubmitButton"}>
                    Verify New Email
                  </button>
                </div>
              </form>
            </div>
          </div>
          </div>
       
  )
}

export default UpdateEmailForm
