// TimeSelect/TimeSelect.tsx
import React from 'react';
import './TimeSelect.scss';

interface TimeSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options?: string[];
}

const defaultOptions = [
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM'
];

const TimeSelect: React.FC<TimeSelectProps> = ({ label, value, onChange, options = defaultOptions }) => {
  return (
    <div className="time-select">
      {label && <label>{label}</label>}
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeSelect;