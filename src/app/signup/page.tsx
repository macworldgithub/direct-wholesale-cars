"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import "./signup.scss";

import LocalizedInput from "@/components/UIComponents/LocalizedInput/LocalizedInput";
import LocalizedCheckbox from "@/components/UIComponents/LocalizedCheckbox/LocalizedCheckbox";
import LocalizedButton from "@/components/UIComponents/LocalizedButton/LocalizedButton";
import Dropdown from "@/components/UIComponents/Dropdown/Dropdown";
import LocalizedHeading from "@/components/UIComponents/LocalizedHeading/LocalizedHeading";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { SignupDealer } from "@/api/auth";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/UIComponents/ImageCropUploader/ImageCropUploader";
import Toast from "@/components/UIComponents/Toast/Toast";

interface SignupFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  businessName: string;
  businessType: string;
  businessLicenseNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  accountType: "dealer" | "buyer";
  receiveUpdates: boolean;
  agreeTerms: boolean;
  profileImage?: File | null;
}

const businessTypeOptions = [
  { label: "Select Business Type", value: "" },
  { label: "Sole Proprietorship", value: "sole" },
  { label: "LLC", value: "llc" },
  { label: "Corporation", value: "corporation" },
  { label: "Partnership", value: "partnership" },
];

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [toastOpen, setToastOpen] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [croppedImageURL, setCroppedImageURL] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      businessName: "",
      businessType: "",
      businessLicenseNumber: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      accountType: "dealer",
      receiveUpdates: false,
      agreeTerms: false,
      profileImage: null,
    },
    mode: "onTouched",
  });

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setShowCropModal(true);
    }
  };

  const handleCrop = (croppedBase64: string) => {
    const file = dataURLtoFile(croppedBase64, "profile.jpg");
    setValue("profileImage", file, { shouldValidate: true });
    setCroppedImageURL(croppedBase64);
    setImageFile(null);
    setShowCropModal(false);
  };

  const handleClose = () => {
    setShowCropModal(false);
    setImageFile(null);
  };

  const onSubmit = (data: SignupFormData) => {
    if (!data.agreeTerms) {
      alert("You must agree to Terms of Service and Privacy Policy.");
      return;
    }

    dispatch(SignupDealer(data));
    setToastOpen(true);

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  const handleNext = async () => {
    let valid = false;
    if (step === 1) {
      valid = await trigger(["firstName", "lastName", "password", "email", "phone"]);
    } else if (step === 2) {
      valid = await trigger([
        "businessName",
        "businessType",
        "businessLicenseNumber",
        "address",
        "city",
        "state",
        "zipCode",
      ]);
    }

    if (valid) setStep((prev) => prev + 1);
  };

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderError = (fieldName: keyof SignupFormData) => {
    if (errors[fieldName]) {
      return (
        <span className="error-text">
          {errors[fieldName]?.type === "required"
            ? "This field is required"
            : "Invalid input"}
        </span>
      );
    }
    return null;
  };

  const renderFormFields = () => {
    switch (step) {
      case 1:
        return (
          <div className="signup-inputs">
            <div className="profile-image-upload">
              {showCropModal && imageFile && (
                <ImageUploader
                  imageFile={imageFile}
                  onClose={handleClose}
                  onCropComplete={handleCrop}
                />
              )}

              <LocalizedButton
                label="Upload Profile Image"
                onClick={() => fileInputRef.current?.click()}
                size="sm"
                className="upload-image-button"
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />

              {croppedImageURL && (
                <div className="uploaded-image-preview">
                  <label>Profile Image:</label>
                  <div className="image-wrapper">
                    <img src={croppedImageURL} alt="Uploaded" />
                    <button
                      type="button"
                      className="remove-image-button"
                      onClick={() => {
                        setCroppedImageURL(null);
                        setImageFile(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="name-row">
              <div className="input-wrapper">
                <LocalizedInput
                  {...register("firstName", { required: true })}
                  className={errors.firstName ? "error" : ""}
                  value={watch("firstName")}
                  onChange={(val) =>
                    setValue("firstName", val, { shouldValidate: true })
                  }
                  placeholderKey="First Name"
                  label="First Name"
                  required
                  type="text"
                  size="lg"
                />
                {renderError("firstName")}
              </div>

              <div className="input-wrapper">
                <LocalizedInput
                  {...register("lastName", { required: true })}
                  className={errors.lastName ? "error" : ""}
                  value={watch("lastName")}
                  onChange={(val) =>
                    setValue("lastName", val, { shouldValidate: true })
                  }
                  placeholderKey="Last Name"
                  label="Last Name"
                  required
                  type="text"
                  size="lg"
                />
                {renderError("lastName")}
              </div>
            </div>

            <LocalizedInput
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className={errors.email ? "error" : ""}
              value={watch("email")}
              onChange={(val) =>
                setValue("email", val, { shouldValidate: true })
              }
              placeholderKey="Email Address"
              label="Email Address"
              required
              size="lg"
              type="email"
              variant="full"
            />
            {renderError("email")}

            <LocalizedInput
              {...register("password", { required: true })}
              className={errors.password ? "error" : ""}
              value={watch("password")}
              onChange={(val) =>
                setValue("password", val, { shouldValidate: true })
              }
              placeholderKey="Password"
              label="Password"
              required
              size="lg"
              type="password"
              variant="full"
            />
            {renderError("password")}

            <LocalizedInput
              {...register("phone", { required: true })}
              className={errors.phone ? "error" : ""}
              value={watch("phone")}
              onChange={(val) =>
                setValue("phone", val, { shouldValidate: true })
              }
              placeholderKey="Phone Number"
              label="Phone Number"
              required
              size="lg"
              type="text"
              variant="full"
            />
            {renderError("phone")}
          </div>
        );

      case 2:
        return (
          <div className="signup-inputs">
            <LocalizedInput
              {...register("businessName", { required: true })}
              value={watch("businessName")}
              onChange={(val) =>
                setValue("businessName", val, { shouldValidate: true })
              }
              placeholderKey="Business Name"
              label="Business Name"
              required={true}
              size="lg"
              type="text"
              variant="full"
            />
            {renderError("businessName")}

            <div className="row two-cols">
              <div className="input-wrapper">
                <Dropdown
                  options={businessTypeOptions}
                  value={watch("businessType")}
                  onChange={(val) =>
                    setValue("businessType", val, { shouldValidate: true })
                  }
                  className="businessType"
                  size="lg"
                  label="Business Type"
                  required={true}
                />
                {renderError("businessType")}
              </div>

              <div className="input-wrapper">
                <LocalizedInput
                  {...register("businessLicenseNumber", { required: true })}
                  value={watch("businessLicenseNumber")}
                  onChange={(val) =>
                    setValue("businessLicenseNumber", val, {
                      shouldValidate: true,
                    })
                  }
                  placeholderKey="Dealer License Number"
                  label="License Number"
                  required={true}
                  size="lg"
                  type="number"
                />
                {renderError("businessLicenseNumber")}
              </div>
            </div>

            <LocalizedInput
              {...register("address", { required: true })}
              value={watch("address")}
              onChange={(val) =>
                setValue("address", val, { shouldValidate: true })
              }
              placeholderKey="Office Address"
              label="Office Address"
              required={true}
              size="lg"
              type="text"
              variant="full"
            />
            {renderError("address")}

            <div className="row three-cols">
              <div className="input-wrapper">
                <LocalizedInput
                  {...register("city", { required: true })}
                  value={watch("city")}
                  onChange={(val) =>
                    setValue("city", val, { shouldValidate: true })
                  }
                  placeholderKey="City"
                  label="City"
                  required={true}
                  size="lg"
                  type="text"
                />
                {renderError("city")}
              </div>

              <div className="input-wrapper">
                <LocalizedInput
                  {...register("state", { required: true })}
                  value={watch("state")}
                  onChange={(val) =>
                    setValue("state", val, { shouldValidate: true })
                  }
                  placeholderKey="State"
                  label="State"
                  required={true}
                  size="lg"
                  type="text"
                />
                {renderError("state")}
              </div>

              <div className="input-wrapper">
                <LocalizedInput
                  {...register("zipCode", { required: true })}
                  value={watch("zipCode")}
                  onChange={(val) =>
                    setValue("zipCode", val, { shouldValidate: true })
                  }
                  placeholderKey="Zip Code"
                  label="Zip Code"
                  required={true}
                  size="lg"
                  type="number"
                />
                {renderError("zipCode")}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="signup-step3">
            <div className="verification-info">
              <div className="info-header">
                <Image
                  src="/images/verified-icon.png"
                  alt="verified"
                  width={24}
                  height={24}
                />
                <LocalizedHeading
                  heading="Verification Process"
                  variant="black"
                  level={6}
                />
              </div>
              <p>
                Your account will be reviewed and verified within 24–48 hours.
                You’ll receive an email confirmation once approved with access
                to wholesale pricing and features.
              </p>
            </div>

            <div className="account-type-section">
              <LocalizedHeading
                heading="Account Type"
                variant="black"
                level={6}
              />
              <div className="account-options">
                {(["dealer", "buyer"] as const).map((type) => (
                  <div
                    key={type}
                    className={`account-option ${
                      watch("accountType") === type ? "selected" : ""
                    }`}
                    onClick={() => setValue("accountType", type)}
                  >
                    <input
                      type="radio"
                      name="accountType"
                      value={type}
                      checked={watch("accountType") === type}
                      onChange={() => setValue("accountType", type)}
                    />
                    <div>
                      <h3>
                        {type === "dealer" ? "Dealer Account" : "Buyer Account"}
                      </h3>
                      <p>
                        {type === "dealer"
                          ? "Buy and sell vehicles"
                          : "Purchase vehicles only"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="account-checkboxes">
                <LocalizedCheckbox
                  name="receiveUpdates"
                  checked={watch("receiveUpdates")}
                  onChange={(val) => setValue("receiveUpdates", val)}
                  labelKey="I want to receive email notifications about new inventory, price alerts, and platform updates."
                />

                <LocalizedCheckbox
                  name="agreeTerms"
                  checked={watch("agreeTerms")}
                  onChange={(val) =>
                    setValue("agreeTerms", val, { shouldValidate: true })
                  }
                  labelKey={
                    <>
                      I agree to the{" "}
                      <a
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Privacy Policy
                      </a>{" "}
                      <span style={{ color: "red" }}>*</span>
                    </>
                  }
                  className={errors.agreeTerms ? "error" : ""}
                />
                {errors.agreeTerms && (
                  <span className="error-text">
                    You must agree to continue.
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form className="signup-wrapper" onSubmit={handleSubmit(onSubmit)}>
      <div className="signup-left">
        <div className="signup-content">
          <h1 className="signup-heading">Join DirectWholesaleCars</h1>
          <p className="signup-text">
            Get verified and start accessing wholesale vehicle inventory.
          </p>

          <div className="signup-icons-row">
            {[
              { icon: "/images/personal-info.png", label: "Personal Info" },
              { icon: "/images/business-info.png", label: "Business Details" },
              { icon: "/images/account-info.png", label: "Verification" },
            ].map((stepIcon, index) => (
              <React.Fragment key={index}>
                <div className="icon-section">
                  <div
                    className={`icon-circle ${
                      step === index + 1 ? "blinking" : ""
                    }`}
                  >
                    <Image
                      src={stepIcon.icon}
                      alt={`Step ${index + 1}`}
                      width={24}
                      height={24}
                    />
                  </div>
                  <p>{stepIcon.label}</p>
                </div>
                {index < 2 && <div className="line" />}
              </React.Fragment>
            ))}
          </div>

          <h2 className="step-title">Step {step} of 3</h2>

          {renderFormFields()}

          <div className="signup-navigation">
            {step > 1 && (
              <LocalizedButton
                label="Previous"
                onClick={handlePrev}
                size="lg"
                className="prev-button"
              />
            )}
            {step < 3 ? (
              <LocalizedButton
                label="Next"
                onClick={handleNext}
                size="lg"
                className="next-button"
              />
            ) : (
              <LocalizedButton
                label="Sign Up"
                type="submit"
                size="lg"
                className="signup-button"
              />
            )}
          </div>
          <Toast
            open={toastOpen}
            onClose={() => setToastOpen(false)}
            message="Signup Successful!"
            severity="success"
          />
          <div className="login-redirect">
            Already have an account?{" "}
            <Link href="/login" className="login-link">
              Login now!
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignupPage;
