// LocalizedButton.tsx
import React from 'react';
import './LocalizedButton.scss';

interface LocalizedButtonProps {
  label: string; // plain string now
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const LocalizedButton: React.FC<LocalizedButtonProps> = ({
  label,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}) => {
  return (
    <button
      type={type}
      className={`localized-button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default LocalizedButton;
