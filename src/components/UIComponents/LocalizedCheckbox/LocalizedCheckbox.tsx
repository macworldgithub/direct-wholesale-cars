import React from "react";
import "./LocalizedCheckbox.scss";

interface LocalizedCheckboxProps {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  labelKey: React.ReactNode;
  className?: string;
  required?: boolean;
}

const LocalizedCheckbox: React.FC<LocalizedCheckboxProps> = ({
  name,
  checked,
  onChange,
  labelKey,
  className = "",
  required = false,
}) => {
  return (
    <label className={`localized-checkbox ${className}`}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required={required}
      />
      {labelKey}
      {required && <span className="required-asterisk">*</span>}
    </label>
  );
};

export default LocalizedCheckbox;
