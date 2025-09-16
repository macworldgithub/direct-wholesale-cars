"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import LocalizedInput from "@/components/UIComponents/LocalizedInput/LocalizedInput";
import LocalizedButton from "@/components/UIComponents/LocalizedButton/LocalizedButton";
import Toast from "@/components/UIComponents/Toast/Toast";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  forgotPassword,
  requestChangePassword,
  resetPassword,
  verifyChangePassword,
  resendForgotOtp,
  resendChangeOtp,
} from "@/api/auth";
import { AppDispatch } from "@/store/store";
import "./PasswordForm.scss";

type PasswordFormProps = {
  mode: "forget" | "update";
  role?: "dealer" | "wholesaler";
};

const PasswordForm = ({ mode, role: propRole }: PasswordFormProps) => {
  const [role, setRole] = useState<"dealer" | "wholesaler" | undefined>(
    mode === "update" ? (propRole as "dealer" | "wholesaler") : undefined
  );

  const dispatch = useDispatch<AppDispatch>();

  const [otpRequested, setOtpRequested] = useState(false);
  console.log(otpRequested);
  const [timer, setTimer] = useState(30);
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    handleSubmit,
    control,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues:
      mode === "forget"
        ? { email: "", otp: "", newPassword: "" }
        : {
            email: "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            otp: "",
          },
  });

  const newPassword = watch("newPassword");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpRequested && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpRequested, timer]);

  /** 🔹 STEP 1: Request OTP */
  const handleRequestOtp = async (data: any) => {
    const effectiveRole = (mode === "update" ? propRole : role) as
      | "dealer"
      | "wholesaler";

    if (mode === "forget" && !effectiveRole) {
      setToast({
        open: true,
        message: "Please select Dealer or Wholesaler",
        severity: "error",
      });
      return;
    }

    try {
      if (mode === "forget") {
        await dispatch(
          forgotPassword({ email: data.email, role: effectiveRole })
        ).unwrap();
      } else {
        await dispatch(
          requestChangePassword({
            email: data.email,
            oldPassword: data.currentPassword,
            role: effectiveRole,
          })
        ).unwrap();
      }
      setOtpRequested(true);
      setTimer(30);
      setToast({
        open: true,
        message: "OTP sent successfully!",
        severity: "success",
      });
    } catch (err: any) {
      setToast({
        open: true,
        message: err || "Failed to send OTP",
        severity: "error",
      });
    }
  };

  /** 🔹 STEP 2: Verify OTP & Reset/Change Password */
  const handleVerifyOtp = async (data: any) => {
    const effectiveRole = (mode === "update" ? propRole : role) as
      | "dealer"
      | "wholesaler";

    if (mode === "forget" && !effectiveRole) {
      setToast({
        open: true,
        message: "Please select Dealer or Wholesaler",
        severity: "error",
      });
      return;
    }

    try {
      if (mode === "forget") {
        await dispatch(
          resetPassword({
            email: data.email,
            otp: data.otp,
            newPassword: data.newPassword,
            role: effectiveRole,
          })
        ).unwrap();
      } else {
        await dispatch(
          verifyChangePassword({
            email: data.email,
            otp: data.otp,
            newPassword: data.newPassword,
            role: effectiveRole,
          })
        ).unwrap();
      }

      setToast({
        open: true,
        message: "Password updated successfully!",
        severity: "success",
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err: any) {
      setToast({
        open: true,
        message: err || "Invalid OTP",
        severity: "error",
      });
    }
  };

  /** 🔹 STEP 3: Resend OTP */
  const handleResendOtp = async () => {
    const effectiveRole = (mode === "update" ? propRole : role) as
      | "dealer"
      | "wholesaler";
    if (!effectiveRole) return;

    try {
      const { email } = getValues();
      if (mode === "forget") {
        await dispatch(
          resendForgotOtp({ email, role: effectiveRole })
        ).unwrap();
      } else {
        await dispatch(
          resendChangeOtp({ email, role: effectiveRole })
        ).unwrap();
      }
      setTimer(30);
      setToast({
        open: true,
        message: "OTP resent successfully!",
        severity: "info",
      });
    } catch (err: any) {
      setToast({
        open: true,
        message: err || "Failed to resend OTP",
        severity: "error",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(otpRequested ? handleVerifyOtp : handleRequestOtp)(e);
        }}
        className="password-form"
      >
        {/* 🔹 Role selection */}
        {!otpRequested && mode === "forget" && (
          <div className="account-options">
            {(["dealer", "wholesaler"] as const).map((type) => (
              <div
                key={type}
                className={`account-option ${role === type ? "selected" : ""}`}
                onClick={() => setRole(type)}
              >
                <input
                  type="radio"
                  name="role"
                  checked={role === type}
                  onChange={() => setRole(type)}
                />
                <span>{type === "dealer" ? "Dealer" : "Wholesaler"}</span>
              </div>
            ))}
          </div>
        )}
        {/* Fields */}
        {!otpRequested && (
          <>
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <LocalizedInput
                  name={field.name}
                  value={field.value ?? ""}
                  onChange={(val) => field.onChange(val)}
                  ref={field.ref}
                  placeholderKey="Email Address"
                  type="email"
                  variant="full"
                />
              )}
            />
            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}

            {mode === "update" && (
              <>
                <Controller
                  name="currentPassword"
                  control={control}
                  rules={{ required: "Current password is required" }}
                  render={({ field }) => (
                    <LocalizedInput
                      name={field.name}
                      value={field.value ?? ""}
                      onChange={(val) => field.onChange(val)}
                      ref={field.ref}
                      placeholderKey="Current Password"
                      type="password"
                      variant="full"
                    />
                  )}
                />
                {errors.currentPassword && (
                  <p className="error-text">{errors.currentPassword.message}</p>
                )}
              </>
            )}

            <Controller
              name="newPassword"
              control={control}
              rules={{
                required: "New password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              }}
              render={({ field }) => (
                <LocalizedInput
                  name={field.name}
                  value={field.value ?? ""}
                  onChange={(val) => field.onChange(val)}
                  ref={field.ref}
                  placeholderKey="New Password"
                  type="password"
                  variant="full"
                />
              )}
            />
            {errors.newPassword && (
              <p className="error-text">{errors.newPassword.message}</p>
            )}

            {mode === "update" && (
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                }}
                render={({ field }) => (
                  <LocalizedInput
                    name={field.name}
                    value={field.value ?? ""}
                    onChange={(val) => field.onChange(val)}
                    ref={field.ref}
                    placeholderKey="Re-type New Password"
                    type="password"
                    variant="full"
                  />
                )}
              />
            )}
            {errors.confirmPassword && (
              <p className="error-text">{errors.confirmPassword.message}</p>
            )}
          </>
        )}

        {otpRequested && (
          <>
            <Controller
              name="otp"
              control={control}
              rules={{ required: "OTP is required" }}
              render={({ field }) => (
                <LocalizedInput
                  name={field.name}
                  value={field.value ?? ""}
                  onChange={(val) => field.onChange(val)}
                  ref={field.ref}
                  placeholderKey="Enter OTP"
                  type="text"
                  variant="full"
                />
              )}
            />
            {errors.otp && <p className="error-text">{errors.otp.message}</p>}

            <div className="otp-actions">
              <LocalizedButton
                label="Verify OTP"
                className="password-btn"
                size="lg"
                type="submit"
              />
              <LocalizedButton
                label={timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                type="button"
                size="sm"
                className="resend-btn"
                onClick={handleResendOtp}
                disabled={timer > 0}
              />
            </div>
          </>
        )}

        {!otpRequested && (
          <LocalizedButton
            label="Send OTP"
            className="password-btn"
            size="sm"
            type="submit"
          />
        )}
      </form>

      {/* Toast */}
      <Toast
        open={toast.open}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        message={toast.message}
        severity={toast.severity}
      />
    </>
  );
};

export default PasswordForm;
