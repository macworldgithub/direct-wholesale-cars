"use client";

import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { uploadExcel } from "@/api/cars";
import Toast from "@/components/UIComponents/Toast/Toast";
import LocalizedButton from "@/components/UIComponents/LocalizedButton/LocalizedButton";
import LocalizedHeading from "@/components/UIComponents/LocalizedHeading/LocalizedHeading";
import { FiUploadCloud } from "react-icons/fi";
import "./ExcelUploadForm.scss";

const ExcelUploadForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">("success");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dealer = useSelector((state: RootState) => state.SignuinDealer.dealer);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    // if (!dealer?._id) {
    //   setToastMessage("Please log in as a dealer to upload files.");
    //   setToastSeverity("error");
    //   setToastOpen(true);
    //   return;
    // }

    try {
      const result = await dispatch(
        uploadExcel({ wholesalerId: '689f728f2d734a23896c3040', file: selectedFile })
      ).unwrap();

      const successCount = result.filter((r) => r.status !== "error").length;
      const errorCount = result.length - successCount;

      setToastMessage(`Upload completed: ${successCount} processed, ${errorCount} failed.`);
      setToastSeverity(errorCount > 0 ? "error" : "success");
      setToastOpen(true);

      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      setToastMessage("Failed to upload file. Please try again.");
      setToastSeverity("error");
      setToastOpen(true);
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="excel-upload-form">
      <LocalizedHeading heading="Bulk Upload Cars" level={2} className="localized-heading" />

      <div className="upload-instructions">
        <ul>
          <li>Upload an Excel (.xlsx) or CSV file with car details.</li>
          <li>VIN exists → updates car; VIN missing → creates new car.</li>
          <li>Branches auto-create if not found.</li>
        </ul>
      </div>

      <div className="upload-box" onClick={() => fileInputRef.current?.click()}>
        <FiUploadCloud size={40} className="upload-icon" />
        <p className="upload-text">Click or Drag & Drop your file here</p>
        <p className="upload-subtext">Accepted: .xlsx, .csv</p>
        <input
          type="file"
          accept=".xlsx,.csv"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {selectedFile && (
        <div className="file-preview">
          <p>📄 {selectedFile.name}</p>
          <LocalizedButton
            label="Upload Cars"
            onClick={handleUpload}
            size="sm"
            variant="filled"
            className="bg-green-600 text-white hover:bg-green-700 transition-all duration-200"
          />
        </div>
      )}

      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        message={toastMessage}
        severity={toastSeverity}
      />
    </div>
  );
};

export default ExcelUploadForm;
