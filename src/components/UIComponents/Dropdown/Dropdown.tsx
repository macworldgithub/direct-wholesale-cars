import React from "react";
import "./Dropdown.scss";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  className = "",
  size = "md",
  label,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="dropdown-wrapper">
      {label && (
        <label className="input-label">
          {label} {required && <span className="required-asterisk">*</span>}
        </label>
      )}
      <select
        className={`dropdown input-${size} ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
