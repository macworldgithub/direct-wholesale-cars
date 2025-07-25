// TimeDropdown/TimeDropdown.tsx
import React from 'react';
import './TimeDropdown.scss';

interface TimeDropdownProps {
  value: string;
  onChange: (value: string) => void;
  interval?: number;
}

const generateTimeOptions = (interval = 30) => {
  const times: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += interval) {
      const hour = h.toString().padStart(2, '0');
      const minute = m.toString().padStart(2, '0');
      times.push(`${hour}:${minute}`);
    }
  }
  return times;
};

const TimeDropdown: React.FC<TimeDropdownProps> = ({ value, onChange, interval = 30 }) => {
  const options = generateTimeOptions(interval);
  return (
    <select className="time-dropdown" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
};

export default TimeDropdown;