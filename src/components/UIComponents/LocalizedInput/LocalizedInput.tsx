// LocalizedInput/LocalizedInput.tsx
import React from 'react';
import './LocalizedInput.scss';

interface LocalizedInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholderKey?: string;
  className?: string;
  type?: string;
}

const LocalizedInput: React.FC<LocalizedInputProps> = ({ name, value, onChange, placeholderKey, className = '', type = 'text' }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholderKey ? (placeholderKey) : ''}
      className={`localized-input ${className}`}
    />
  );
};

export default LocalizedInput;
