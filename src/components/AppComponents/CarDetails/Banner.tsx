import React from 'react';
import './Banner.scss';

interface BannerProps {
  src: string;
  alt?: string;
  className?: string;
  showText?: boolean;
  bannerText?: string;
}

const Banner: React.FC<BannerProps> = ({ 
  src, 
  alt = 'Banner', 
  className = '', 
  showText = false,
  bannerText = 'Car Details'
}) => (
  <div className={`banner-section ${className}`}>
    <img src={src} alt={alt} className="banner-image" />
    {showText && (
      <div className="banner-overlay">
        <h1 className="banner-text">{bannerText}</h1>
      </div>
    )}
  </div>
);

export default Banner; 