import React from 'react';
import './Backdrop.scss';

interface BackdropProps {
  isVisible: boolean;
  onClick: () => void;
  className?: string;
}

const Backdrop: React.FC<BackdropProps> = ({ isVisible, onClick, className = '' }) => {
  if (!isVisible) return null;
  return <div className={`backdrop ${className}`} onClick={onClick} />;
};

export default Backdrop;