import React, { JSX } from 'react';

export interface LocalizedHeadingProps {
  heading: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

const LocalizedHeading: React.FC<LocalizedHeadingProps> = ({
  heading,
  level = 2,
  className = ''
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return <Tag className={className}>{(heading)}</Tag>;
};

export default LocalizedHeading;
