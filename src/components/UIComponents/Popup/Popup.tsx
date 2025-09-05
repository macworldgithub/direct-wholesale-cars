"use client";

import React from "react";
import ReactDOM from "react-dom";
import "./Popup.scss";

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-content"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <div className="popup-title">{title}</div>}
        <div className="popup-body">{children}</div>
        <button className="popup-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>,
    document.body 
  );
};

export default Popup;
