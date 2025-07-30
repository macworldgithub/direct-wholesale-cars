"use client";

import React from "react";
import { useForm } from "react-hook-form";
import "./ContactForm.scss";

import LocalizedInput from "@/components/UIComponents/LocalizedInput/LocalizedInput";
import LocalizedButton from "@/components/UIComponents/LocalizedButton/LocalizedButton";
import LocalizedSelect from "@/components/UIComponents/LocalizedSelect/LocalizedSelect";
import LocalizedTextArea from "@/components/UIComponents/LocalizedTextArea/LocalizedTextArea";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  dealershipName: string;
//   interest: string;
  additionalInfo: string;
}

// const interestOptions = [
//   { label: "I'm interested in...", value: "" },
//   { label: "Wholesale Pricing", value: "wholesale" },
//   { label: "Inventory Access", value: "inventory" },

//   { label: "Other", value: "other" },
// ];

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      dealershipName: "",
    //   interest: "",
      additionalInfo: "",
    },
    mode: "onTouched",
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact form submitted:", data);
    // Handle form submission here
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <div className="contact-form">
      <h2 className="form-title">Request Information</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="form-content">
        <div className="form-row">
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
          name="dealershipName"
          value={watch("dealershipName")}
          onChange={(val) => setValue("dealershipName", val)}
          placeholderKey="Dealership Name"
          label="Dealership Name"
          size="lg"
          type="text"
          variant="full"
          required
        />

        {/* <LocalizedSelect
          name="interest"
          value={watch("interest")}
          onChange={(val) => setValue("interest", val)}
          options={interestOptions}
          label="I'm interested in..."
        /> */}

        <LocalizedTextArea
          name="additionalInfo"
          value={watch("additionalInfo")}
          onChange={(val) => setValue("additionalInfo", val)}
          placeholderKey="Additional Information"
          rows={4}
        />

        <LocalizedButton
          label="Send Message"
          type="submit"
          size="lg"
          variant="filled"
          className="submit-button"
        />
      </form>
    </div>
  );
};

export default ContactForm; 