"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { SigninDealer } from "@/api/auth";

import "./login.scss";
import LocalizedButton from "@/components/UIComponents/LocalizedButton/LocalizedButton";
import LocalizedInput from "@/components/UIComponents/LocalizedInput/LocalizedInput";
import Toast from "@/components/UIComponents/Toast/Toast";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [toastOpen, setToastOpen] = useState(false);

  const { loading, error } = useSelector(
    (state: RootState) => state.SignuinDealer
  );

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const remembered = localStorage.getItem("rememberMe") === "true";
    if (remembered) {
      setValue("email", localStorage.getItem("email") || "");
      setValue("password", localStorage.getItem("password") || "");
    }
  }, [setValue]);

  const onSubmit = async (data: LoginFormData) => {
    const result = await dispatch(
      SigninDealer({ email: data.email, password: data.password })
    );
    if (SigninDealer.fulfilled.match(result)) {
      setToastOpen(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="login-content">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={280}
            height={200}
            className="login-logo"
          />

          <h1 className="login-heading">Customer Login</h1>
          <p className="login-text">
            Welcome back! Please enter your credentials to continue.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="login-inputs">
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field, fieldState }) => (
                <>
                  <LocalizedInput
                    name="email"
                    value={field.value}
                    onChange={field.onChange}
                    placeholderKey="Email Address"
                    type="email"
                    size="lg"
                  />
                  {fieldState.error && (
                    <p className="error-text">{fieldState.error.message}</p>
                  )}
                </>
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field, fieldState }) => (
                <>
                  <LocalizedInput
                    name="password"
                    value={field.value}
                    onChange={field.onChange}
                    placeholderKey="Password"
                    type="password"
                    size="lg"
                  />
                  {fieldState.error && (
                    <p className="error-text">{fieldState.error.message}</p>
                  )}
                </>
              )}
            />

            <div className="login-options">
              <a href="#" className="login-forgot">
                Forgot Password?
              </a>
            </div>

            {error && <div className="login-error">{error}</div>}

            <LocalizedButton
              label={loading ? "Logging in..." : "Login"}
              className="login-button"
              size="lg"
              type="submit"
            />
          </form>

          <Toast
            open={toastOpen}
            onClose={() => setToastOpen(false)}
            message="Signup Successful!"
            severity="success"
          />
          
          <div className="signup-redirect">
            Not a member?{" "}
            <Link href="/signup" className="signup-link">
              Sign up now!
            </Link>
          </div>
        </div>
      </div>

      <div className="login-right">
        <Image
          src="/images/login-side-image.jpg"
          alt="Login Visual"
          layout="fill"
          objectFit="cover"
          className="login-image"
        />
      </div>
    </div>
  );
};

export default LoginPage;
