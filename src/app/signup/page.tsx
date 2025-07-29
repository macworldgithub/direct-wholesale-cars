"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import "./signup.scss";

import LocalizedInput from "@/components/UIComponents/LocalizedInput/LocalizedInput";
import LocalizedCheckbox from "@/components/UIComponents/LocalizedCheckbox/LocalizedCheckbox";
import LocalizedButton from "@/components/UIComponents/LocalizedButton/LocalizedButton";
import Dropdown from "@/components/UIComponents/Dropdown/Dropdown";
import LocalizedHeading from "@/components/UIComponents/LocalizedHeading/LocalizedHeading";

interface SignupFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;

  businessName: string;
  businessType: string;
  dealerLicense: string;
  officeAddress: string;
  city: string;
  state: string;
  zipCode: string;
  accountType: string;
  receiveUpdates: boolean;
  agreeTerms: boolean;
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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      businessName: "",
      businessType: "",
      dealerLicense: "",
      officeAddress: "",
      city: "",
      state: "",
      zipCode: "",
      accountType: "",
      receiveUpdates: false,
      agreeTerms: false,
    },
    mode: "onTouched",
  });

  const onSubmit = (data: SignupFormData) => {
    if (
      step === 1 &&
      (!data.firstName || !data.lastName || !data.email || !data.phoneNumber)
    ) {
      alert("Please fill all required fields in Step 1");
      return;
    }

    if (
      step === 2 &&
      (!data.businessName ||
        !data.businessType ||
        !data.dealerLicense ||
        !data.officeAddress ||
        !data.city ||
        !data.state ||
        !data.zipCode)
    ) {
      alert("Please fill all required fields in Step 2");
      return;
    }

    console.log("Submitted:", data);
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderFormFields = () => {
    switch (step) {
      case 1:
        return (
          <div className="signup-inputs">
            <div className="name-row">
              <LocalizedInput
                name="firstName"
                value={watch("firstName")}
                onChange={(val) => setValue("firstName", val)}
                placeholderKey="First Name"
                label="First Name"
                type="text"
                size="lg"
                required
              />
              <LocalizedInput
                name="lastName"
                value={watch("lastName")}
                onChange={(val) => setValue("lastName", val)}
                placeholderKey="Last Name"
                label="Last Name"
                type="text"
                size="lg"
                required
              />
            </div>

            <LocalizedInput
              name="email"
              value={watch("email")}
              onChange={(val) => setValue("email", val)}
              placeholderKey="Email Address"
              label="Email Address"
              size="lg"
              type="email"
              variant="full"
              required
            />
            <LocalizedInput
              name="phoneNumber"
              value={watch("phoneNumber")}
              onChange={(val) => setValue("phoneNumber", val)}
              placeholderKey="Phone Number"
              label="Phone Number"
              size="lg"
              type="text"
              variant="full"
              required
            />
          </div>
        );

      case 2:
        return (
          <div className="signup-inputs">
            <LocalizedInput
              name="businessName"
              value={watch("businessName")}
              onChange={(val) => setValue("businessName", val)}
              placeholderKey="Business Name"
              label="Business Name"
              size="lg"
              type="text"
              variant="full"
              required
            />

            <div className="row two-cols">
              <Dropdown
                options={businessTypeOptions}
                value={watch("businessType")}
                onChange={(val) => setValue("businessType", val)}
                className="businessType"
                size="lg"
                label="Business Type"
                required
              />

              <LocalizedInput
                name="dealerLicense"
                value={watch("dealerLicense")}
                onChange={(val) => setValue("dealerLicense", val)}
                placeholderKey="Dealer License Number"
                label="License Number"
                size="lg"
                type="number"
                required
              />
            </div>

            {/* Full width */}
            <LocalizedInput
              name="officeAddress"
              value={watch("officeAddress")}
              onChange={(val) => setValue("officeAddress", val)}
              placeholderKey="Office Address"
              label="Office Address"
              size="lg"
              type="text"
              variant="full"
              required
            />

            {/* 3-column row: city, state, zip */}
            <div className="row three-cols">
              <LocalizedInput
                name="city"
                value={watch("city")}
                onChange={(val) => setValue("city", val)}
                placeholderKey="City"
                label="City"
                size="lg"
                type="text"
                required
              />
              <LocalizedInput
                name="state"
                value={watch("state")}
                onChange={(val) => setValue("state", val)}
                placeholderKey="State"
                label="State"
                size="lg"
                type="text"
                required
              />
              <LocalizedInput
                name="zipCode"
                value={watch("zipCode")}
                onChange={(val) => setValue("zipCode", val)}
                placeholderKey="Zip Code"
                label="Zip Code"
                size="lg"
                type="number"
                required
              />
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

            {/* Section 2 - Account Type Selection */}
            <div className="account-type-section">
              <LocalizedHeading
                heading="Account Type"
                variant="black"
                level={6}
              />
              {/* <h2>Account Type</h2> */}
              <div className="account-options">
                <div
                  className={`account-option ${
                    watch("accountType") === "dealer" ? "selected" : ""
                  }`}
                  onClick={() => setValue("accountType", "dealer")}
                >
                  <input
                    type="radio"
                    name="accountType"
                    value="dealer"
                    checked={watch("accountType") === "dealer"}
                    onChange={() => setValue("accountType", "dealer")}
                  />
                  <div>
                    <h3>Dealer Account</h3>
                    <p>Buy and sell vehicles</p>
                  </div>
                </div>

                <div
                  className={`account-option ${
                    watch("accountType") === "buyer" ? "selected" : ""
                  }`}
                  onClick={() => setValue("accountType", "buyer")}
                >
                  <input
                    type="radio"
                    name="accountType"
                    value="buyer"
                    checked={watch("accountType") === "buyer"}
                    onChange={() => setValue("accountType", "buyer")}
                  />
                  <div>
                    <h3>Buyer Account</h3>
                    <p>Purchase vehicles only</p>
                  </div>
                </div>
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
                  onChange={(val) => setValue("agreeTerms", val)}
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
            <div className="icon-section">
              <div className="icon-circle">
                <Image
                  src="/images/personal-info.png"
                  alt="Step 1"
                  width={24}
                  height={24}
                />
              </div>
              <p>Personal Info</p>
            </div>

            <div className="line" />

            <div className="icon-section">
              <div className="icon-circle">
                <Image
                  src="/images/business-info.png"
                  alt="Step 2"
                  width={24}
                  height={24}
                />
              </div>
              <p>Business Details</p>
            </div>

            <div className="line" />

            <div className="icon-section">
              <div className="icon-circle">
                <Image
                  src="/images/account-info.png"
                  alt="Step 3"
                  width={24}
                  height={24}
                />
              </div>
              <p>Verification</p>
            </div>
          </div>

          <h2 className="step-title">Step {step} of 3</h2>

          {renderFormFields()}

          <div className="signup-navigation">
            {step > 1 && (
              <LocalizedButton
                label="Previous"
                onClick={handlePrev}
                size="lg"
                variant="outlined"
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

          <div className="login-redirect">
            Already have an account?
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
