import React from "react";
import "./Banner.scss";
import Image from "next/image";
import LocalizedHeading from "../LocalizedHeading/LocalizedHeading";

interface BannerProps {
  imageSrc: string;
  title?: React.ReactNode; // Now allows JSX
  subtitle?: string;
  altText?: string;
  showOverlay?: boolean;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children?: React.ReactNode;
  button?: React.ReactNode;
}

const Banner: React.FC<BannerProps> = ({
  imageSrc,
  title,
  subtitle,
  altText = "",
  showOverlay = true,
  headingLevel = 1,
  className = "",
  children,
  button,
}) => {
  return (
    <div className={`banner-container ${className}`}>
      <Image
        src={imageSrc}
        alt={altText}
        layout="fill"
        objectFit="cover"
        className="banner-image"
      />
      {showOverlay && <div className="banner-overlay" />}
      <div className="banner-content">
        {title && (
          <LocalizedHeading level={headingLevel} className="banner-title">
            {title}
          </LocalizedHeading>
        )}
        {subtitle && <p className="banner-subtitle">{subtitle}</p>}
      {button && <div style={{textAlign: "left"}}>{button}</div>}
        {children}
      </div>
    </div>
  );
};

export default Banner;
