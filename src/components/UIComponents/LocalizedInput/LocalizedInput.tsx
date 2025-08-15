import React, { forwardRef } from "react";
import "./LocalizedInput.scss";

interface LocalizedInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholderKey?: string;
  label?: string;
  required?: boolean;
  className?: string;
  type?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "full";
}

const LocalizedInput = forwardRef<HTMLInputElement, LocalizedInputProps>(
  (
    {
      name,
      value,
      onChange,
      placeholderKey,
      label,
      required = false,
      className = "",
      type = "text",
      size = "md",
      variant = "default",
    },
    ref
  ) => {
    const sizeClass = `input-${size}`;
    const variantClass = variant === "full" ? "input-full" : "";

    return (
      <div className="localized-input-wrapper">
        {label && (
          <label htmlFor={name} className="input-label">
            {label} {required && <span className="required-asterisk">*</span>}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholderKey || ""}
          className={`localized-input ${sizeClass} ${variantClass} ${className}`}
          required={required}
        />
      </div>
    );
  }
);

export default LocalizedInput;
