// FormFieldContainer/FormFieldContainer.tsx
import React from 'react';
import './FormFieldContainer.scss';

interface FormFieldContainerProps {
  label?: string;
  children: React.ReactNode;
  error?: string;
}

const FormFieldContainer: React.FC<FormFieldContainerProps> = ({ label, children, error }) => {
  return (
    <div className="form-field-container">
      {label && <label className="label">{label}</label>}
      {children}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default FormFieldContainer;