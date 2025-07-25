// IconButton/IconButton.tsx
import React from 'react';
import './IconButton.scss';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, className = '', ariaLabel }) => {
  return (
    <button className={`icon-button ${className}`} onClick={onClick} aria-label={ariaLabel}>
      {icon}
    </button>
  );
};

export default IconButton;
