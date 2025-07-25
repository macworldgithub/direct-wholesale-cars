// LocalizedTextArea/LocalizedTextArea.tsx
import React from 'react';
import './LocalizedTextArea.scss';

interface LocalizedTextAreaProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholderKey?: string;
  className?: string;
  rows?: number;
}

const LocalizedTextArea: React.FC<LocalizedTextAreaProps> = ({ name, value, onChange, placeholderKey, className = '', rows = 4 }) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholderKey ? (placeholderKey) : ''}
      rows={rows}
      className={`localized-textarea ${className}`}
    />
  );
};

export default LocalizedTextArea;