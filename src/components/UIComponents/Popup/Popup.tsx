// Popup/Popup.tsx
import React from 'react';
import './Popup.scss';

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-backdrop">
      <div className="popup-content">
        {title && <div className="popup-title">{title}</div>}
        <div className="popup-body">{children}</div>
        <button className="popup-close" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default Popup;
