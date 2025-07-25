// RadioButtons/RadioButtons.tsx
import React from 'react';
import './RadioButtons.scss';

interface Option {
  label: string;
  value: string;
}

interface RadioButtonsProps {
  name: string;
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
}

const RadioButtons: React.FC<RadioButtonsProps> = ({ name, options, selected, onChange }) => {
  return (
    <div className="radio-buttons">
      {options.map((opt) => (
        <label key={opt.value}>
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={selected === opt.value}
            onChange={() => onChange(opt.value)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
};

export default RadioButtons;