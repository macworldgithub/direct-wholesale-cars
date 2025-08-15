import React from "react";
import "./InspectionReportCard.scss";

const InspectionReportCard: React.FC = () => (
  <div className="inspection-card-root">
    <div className="overall-condition">
      <div className="condition-banner">
        <span className="condition-text">
          No inspection report available for this vehicle.
        </span>
      </div>
    </div>
  </div>
);

export default InspectionReportCard;
