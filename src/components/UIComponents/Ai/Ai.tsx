import React from 'react';
import './Ai.scss';

export interface AiFeature {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

interface AiProps {
  features: AiFeature[];
}

const Ai: React.FC<AiProps> = ({ features }) => {
  return (
    <div className="ai-features-wrapper">
      {features.map((feature, idx) => (
        <div className="ai-feature-card" key={idx}>
          <div className="ai-feature-icon">{feature.icon}</div>
          <div className="ai-feature-title">{feature.title}</div>
          <div className="ai-feature-subtitle">{feature.subtitle}</div>
        </div>
      ))}
    </div>
  );
};

export default Ai;
