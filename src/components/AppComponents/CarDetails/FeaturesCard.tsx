import React from 'react';
import LocalizedHeading from '../../UIComponents/LocalizedHeading/LocalizedHeading';
import LocalizedText from '../../UIComponents/LocalizedText/LocalizedText';
import SvgIcons from '../../UIComponents/SvgIcons/SvgIcons';
import './FeaturesCard.scss';

interface CarData {
  make?: string;
  model?: string;
  driveType?: string;
  cyls?: number;
  seats?: number;
  transmission?: string;
  fuelType?: string;
}

const FeaturesCard: React.FC<{ carData: CarData }> = ({ carData }) => {
  const mapFuelType = (code?: string) => {
    const map: Record<string, string> = {
      D: 'Diesel',
      P: 'Petrol',
      E: 'Electric',
      H: 'Hybrid'
    };
    return code ? map[code] || code : '—';
  };

  const features = [
    `Make: ${carData.make || '—'}`,
    `Model: ${carData.model || '—'}`,
    `Drive Type: ${carData.driveType || '—'}`,
    `${carData.cyls || '—'} Cylinders`,
    `${carData.seats || '—'} Seats`,
    `Transmission: ${carData.transmission || '—'}`,
    `Fuel: ${mapFuelType(carData.fuelType)}`
  ];

  return (
    <div className="features-section">
      <LocalizedHeading heading="Standard Features" level={2} className="section-title" />
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-item">
            <SvgIcons name="check" size={20} color="#4CAF50" />
            <LocalizedText text={feature} className="feature-text" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesCard;
