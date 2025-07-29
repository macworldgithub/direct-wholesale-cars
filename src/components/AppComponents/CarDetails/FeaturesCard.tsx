import React from 'react';
import Card from '../../UIComponents/Card/Card';
import LocalizedHeading from '../../UIComponents/LocalizedHeading/LocalizedHeading';
import LocalizedText from '../../UIComponents/LocalizedText/LocalizedText';
import SvgIcons from '../../UIComponents/SvgIcons/SvgIcons';
import './FeaturesCard.scss';

interface FeaturesCardProps {
  features: string[];
}

const FeaturesCard: React.FC<FeaturesCardProps> = ({ features }) => (
  <div className="features-section">
    <LocalizedHeading heading="Features & Options" level={2} className="section-title" />
    <div className="features-grid">
      {features.map((feature, index) => (
        <Card key={index} className="feature-card">
          <div className="feature-item">
            <SvgIcons name="check" size={20} color="#4CAF50" />
            <LocalizedText text={feature} className="feature-text" />
          </div>
        </Card>
      ))}
    </div>
  </div>
);

export default FeaturesCard; 