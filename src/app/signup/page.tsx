'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import './signup.scss';
import LocalizedButton from '@/components/UIComponents/LocalizedButton/LocalizedButton';
import LocalizedCheckbox from '@/components/UIComponents/LocalizedCheckbox/LocalizedCheckbox';
import LocalizedInput from '@/components/UIComponents/LocalizedInput/LocalizedInput';

const signupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handlesignup = () => {
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="signup-wrapper">
      {/* Left side */}
      <div className="signup-left">
        <div className="signup-content">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={280}
            height={200}
            className="signup-logo"
          />

          <h1 className="signup-heading">Customer signup</h1>
          <p className="signup-text">Welcome back! Please enter your credentials to continue.</p>

          <div className="signup-inputs">
            <LocalizedInput
              name="name"
              value={name}
              onChange={setName}
              placeholderKey="Enter your name"
              size='lg'
              type="text"
            />

            <LocalizedInput
              name="contactNumber"
              value={contactNumber}
              onChange={setContactNumber}
              placeholderKey="Enter your contact number"
              size='lg'
              type="text"
            />

            <LocalizedInput
              name="email"
              value={email}
              onChange={setEmail}
              placeholderKey="Email Address"
              size='lg'
              type="email"
            />

            <LocalizedInput
              name="password"
              value={password}
              onChange={setPassword}
              placeholderKey="Password"
              size='lg'
              type="password"
            />
          </div>

          <div className="signup-options">
            <LocalizedCheckbox
              name="rememberMe"
              checked={rememberMe}
              onChange={setRememberMe}
              labelKey="Remember Me"
            />

            <a href="#" className="signup-forgot">Forgot Password?</a>
          </div>

          <LocalizedButton
            label="signup"
            onClick={handlesignup}
            className="signup-button"
            size='lg'
          />
        </div>
      </div>

      {/* Right side */}
      <div className="signup-right">
        <Image
          src="/images/login-side-image.jpg"
          alt="signup Visual"
          layout="fill"
          objectFit="cover"
          className="signup-image"
        />
      </div>
    </div>
  );
};

export default signupPage;
