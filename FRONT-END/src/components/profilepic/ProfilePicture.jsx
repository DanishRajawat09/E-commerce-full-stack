import { useState } from "react";
import ImageCropper from "../imageCropper/ImageCropper";
import "./profilepic.css";

const ProfilePicture = ({ role }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [croppedImageURL, setCroppedImageURL] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCroppedImageURL(null);

    setSelectedFile(file);
    setImageURL(URL.createObjectURL(file));
  };
  const handleCropComplete = (blob, croppedUrl) => {
    setCroppedImageURL(croppedUrl);

    // const formData = new FormData();
    // formData.append("avatar", blob);
  };
  return (
    <>
      <div className="inputGroupProfile">
        <div className="circular">
          <div className="profileImages">
            <img className="profileImage" src={croppedImageURL} alt="" />
          </div>
          <label htmlFor="profile" className="profileLabel"></label>
          <input
            type="file"
            id="profile"
            className="fileUploadInput"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
      </div>

      {imageURL && !croppedImageURL && (
        <div className="imageUploaderOverlay">
          <div className="imageWapper">
            <ImageCropper
              image={imageURL}
              onCropComplete={handleCropComplete}
              role={role}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePicture;
