// LocalizedLabel/LocalizedLabel.tsx
import React from 'react';
import './LocalizedLabel.scss';

interface LocalizedLabelProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
}

const LocalizedLabel: React.FC<LocalizedLabelProps> = ({ label, htmlFor, required }) => {
  return (
    <label className="localized-label" htmlFor={htmlFor}>
      {label} {required && <span className="required">*</span>}
    </label>
  );
};

export default LocalizedLabel;