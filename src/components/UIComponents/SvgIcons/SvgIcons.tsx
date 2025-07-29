// SvgIcons/SvgIcons.tsx
import React, { JSX } from 'react';

interface SvgIconProps {
  name: 'check' | 'close' | 'arrow' | 'search' | string;
  size?: number;
  color?: string;
  className?: string;
}

const icons: Record<string, JSX.Element> = {
  check: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L12 13.41l-6.29 6.3-1.42-1.42L10.59 12 4.29 5.71 5.7 4.29 12 10.59l6.29-6.3z" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 17l5-5-5-5v10z" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  )
};

const SvgIcons: React.FC<SvgIconProps> = ({ name, size = 24, color = 'currentColor', className = '' }) => {
  const icon = icons[name] || null;
  return (
    <span
      className={`svg-icon ${className}`}
      style={{ width: size, height: size, display: 'inline-flex', color }}
    >
      {icon}
    </span>
  );
};

export default SvgIcons;