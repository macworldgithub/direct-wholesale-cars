
'use client'; 

import React from 'react';
import './Card.scss';
import { CiHeart } from "react-icons/ci";
import { useRouter } from 'next/navigation'; // ✅ Correct for Next.js

interface CardProps {
  name?: string;
  description?: string;
  price?: string;
  tags?: string[];
  image?: string;
  location?: string;
  className?: string;
  children?: React.ReactNode;
  id?: string; // for dynamic routing
}

const Card: React.FC<CardProps> = ({
  name,
  description,
  price,
  tags = [],
  image,
  location,
  className = "",
  children,
  id
}) => {
  const router = useRouter(); // ✅ useRouter instead of useNavigate

  const handleViewDetails = () => {
    if (id) {
      router.push(`/car_Details/${id}`);
    } else {
      router.push('/car_Details');
    }
  };

  if (children) {
    return (
      <div className={`card ${className}`}>
        {children}
      </div>
    );
  }

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
          <button className="view-details-btn" onClick={handleViewDetails}>
            View Details
          </button>
          <button className="like-btn" aria-label="Like"><CiHeart /></button>
        </div>
        <div className="card-location">{location}</div>
      </div>
    </div>
  );
};

export default Card;
