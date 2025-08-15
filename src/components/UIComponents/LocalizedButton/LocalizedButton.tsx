// LocalizedButton.tsx
import React from "react";
import "./LocalizedButton.scss";

interface LocalizedButtonProps {
  label: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg" | "xl";
  variant?:
    | "filled"
    | "filled-and-uppercase"
    | "filled-dark-and-uppercase"
    | "full"
    | "category-filter"
    | "transparent-bottom-rounded"
    | "outlined";
  outlineColor?: "white" | "black" | "#1800B2";
}

const sizeClassMap = {
  sm: "localized-button--small",
  md: "localized-button--medium",
  lg: "localized-button--large",
  xl: "localized-button--full",
};

const variantClassMap = {
  filled: "localized-button--filled",
  "filled-and-uppercase": "localized-button--filled-and-uppercase",
  "filled-dark-and-uppercase": "localized-button--filled-dark-and-uppercase",
  full: "localized-button--full",
  "category-filter": "localized-button--category-filter",
  "transparent-bottom-rounded": "localized-button--transparent-bottom-rounded",
  outlined: "localized-button--outlined", // <-- new entry
};

const LocalizedButton: React.FC<LocalizedButtonProps> = ({
  label,
  onClick,
  disabled = false,
  className = "",
  type = "button",
  size = "md",
  variant = "filled",
  outlineColor = "white",
}) => {
  const sizeClass = sizeClassMap[size];
  const variantClass = variantClassMap[variant];
  const borderAndTextColor = outlineColor ?? "#1800B2"; // default fallback

  const outlinedStyle =
    variant === "outlined"
      ? {
          borderColor: borderAndTextColor,
          color: borderAndTextColor,
        }
      : {};
  return (
    <button
      type={type}
      className={`localized-button ${sizeClass} ${variantClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={outlinedStyle}
    >
      {label}
    </button>
  );
};

export default LocalizedButton;
