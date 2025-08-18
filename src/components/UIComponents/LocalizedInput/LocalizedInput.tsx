/* eslint-disable react/display-name */

import React, { forwardRef } from "react";
import "./LocalizedInput.scss";
import clsx from "clsx";

interface LocalizedInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholderKey?: string;
  label?: string;
  required?: boolean;
  className?: string;
  type?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  variant?: "full";
  disabled?: boolean;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
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
      variant,
      disabled = false,
      onKeyDown,
    },
    ref
  ) => {

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
          onKeyDown={onKeyDown}
          placeholder={placeholderKey || ""}
          className={clsx(
            "localized-input",
            size && `input-${size}`,
            variant && `input-${variant}`,
            className
          )}
          required={required}
          disabled={disabled}
        />
      </div>
    );
  }
);

export default LocalizedInput;
