import React from 'react';
import './Network.scss';

export interface NetworkStep {
  image: React.ReactNode;
  title: string;
  subtitle: string;
}

interface NetworkProps {
  heading: string;
  subheading: string;
  steps: NetworkStep[];
}

const Network: React.FC<NetworkProps> = ({ heading, subheading, steps }) => {
  return (
    <div className="network-section">
      <h2 className="network-heading">{heading}</h2>
      <div className="network-subheading">{subheading}</div>
      <div className="network-steps-wrapper">
        {steps.map((step, idx) => (
          <div className="network-step-card" key={idx}>
            <div className="network-step-image">{step.image}</div>
            <div className="network-step-title">{step.title}</div>
            <div className="network-step-subtitle">{step.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Network;
