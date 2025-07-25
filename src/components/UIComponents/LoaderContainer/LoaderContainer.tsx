// LoaderContainer/LoaderContainer.tsx
import React from 'react';
import './LoaderContainer.scss';

interface LoaderContainerProps {
  loading: boolean;
  children: React.ReactNode;
  spinner?: React.ReactNode;
}

const LoaderContainer: React.FC<LoaderContainerProps> = ({ loading, children, spinner }) => {
  return (
    <div className="loader-container">
      {loading ? spinner || <div className="default-spinner">Loading...</div> : children}
    </div>
  );
};

export default LoaderContainer;