import React from 'react';
import Card from '../../UIComponents/Card/Card';
import LocalizedHeading from '../../UIComponents/LocalizedHeading/LocalizedHeading';
import LocalizedText from '../../UIComponents/LocalizedText/LocalizedText';
import './InspectionReportCard.scss';

interface InspectionReportCardProps {
  inspection: Record<string, string>;
}

const InspectionReportCard: React.FC<InspectionReportCardProps> = ({ inspection }) => (
  <div className="inspection-section">
    <LocalizedHeading heading="Inspection Report" level={2} className="section-title" />
    <div className="inspection-grid">
      {Object.entries(inspection).map(([category, status]) => (
        <Card key={category} className="inspection-card">
          <div className="inspection-item">
            <LocalizedText text={category.charAt(0).toUpperCase() + category.slice(1)} className="inspection-category" />
            <div className={`status-badge ${status.toLowerCase()}`}>
              <LocalizedText text={status} className="status-text" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

export default InspectionReportCard; 