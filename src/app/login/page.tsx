"use client";

import React, { useState } from "react";
import Image from "next/image";
import "./login.scss";
import LocalizedButton from "@/components/UIComponents/LocalizedButton/LocalizedButton";
import LocalizedCheckbox from "@/components/UIComponents/LocalizedCheckbox/LocalizedCheckbox";
import LocalizedInput from "@/components/UIComponents/LocalizedInput/LocalizedInput";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="login-wrapper">
      {/* Left side */}
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

          <div className="login-inputs">
            <LocalizedInput
              name="email"
              value={email}
              onChange={setEmail}
              placeholderKey="Email Address"
              size="lg"
              type="email"
            />

            <LocalizedInput
              name="password"
              value={password}
              onChange={setPassword}
              placeholderKey="Password"
              size="lg"
              type="password"
            />
          </div>

          <div className="login-options">
            <LocalizedCheckbox
              name="rememberMe"
              checked={rememberMe}
              onChange={setRememberMe}
              labelKey="Remember Me"
            />

            <a href="#" className="login-forgot">
              Forgot Password?
            </a>
          </div>

          <LocalizedButton
            label="Login"
            onClick={handleLogin}
            className="login-button"
            size="lg"
          />

          <div className="signup-redirect">
            Not a member?{" "}
            <Link href="/signup" className="signup-link">
              Sign up now!
            </Link>
          </div>
        </div>
      </div>

      {/* Right side */}
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
