import React, { JSX, ReactNode } from "react";
import "./LocalizedHeading.scss";

export interface LocalizedHeadingProps {
  heading?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children?: ReactNode;
  variant?: "black" | "white"; 
}

const LocalizedHeading: React.FC<LocalizedHeadingProps> = ({
  heading,
  level = 2,
  className = "",
  children,
  variant = "black",
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const combinedClassName = `localized-heading h${level} variant-${variant} ${className}`.trim();

  return <Tag className={combinedClassName}>{children ?? heading}</Tag>;
};

export default LocalizedHeading;
