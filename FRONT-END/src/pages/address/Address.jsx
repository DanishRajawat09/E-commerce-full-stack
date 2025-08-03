import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import "./address.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useMutation } from "@tanstack/react-query";
import { AddAddress } from "../../api/handleAPi";
import { useDispatch } from "react-redux";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../features/snackbarSlice";
import getApiPath from "../../utils/getApiPath";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
const Address = ({ role }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
    const {path , route} = getApiPath({role : role , purpose : "addaddress"})
  const addressMutation = useMutation({
    mutationFn: (formData) => {
  
   
      return AddAddress(path, formData);
    },
    onSuccess: () => {
      dispatch(
        showSuccessMessage({
          successMessage: `${role.toUpperCase()} Address Added Successfully`,
        })
      );
      navigate(route);
    },
    onError: (error) => {
      if (error.response?.status === 422) {
        dispatch(showErrorMessage({ errorMessage: "All Fields are Required" }));
      } else if (error.response?.status === 401) {
        dispatch(
          showErrorMessage({
            errorMessage: "Unauthorized Request, login please",
          })
        );
      } else if (error.response?.status === 409) {
        dispatch(
          showErrorMessage({
            errorMessage: "Address is Already Exist",
          })
        );
      } else if (error.response?.status === 500) {
        dispatch(
          showErrorMessage({
            errorMessage: "Server Error",
          })
        );
      }else{
         dispatch(
          showErrorMessage({
            errorMessage: "Something Went Wrong",
          })
        );
      }
    },
  });
  return (
    <div className="addressPage">
      <header className="addressHeader">
        {role === "admin" ? (
          ""
        ) : (
          <>
            {" "}
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="backIcon"
              onClick={() => navigate(-1)}
            />
            <div>
              <Link to={"/"} className="addressSkip">
                SKIP
              </Link>
            </div>
          </>
        )}
      </header>

      <main className="addressMain">
        <div className="addressForm">
          <h2 className="addressTitle">
            Add Your{" "}
            {role === "admin" ? (
              <span className="extendedTitle">Admin</span>
            ) : (
              ""
            )}{" "}
            Address{" "}
          </h2>

          <form
            onSubmit={handleSubmit((formData) =>
              addressMutation.mutate(formData)
            )}
          >
            <div className="inputGroup">
              <FormControl>
                <InputLabel
                  error={errors.state?.type === "required" ? true : false}
                  htmlFor="component-outlined-state"
                >
                  State
                </InputLabel>
                <OutlinedInput
                  {...register("state", {
                    required: "true",
                  })}
                  error={errors.state?.type === "required" ? true : false}
                  id="component-outlined-state"
                  label="State"
                />
                {errors.state?.type === "required" && (
                  <Typography
                    sx={{ color: "red", fontSize: "14px", marginTop: "3px" }}
                  >
                    State is Required
                  </Typography>
                )}
              </FormControl>
            </div>

            <div className="inputGroup">
              <FormControl>
                <InputLabel
                  error={errors.city?.type === "required" ? true : false}
                  htmlFor="component-outlined-city"
                >
                  City
                </InputLabel>
                <OutlinedInput
                  {...register("city", {
                    required: "true",
                  })}
                  error={errors.city?.type === "required" ? true : false}
                  id="component-outlined-city"
                  label="City"
                />
                {errors.city?.type === "required" && (
                  <Typography
                    sx={{ color: "red", fontSize: "14px", marginTop: "3px" }}
                  >
                    City is Required
                  </Typography>
                )}
              </FormControl>
            </div>

            <div className="inputGroup">
              <FormControl>
                <InputLabel
                  error={errors.pinCode?.type === "required" ? true : false}
                  htmlFor="component-outlined-pinCode"
                >
                  Pincode
                </InputLabel>
                <OutlinedInput
                  {...register("pinCode", {
                    required: "true",
                  })}
                  error={errors.pinCode?.type === "required" ? true : false}
                  id="component-outlined-pinCode"
                  label="Pincode"
                />
                {errors.pinCode?.type === "required" && (
                  <Typography
                    sx={{ color: "red", fontSize: "14px", marginTop: "3px" }}
                  >
                    Pincode is Required
                  </Typography>
                )}
              </FormControl>
            </div>
            <div className="inputGroup">
              <TextField
                id="outlined-multiline-Address"
                label="Address"
                multiline
                rows={4}
                {...register("address", {
                  required: "true",
                })}
                error={errors.address?.type === "required" ? true : false}
              />
              {errors.address?.type === "required" && (
                <Typography
                  sx={{ color: "red", fontSize: "14px", marginTop: "3px" }}
                >
                  Address is Required
                </Typography>
              )}
            </div>

            <div className="formDivider" />

            <button
              type="submit"
              className={
                role === "admin" ? "authSubmitButtonAdmin" : "authSubmitButton"
              }
            >

              {addressMutation.isPending && addressMutation ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress size={25} color="white" />
                </Box>
              ) : (
                "Add Address"
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Address;
