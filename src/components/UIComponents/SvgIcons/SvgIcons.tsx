// SvgIcons/SvgIcons.tsx
import React, { JSX } from 'react';

interface SvgIconProps {
  name: 'check' | 'close' | 'arrow' | string;
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