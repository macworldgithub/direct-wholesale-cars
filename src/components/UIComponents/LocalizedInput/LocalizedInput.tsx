import React from "react";
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

const LocalizedInput: React.FC<LocalizedInputProps> = ({
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
}) => {
  const sizeClass = `input-${size}`;
  const variantClass = variant === "full" ? "input-full" : "";
  return (
    <form autoComplete="off">
      {label && (
        <label htmlFor={name} className="input-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholderKey || ""}
        className={`localized-input ${sizeClass} ${variantClass} ${className}`}
      />
    </form>
  );
};

export default LocalizedInput;
