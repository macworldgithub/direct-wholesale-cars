import React from 'react';
import LocalizedHeading from '../../UIComponents/LocalizedHeading/LocalizedHeading';
import './OverviewCard.scss';

interface CarData {
  buildDate?: string;
  odometer?: number;
  fuelType?: string;
  condition?: string;
  vin?: string;
  engineNumber?: string;
  transmission?: string;
  driveType?: string;
  cyls?: number;
  seats?: number;
}

const OverviewCard: React.FC<{ carData: CarData }> = ({ carData }) => {
  const displayValue = (value?: string | number) =>
    value !== undefined && value !== null && value !== '' ? value : '—';

  const mapFuelType = (code?: string) => {
    const map: Record<string, string> = {
      D: 'Diesel',
      P: 'Petrol',
      E: 'Electric',
      H: 'Hybrid'
    };
    return code ? map[code] || code : '—';
  };

  return (
    <div className="overview-card-root">
      {/* Metrics Row */}
      <div className="metrics-row">
        <div className="metric">
          <img src="/images/calender.png" alt="Year" className="metric-icon" />
          <div className="metric-value blue">
            {displayValue(carData.buildDate?.split('-')[0])}
          </div>
          <div className="metric-label">Year</div>
        </div>
        <div className="metric">
          <img src="/images/miles.png" alt="Odometer" className="metric-icon" />
          <div className="metric-value blue">
            {displayValue(`${carData.odometer} km`)}
          </div>
          <div className="metric-label">Odometer</div>
        </div>
        <div className="metric">
          <img src="/images/Fuel.png" alt="Fuel Type" className="metric-icon" />
          <div className="metric-value blue">{mapFuelType(carData.fuelType)}</div>
          <div className="metric-label">Fuel Type</div>
        </div>
        <div className="metric">
          <img src="/images/Verify.png" alt="Condition" className="metric-icon" />
          <div className="metric-value blue">{displayValue(carData.condition)}</div>
          <div className="metric-label">Condition</div>
        </div>
      </div>

      {/* Details 2-column grid */}
      <div className="details-2col">
        <div className="details-col">
          <LocalizedHeading heading="Vehicle Details" level={6} className="details-heading blue" />
          <div className="details-row">
            <span className="details-label">VIN:</span>
            <span className="details-value bold">{displayValue(carData.vin)}</span>
          </div>
          <div className="details-row">
            <span className="details-label">Engine Number:</span>
            <span className="details-value bold">{displayValue(carData.engineNumber)}</span>
          </div>
          <div className="details-row">
            <span className="details-label">Cylinders:</span>
            <span className="details-value bold">{displayValue(carData.cyls)}</span>
          </div>
          <div className="details-row">
            <span className="details-label">Seats:</span>
            <span className="details-value bold">{displayValue(carData.seats)}</span>
          </div>
        </div>

        <div className="details-col">
          <LocalizedHeading heading="Specifications" level={6} className="details-heading blue" />
          <div className="details-row">
            <span className="details-label">Transmission:</span>
            <span className="details-value bold">{displayValue(carData.transmission)}</span>
          </div>
          <div className="details-row">
            <span className="details-label">Drive Type:</span>
            <span className="details-value bold">{displayValue(carData.driveType)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
