// MultipleCheckboxes/MultipleCheckboxes.tsx
import React from 'react';
import './MultipleCheckboxes.scss';

interface Option {
  label: string;
  value: string;
}

interface MultipleCheckboxesProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const MultipleCheckboxes: React.FC<MultipleCheckboxesProps> = ({ options, selected, onChange }) => {
  const toggleOption = (value: string) => {
    const updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onChange(updated);
  };

  return (
    <div className="multiple-checkboxes">
      {options.map((opt) => (
        <label key={opt.value}>
          <input
            type="checkbox"
            checked={selected.includes(opt.value)}
            onChange={() => toggleOption(opt.value)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
};

export default MultipleCheckboxes;