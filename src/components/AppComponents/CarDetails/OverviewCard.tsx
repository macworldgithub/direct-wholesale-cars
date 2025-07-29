import React from 'react';
import LocalizedHeading from '../../UIComponents/LocalizedHeading/LocalizedHeading';
import LocalizedText from '../../UIComponents/LocalizedText/LocalizedText';
import './OverviewCard.scss';

interface OverviewCardProps {
  carData: {
    name: string;
    price: string;
    mileage: string;
    location: string;
    vin: string;
    engine: string;
    transmission: string;
    drivetrain: string;
    exterior: string;
    interior: string;
    images: string[];
  };
}

const OverviewCard: React.FC<OverviewCardProps> = ({ carData }) => (
  <div className="overview-section">
    <div className="car-images">
      <div className="main-image">
        <img src={carData.images[0]} alt="Car" />
      </div>
      <div className="thumbnail-images">
        {carData.images.slice(1).map((img, idx) => (
          <img key={idx} src={img} alt={`Thumbnail ${idx + 1}`} />
        ))}
      </div>
    </div>
    <div className="car-info">
      <LocalizedHeading heading={carData.name} level={1} className="car-title" />
      <div className="price-section">
        <LocalizedText text={carData.price} className="price" />
        <LocalizedText text={carData.mileage} className="mileage" />
      </div>
      <div className="car-details-grid">
        <div className="detail-item">
          <LocalizedText text="Location" className="detail-label" />
          <LocalizedText text={carData.location} className="detail-value" />
        </div>
        <div className="detail-item">
          <LocalizedText text="VIN" className="detail-label" />
          <LocalizedText text={carData.vin} className="detail-value" />
        </div>
        <div className="detail-item">
          <LocalizedText text="Engine" className="detail-label" />
          <LocalizedText text={carData.engine} className="detail-value" />
        </div>
        <div className="detail-item">
          <LocalizedText text="Transmission" className="detail-label" />
          <LocalizedText text={carData.transmission} className="detail-value" />
        </div>
        <div className="detail-item">
          <LocalizedText text="Drivetrain" className="detail-label" />
          <LocalizedText text={carData.drivetrain} className="detail-value" />
        </div>
        <div className="detail-item">
          <LocalizedText text="Exterior" className="detail-label" />
          <LocalizedText text={carData.exterior} className="detail-value" />
        </div>
        <div className="detail-item">
          <LocalizedText text="Interior" className="detail-label" />
          <LocalizedText text={carData.interior} className="detail-value" />
        </div>
      </div>
    </div>
  </div>
);

export default OverviewCard; 