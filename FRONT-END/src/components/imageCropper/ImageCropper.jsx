import "./imageCropper.css";
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import { getCroppedImg } from "../../utils/cropImage";

const ImageCropper = ({ image, onCropComplete, setImage, role }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleDone = async (e) => {
    e.preventDefault();
    const { blob, fileUrl } = await getCroppedImg(
      image,
      croppedAreaPixels,
      zoom
    );
    onCropComplete(blob, fileUrl);

  
    setCroppedAreaPixels(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <>
      <div className="imageUploaderModelBox">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1} // square
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
      </div>
      <div style={{ marginTop: 20 }}>
        <Slider
          value={zoom}
          min={1}
          max={5}
          step={0.1}
          onChange={(e, val) => setZoom(val)}
        />
        <button
          onClick={handleDone}
          className={role === "admin" ? "cropImageBtnAdmin" : "cropImageBtn"}
        >
          Crop Image
        </button>
      </div>
    </>
  );
};

export default ImageCropper;
