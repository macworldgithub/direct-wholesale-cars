import React from "react";
import "./LocalizedInput.scss";

interface LocalizedInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholderKey?: string;
  className?: string;
  type?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const LocalizedInput: React.FC<LocalizedInputProps> = ({
  name,
  value,
  onChange,
  placeholderKey,
  className = "",
  type = "text",
  size = "md", 
}) => {
  return (
    <form autoComplete="off">
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholderKey || ""}
        className={`localized-input input-${size} ${className}`}
      />
    </form>
  );
};

export default LocalizedInput;
