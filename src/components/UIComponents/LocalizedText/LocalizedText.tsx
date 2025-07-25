// LocalizedText/LocalizedText.tsx
import React from 'react';
import './LocalizedText.scss';

interface LocalizedTextProps {
  text: string;
  className?: string;
}

const LocalizedText: React.FC<LocalizedTextProps> = ({ text, className = '' }) => {
  return <span className={`localized-text ${className}`}>{(text)}</span>;
};

export default LocalizedText;