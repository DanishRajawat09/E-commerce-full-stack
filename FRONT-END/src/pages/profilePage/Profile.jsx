
import "./profile.css";
import Input from "../../components/input/Input";

import ProfilePicture from "../../components/profilepic/ProfilePicture";
const Profile = ({ role }) => {
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

          <form>
            <ProfilePicture role={role} />

            <div className="inputGroup">
              <Input
                label={"Full Name"}
                htmlFor={"fullname"}
                name={"fullName"}
                placeHolder={"Enter your Full name"}
                required={true}
              />
            </div>
           {role === "admin" && ( <div className="inputGroup">
              <Input
                label={"Shop Name"}
                htmlFor={"shopname"}
                name={"shopName"}
                placeHolder={"Enter your shop Name"}
                required={true}
              />
            </div>)}

            <div className="formDivider" />

            <button
              type="submit"
              className={
                role === "admin"
                  ? "submitButtonAdminLoginProfile"
                  : "submitButtonUserLoginProfile"
              }
            >
              Create Profile
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;
