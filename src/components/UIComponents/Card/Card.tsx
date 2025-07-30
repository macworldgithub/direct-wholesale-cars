
import React from 'react';
import './Card.scss';
import { CiHeart } from "react-icons/ci";

interface CardProps {
  name?: string;
  description?: string;
  price?: string;
  tags?: string[];
  image?: string;
  location?: string;
  onViewDetails?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ 
  name, 
  description, 
  price, 
  tags = [], 
  image, 
  location, 
  onViewDetails,
  className = "",
  children 
}) => {
  // If children are provided, render as a wrapper component
  if (children) {
    return (
      <div className={`card ${className}`}>
        {children}
      </div>
    );
  }

  // Original card implementation for car listings
  return (
    <div className="card">
      <img src={image} alt={name} className="card-image" />
      <div className="card-content">
        <div className="card-title-row">
          <h3 className="card-title">{name}</h3>
          <div className="card-tags">
            {tags.map((tag, idx) => (
              <span className="card-tag" key={idx}>{tag}</span>
            ))}
          </div>
        </div>
        <div className="card-description">{description}</div>
        <div className="card-price-row">
          <span className="card-price">{price}</span>
          <span className="card-wholesale">Wholesale Price</span>
        </div>
        <div className="card-actions">
          <button className="view-details-btn" onClick={onViewDetails}>View Details</button>
          <button className="like-btn" aria-label="Like"><CiHeart /></button>
       
        </div>
        <div className="card-location">{location}</div>
      </div>
    </div>
  );
};

export default Card;