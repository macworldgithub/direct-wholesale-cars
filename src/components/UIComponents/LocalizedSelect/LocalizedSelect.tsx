// LocalizedSelect/LocalizedSelect.tsx
import React from 'react';
import './LocalizedSelect.scss';

interface Option {
  value: string;
  label: string; // ✅ changed from labelKey to label
}

interface LocalizedSelectProps {
  name: string;
  label?: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
}

const LocalizedSelect: React.FC<LocalizedSelectProps> = ({
  name,
  label,
  value,
  options,
  onChange,
  className = ''
}) => {
  return (
    <div className={`localized-select-wrapper ${className}`}>
      {label && <label htmlFor={name} className="localized-select-label">{label}</label>}
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="localized-select"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocalizedSelect;
