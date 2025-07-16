
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

            <div className="initialGroup">
              <Input
                label={"Full Name"}
                htmlFor={"fullname"}
                name={"fullName"}
                placeHolder={"Enter your Fullname"}
                // required={true}
              />
            </div>

            <div className="formDivider" />

            <button
              type="submit"
              className={
                role === "admin"
                  ? "submitButtonAdminLogin"
                  : "submitButtonUserLogin"
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
