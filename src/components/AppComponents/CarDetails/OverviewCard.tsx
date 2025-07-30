import React from 'react';
import LocalizedHeading from '../../UIComponents/LocalizedHeading/LocalizedHeading';
import LocalizedText from '../../UIComponents/LocalizedText/LocalizedText';
import './OverviewCard.scss';

interface OverviewCardProps {
  carData: {
    year: string;
    mileage: string;
    fuelType: string;
    condition: string;
    vin: string;
    engine: string;
    transmission: string;
    drivetrain: string;
    exterior: string;
    interior: string;
  };
}

const OverviewCard: React.FC<OverviewCardProps> = ({ carData }) => (
  <div className="overview-card-root">
    {/* Metrics Row */}
    <div className="metrics-row">
      <div className="metric">
        <img src="/images/calender.png" alt="Year" className="metric-icon" />
        <div className="metric-value blue">{carData.year}</div>
        <div className="metric-label">Year</div>
      </div>
      <div className="metric">
        <img src="/images/miles.png" alt="Miles" className="metric-icon" />
        <div className="metric-value blue">{carData.mileage}</div>
        <div className="metric-label">Miles</div>
      </div>
      <div className="metric">
        <img src="/images/Fuel.png" alt="Fuel Type" className="metric-icon" />
        <div className="metric-value blue">{carData.fuelType}</div>
        <div className="metric-label">Fuel Type</div>
      </div>
      <div className="metric">
        <img src="/images/Verify.png" alt="Condition" className="metric-icon" />
        <div className="metric-value blue">{carData.condition}</div>
        <div className="metric-label">Condition</div>
      </div>
    </div>

    {/* Details 2-column grid */}
    <div className="details-2col">
      <div className="details-col">
        <LocalizedHeading heading="Vehicle Details" level={6} className="details-heading blue" />
        <div className="details-row">
          <span className="details-label">VIN:</span>
          <span className="details-value bold">{carData.vin}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Engine:</span>
          <span className="details-value bold">{carData.engine}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Transmission:</span>
          <span className="details-value bold">{carData.transmission}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Drivetrain:</span>
          <span className="details-value bold">{carData.drivetrain}</span>
        </div>
      </div>
      <div className="details-col">
        <LocalizedHeading heading="Colors" level={6} className="details-heading blue" />
        <div className="details-row">
          <span className="details-label">Exterior:</span>
          <span className="details-value bold">{carData.exterior}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Interior:</span>
          <span className="details-value bold">{carData.interior}</span>
        </div>
      </div>
    </div>
  </div>
);

export default OverviewCard; 