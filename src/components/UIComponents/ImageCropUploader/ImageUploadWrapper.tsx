import React, { useState } from "react";
import ImageUploader from "./ImageCropUploader";

const ImageUploadWrapper = () => {
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setShowCropModal(true);
  };

  const handleClose = () => {
    setShowCropModal(false);
    setImageFile(null);
  };

  const handleCrop = (croppedBase64: string) => {
    // Convert cropped base64 string to File
    const file = dataURLtoFile(croppedBase64, "profile-image.jpg");

    // Now do something with the cropped file
    console.log("Cropped File:", file);

    handleClose(); // Close cropper
  };

  const dataURLtoFile = (dataUrl: string, filename: string): File => {
    const arr = dataUrl.split(",");
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : "";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {showCropModal && imageFile && (
        <ImageUploader
          imageFile={imageFile}
          onClose={handleClose}
          onCropComplete={handleCrop}
        />
      )}
    </>
  );
};

export default ImageUploadWrapper;
