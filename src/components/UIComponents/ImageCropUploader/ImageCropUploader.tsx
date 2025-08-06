// components/UIComponents/ImageCropModal.tsx
"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/utils/cropImage";
import "./ImageCropUploader.scss";

const ImageUploader = ({ imageFile, onClose, onCropComplete }: any) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<
    import("react-easy-crop").Area | null
  >(null);

  const onCropDone = useCallback(async () => {
    const croppedImage = await getCroppedImg(imageFile, croppedAreaPixels);
    onCropComplete(croppedImage);
  }, [croppedAreaPixels, imageFile, onCropComplete]);

  return (
    <div className="crop-modal">
      <div className="modal-content">
        <div className="crop-container">
          <Cropper
            image={
              imageFile instanceof File || imageFile instanceof Blob
                ? URL.createObjectURL(imageFile)
                : undefined
            }
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={(_, croppedPixels) =>
              setCroppedAreaPixels(croppedPixels)
            }
            onZoomChange={setZoom}
          />
        </div>
        <div className="crop-actions">
          <button onClick={onCropDone}>Crop</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
