import React from 'react';
import LocalizedHeading from '../../UIComponents/LocalizedHeading/LocalizedHeading';
import LocalizedText from '../../UIComponents/LocalizedText/LocalizedText';
import './InspectionReportCard.scss';

interface InspectionReportCardProps {
  inspection: {
    overall: string;
    exterior: string;
    interior: string;
    engine: string;
    transmission: string;
    brakes: string;
    tires: string;
    notes: string;
  };
}

const InspectionReportCard: React.FC<InspectionReportCardProps> = ({ inspection }) => (
  <div className="inspection-card-root">
    {/* <LocalizedHeading heading="Inspection Report" level={5} className="inspection-heading blue" /> */}
    
    {/* Overall Condition Banner */}
    <div className="overall-condition">
      <div className="condition-banner">
        <div className="checkmark-icon">✓</div>
        <span className="condition-text">Overall Condition: {inspection.overall}</span>
      </div>
    </div>

    {/* Two Column Layout */}
    <div className="inspection-content">
      <div className="component-ratings">
        <LocalizedHeading heading="Component Ratings" level={6} className="subsection-title blue" />
        <div className="ratings-list">
          <div className="rating-item">
            <span className="component-name">Exterior:</span>
            <span className="rating-value">{inspection.exterior}</span>
          </div>
          <div className="rating-item">
            <span className="component-name">Interior:</span>
            <span className="rating-value">{inspection.interior}</span>
          </div>
          <div className="rating-item">
            <span className="component-name">Engine:</span>
            <span className="rating-value">{inspection.engine}</span>
          </div>
          <div className="rating-item">
            <span className="component-name">Transmission:</span>
            <span className="rating-value">{inspection.transmission}</span>
          </div>
          <div className="rating-item">
            <span className="component-name">Brakes:</span>
            <span className="rating-value">{inspection.brakes}</span>
          </div>
          <div className="rating-item">
            <span className="component-name">Tires:</span>
            <span className="rating-value">{inspection.tires}</span>
          </div>
        </div>
      </div>

      <div className="inspector-notes">
        <LocalizedHeading heading="Inspector Notes" level={6} className="subsection-title blue" />
        <div className="notes-text">
          {inspection.notes}
        </div>
      </div>
    </div>
  </div>
);

export default InspectionReportCard; 