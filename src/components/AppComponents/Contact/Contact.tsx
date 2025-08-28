"use client";

import React from "react";
import ContactInfo from "@/components/UIComponents/ContactInfo/ContactInfo";
import ContactForm from "@/components/UIComponents/ContactForm/ContactForm";
import "./Contact.scss";

const Contact: React.FC = () => {
  return (
    <div className="contact-page">
      {/* Simple header */}
      <section className="contact-header">
        <h1>Contact Us</h1>
        <p>We typically respond within one business day.</p>
      </section>

      {/* Info + Form */}
      <section className="contact-sections">
        <div className="grid">
          <div className="col">
            <ContactInfo />
          </div>
          <div className="col">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;


