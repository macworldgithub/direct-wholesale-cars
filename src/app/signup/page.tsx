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

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { SignupDealer, SignupWholesaler, UpdateDealer } from "@/api/auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ImageUploader from "@/components/UIComponents/ImageCropUploader/ImageCropUploader";
import Toast from "@/components/UIComponents/Toast/Toast";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  businessRegistrationNumber: string;
  phone: string;
  contactPerson: string;
  address: string;
}

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [toastOpen, setToastOpen] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [croppedImageURL, setCroppedImageURL] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dealer = useSelector((state: RootState) => state.SignuinDealer.dealer);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: dealer
      ? {
        name: dealer.name,
        email: dealer.email,
        password: "",
        // businessRegistrationNumber: dealer.businessRegistrationNumber,
        // phone: dealer.phone,
        // contactPerson: dealer.contactPerson,
        // address: dealer.address,
        // profileImage: null,
      }
      : {
        name: "",
        email: "",
        password: "",
        businessRegistrationNumber: "",
        phone: "",
        contactPerson: "",
        address: "",
        // profileImage: null,
      },
    mode: "onTouched",
  });

  const handleAccountRoleChange = (role: "dealer" | "wholesaler") => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("role", role);

    router.replace(`${pathname}?${params.toString()}`);
  };

  // const dataURLtoFile = (dataUrl: string, filename: string): File => {
  //   const arr = dataUrl.split(",");
  //   const mimeMatch = arr[0].match(/:(.*?);/);
  //   const mime = mimeMatch ? mimeMatch[1] : "";
  //   const bstr = atob(arr[1]);
  //   let n = bstr.length;
  //   const u8arr = new Uint8Array(n);
  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new File([u8arr], filename, { type: mime });
  // };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setImageFile(file);
  //     setShowCropModal(true);
  //   }
  // };

  // const handleCrop = (croppedBase64: string) => {
  //   const file = dataURLtoFile(croppedBase64, "profile.jpg");
  //   setValue("profileImage", file, { shouldValidate: true });
  //   setCroppedImageURL(croppedBase64);
  //   setImageFile(null);
  //   setShowCropModal(false);
  // };

  // const handleClose = () => {
  //   setShowCropModal(false);
  //   setImageFile(null);
  // };

  const onSubmit = (formValues: SignupFormData) => {
    const accountRole = searchParams?.get("role") as
      | "dealer"
      | "wholesaler"
      | null;

    if (!accountRole) {
      alert("Please select an account type");
      return;
    }

    let payload: any = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      businessRegistrationNumber: formValues.businessRegistrationNumber,
      phone: formValues.phone,
      contactPerson: formValues.contactPerson,
      address: formValues.address,
    };

    // const hasFile =
    //   formValues.profileImage &&
    //   formValues.profileImage instanceof File &&
    //   formValues.profileImage.name;

    // if (hasFile) {
    //   const formData = new FormData();
    //   Object.entries(formValues).forEach(([key, value]) => {
    //     if (value !== null && value !== undefined && value !== "") {
    //       formData.append(key, value as any);
    //     }
    //   });
    //   payload = formData;
    // } else {
    //   payload = {};
    //   Object.entries(formValues).forEach(([key, value]) => {
    //     if (value !== null && value !== undefined && value !== "") {
    //       payload[key] = value;
    //     }
    //   });
    // }

    if (dealer?._id) {
      dispatch(UpdateDealer({ accountId: dealer._id, data: payload }))
        .unwrap()
        .then(() => {
          setToastOpen(true);
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        });
    } else {
      if (accountRole === "dealer") {
        dispatch(SignupDealer(payload))
          .unwrap()
          .then(() => {
            setToastOpen(true);
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          });
      } else if (accountRole === "wholesaler") {
        dispatch(SignupWholesaler(payload))
          .unwrap()
          .then(() => {
            setToastOpen(true);
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          });
      }
    }
  };

  const handleNext = async () => {
    let valid = false;
    if (step === 1) {
      valid = await trigger(["name", "email", "password", "phone"]);
    } else if (step === 2) {
      valid = await trigger([
        "businessRegistrationNumber",
        "contactPerson",
        "address",
      ]);
    }

    if (valid) {
      setTimeout(() => {
        setStep((prev) => prev + 1);
      }, 0);
    }
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
            {/* <div className="profile-image-upload">
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
            </div> */}

            <LocalizedInput
              {...register("name", { required: true })}
              className={errors.name ? "error" : ""}
              value={watch("name")}
              onChange={(val) =>
                setValue("name", val, { shouldValidate: true })
              }
              placeholderKey="Name"
              label="Name"
              required
              type="text"
              size="lg"
              variant="full"
            />
            {renderError("name")}

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
              {...register("businessRegistrationNumber", { required: true })}
              value={watch("businessRegistrationNumber")}
              onChange={(val) =>
                setValue("businessRegistrationNumber", val, {
                  shouldValidate: true,
                })
              }
              placeholderKey="Business Registration Number"
              label="Business Registration Number"
              required={true}
              size="lg"
              type="text"
              variant="full"
            />
            {renderError("businessRegistrationNumber")}

            <LocalizedInput
              {...register("contactPerson", { required: true })}
              value={watch("contactPerson")}
              onChange={(val) =>
                setValue("contactPerson", val, {
                  shouldValidate: true,
                })
              }
              placeholderKey="Contact Person"
              label="Contact Person"
              required={true}
              size="lg"
              type="text"
              variant="full"
            />
            {renderError("contactPerson")}

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
                {(["dealer", "wholesaler"] as const).map((type) => {
                  const selected = searchParams?.get("role") === type;

                  return (
                    <div
                      key={type}
                      className={`account-option ${selected ? "selected" : ""}`}
                      onClick={() => {
                        const params = new URLSearchParams(
                          searchParams?.toString()
                        );
                        params.set("role", type);
                        router.replace(`${pathname}?${params.toString()}`);
                      }}
                    >
                      <input
                        type="radio"
                        name="accountRole"
                        value={type}
                        checked={selected}
                        onChange={() => {
                          const params = new URLSearchParams(
                            searchParams?.toString()
                          );
                          params.set("role", type);
                          router.replace(`${pathname}?${params.toString()}`);
                        }}
                      />
                      <div>
                        <h3>
                          {type === "dealer"
                            ? "Dealer Account"
                            : "Wholesaler Account"}
                        </h3>
                        <p>
                          {type === "dealer"
                            ? "Buy and sell vehicles"
                            : "Purchase vehicles only"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* <div className="account-checkboxes">
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
              </div> */}
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
                    className={`icon-circle ${step === index + 1 ? "blinking" : ""
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
                label={dealer ? "Update Account" : "Sign Up"}
                type="submit"
                size="lg"
                className={dealer ? "update-button" : "signup-button"}
              />
            )}
          </div>
          <Toast
            open={toastOpen}
            onClose={() => setToastOpen(false)}
            message={
              dealer ? "Account updated successfully!" : "Signup Successful!"
            }
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
