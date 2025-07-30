import "./profile.css";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ProfilePicture from "../../components/profilepic/ProfilePicture";
import { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { createProfile } from "../../api/handleAPi";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../features/snackbarSlice";
const Profile = ({ role }) => {
  const disptach = useDispatch();
  const { register, handleSubmit } = useForm();
  const [avatar, setAvatar] = useState(null);

  const profileMutation = useMutation({
    mutationFn: (data) =>
      createProfile(
        role === "admin"
          ? "/api/v1/admin/profile/create-profile"
          : "/api/v1/user/profile/create",
        data
      ),
    onSuccess: () => {
      disptach(
        showSuccessMessage({
          successMessage: "Profile Created SuccessFully",
          open: true,
        })
      );
    },
    onError: (error) => {
      if (error.response?.status === 422) {
        disptach(
          showErrorMessage({
            errorMessage: "Full Name is Required",
            open: true,
          })
        );
      } else if (error.response?.status === 401) {
        disptach(
          showErrorMessage({
            errorMessage: "Unautorized Request please login First",
            open: true,
          })
        );
      } else if (error.response?.status === 503) {
        disptach(
          showErrorMessage({
            errorMessage: "Failed to upload avatar. Please try again.",
            open: true,
          })
        );
      } else if (error.response?.status === 500) {
        disptach(
          showErrorMessage({
            errorMessage:
              "Profile was not Created due to Server Issue, please try again later",
            open: true,
          })
        );
      } else {
        disptach(
          showErrorMessage({ errorMessage: "Profile is not create due to Some Error", open: true })
        );
      }
    },
  });

  const handleProfile = (data) => {
    if (role !== "admin") {
      delete data.shopName;
    }

    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    if (avatar) {
      formData.append("avatar", avatar);
    }

    profileMutation.mutate(formData);
  };

  return (
    <div className="profilePage">
      <div className="profileHeader"></div>
      <main className="profileMain">
        <div className="profileForm">
          <h2 className="profileTitle">
            Create
            {role === "admin" && <span className="extendedTitle"> Admin </span>}
            Profile
          </h2>

          <form onSubmit={handleSubmit(handleProfile)}>
            <ProfilePicture role={role} setAvatar={setAvatar} />

            <div className="inputGroup">
              <FormControl>
                <InputLabel htmlFor="component-outlined-fullName">
                  Full Name
                </InputLabel>
                <OutlinedInput
                  {...register("fullName", {
                    required: "Full Name is Required",
                  })}
                  id="component-outlined-fullName"
                  label="Full Name"
                />
              </FormControl>
            </div>
            {role === "admin" && (
              <div className="inputGroup">
                <FormControl>
                  <InputLabel htmlFor="component-outlined-ShopName">
                    Shop Name
                  </InputLabel>
                  <OutlinedInput
                    id="component-outlined-shopName"
                    label="Shop Name"
                  />
                </FormControl>
              </div>
            )}

            <div className="formDivider" />

            <button
              type="submit"
              className={
                role === "admin"
                  ? "submitButtonAdminLoginProfile"
                  : "submitButtonUserLoginProfile"
              }
            >
              {profileMutation.isPending && profileMutation ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress size={25} color="white" />
                </Box>
              ) : (
                "Create Profile"
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;
