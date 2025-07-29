// LocalizedCheckbox/LocalizedCheckbox.tsx
import React from 'react';
import './LocalizedCheckbox.scss';

interface LocalizedCheckboxProps {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  labelKey: React.ReactNode;
  className?: string;
}

const LocalizedCheckbox: React.FC<LocalizedCheckboxProps> = ({ name, checked, onChange, labelKey, className = '' }) => {

  return (
    <label className={`localized-checkbox ${className}`}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {(labelKey)}
    </label>
  );
};

export default LocalizedCheckbox;