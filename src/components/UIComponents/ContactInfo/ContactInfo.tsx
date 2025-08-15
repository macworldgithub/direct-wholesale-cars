"use client";

import React from "react";
import Image from "next/image";
import "./ContactInfo.scss";

const ContactInfo = () => {
  return (
    <div className="contact-info">
      <h2 className="contact-title">Get In Touch</h2>
      <p className="contact-description">
        Have questions about our platform? Our dealer support team is here to help you succeed.
      </p>
      
      <div className="contact-methods">
        <div className="contact-item">
          <div className="contact-icon">
            <Image
              src="/images/phone.png"
              alt="Phone"
              width={24}
              height={24}
            />
          </div>
          <div className="contact-details">
            <h4>Phone Support</h4>
            <p>1-800-WHOLESALE (24/7)</p>
          </div>
        </div>

        <div className="contact-item">
          <div className="contact-icon">
            <Image
              src="/images/Email .png"
              alt="Email"
              width={24}
              height={24}
            />
          </div>
          <div className="contact-details">
            <h4>Email Support</h4>
            <p>support@directwholesalecars.com</p>
          </div>
        </div>

        <div className="contact-item">
          <div className="contact-icon">
            <Image
              src="/images/location.png"
              alt="Location"
              width={24}
              height={24}
            />
          </div>
          <div className="contact-details">
            <h4>Headquarters</h4>
            <p>Atlanta, GA • Dallas, TX • Phoenix, AZ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo; 