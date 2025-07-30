"use client";

import React, { useState } from 'react';
import './car_Details_Overview.scss';
import Banner from '../../components/AppComponents/CarDetails/Banner';
import OverviewCard from '../../components/AppComponents/CarDetails/OverviewCard';
import FeaturesCard from '../../components/AppComponents/CarDetails/FeaturesCard';
import InspectionReportCard from '../../components/AppComponents/CarDetails/InspectionReportCard';
import LocalizedHeading from '../../components/UIComponents/LocalizedHeading/LocalizedHeading';
import LocalizedText from '../../components/UIComponents/LocalizedText/LocalizedText';
import LocalizedButton from '../../components/UIComponents/LocalizedButton/LocalizedButton';
import Card from '../../components/UIComponents/Card/Card';
import SvgIcons from '../../components/UIComponents/SvgIcons/SvgIcons';

const CarDetailsOverviewPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carData = {
    name: "2023 Toyota Camry LE",
    price: "$28,750",
    mileage: "15,000",
    year: "2022",
    fuelType: "Gasoline",
    condition: "Excellent",
    location: "Los Angeles, CA",
    vin: "4T1C11AKBMU123456",
    engine: "2.5L 4-Cylinder",
    transmission: "Automatic",
    drivetrain: "FWD",
    exterior: "Midnight Black",
    interior: "Black Leather",
    images: [
      "/images/car.png",
      "/images/car.png",
      "/images/car.png",
      "/images/car.png"
    ],
    features: [
      "Blind Spot Monitor",
      "Lane Departure Alert",
      "Pre-Collision System",
      "Adaptive Cruise Control",
      "Apple CarPlay",
      "Android Auto",
      "Wireless Charging",
      "Heated Front Seats"
    ],
    inspection: {
      overall: "Excellent",
      exterior: "Excellent",
      interior: "Very Good",
      engine: "Excellent",
      transmission: "Excellent",
      brakes: "Good",
      tires: "Very Good",
      notes: "Vehicle shows minimal wear consistent with mileage. Recent maintenance records available."
    }
  };

  const dealerInfo = {
    name: "Premium Motors",
    rating: "4.8",
    address: "123 Auto Row, Los Angeles, CA 90210",
    phone: "+1 (555) 123-4567",
    email: "info@premiummotors.com"
  };

  const quickStats = {
    listedDays: "3 days ago",
    views: "127",
    inquiries: "8",
    marketValue: "Below Market"
  };

  const handleImageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex(prev => prev === 0 ? carData.images.length - 1 : prev - 1);
    } else {
      setCurrentImageIndex(prev => prev === carData.images.length - 1 ? 0 : prev + 1);
    }
  };

  const renderOverview = () => (
    <div className="overview-content">
      <OverviewCard carData={carData} />
    </div>
  );

  return (
    <div className="car-details-overview-page">
      <Banner
        src="/images/banner.png"
        alt="Car Details Banner"
        showText={true}
        bannerText=""
      />

      <div className="main-content">
        <div className="left-column">
          <div className="car-gallery">
            <div className="main-image-container">
              <img
                src={carData.images[currentImageIndex]}
                alt={`Car ${currentImageIndex + 1}`}
                className="main-car-image"
              />
              <div className="image-counter">
                <LocalizedText text={`${currentImageIndex + 1}/${carData.images.length}`} className="counter-text" />
              </div>
              <div className="image-controls">
                <button className="nav-button prev" onClick={() => handleImageChange('prev')}>
                  <SvgIcons name="arrow" size={20} color="white" />
                </button>
                <button className="nav-button next" onClick={() => handleImageChange('next')}>
                  <SvgIcons name="arrow" size={20} color="white" />
                </button>
              </div>
              <div className="action-buttons">
                <button className="action-btn">
                  <SvgIcons name="heart" size={20} color="white" />
                </button>
                <button className="action-btn">
                  <SvgIcons name="share" size={20} color="white" />
                </button>
              </div>
            </div>

            <div className="thumbnail-container">
              {carData.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="navigation-tabs">
            <LocalizedButton
              label="Overview"
              onClick={() => setActiveTab('overview')}
              className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
              variant="transparent-bottom-rounded"
              size="md"
            />
            <LocalizedButton
              label="Features"
              onClick={() => setActiveTab('features')}
              className={`tab-button ${activeTab === 'features' ? 'active' : ''}`}
              variant="transparent-bottom-rounded"
              size="md"
            />
            <LocalizedButton
              label="Inspection Report"
              onClick={() => setActiveTab('inspection')}
              className={`tab-button ${activeTab === 'inspection' ? 'active' : ''}`}
              variant="transparent-bottom-rounded"
              size="md"
            />
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'features' && <FeaturesCard features={carData.features} />}
            {activeTab === 'inspection' && <InspectionReportCard inspection={carData.inspection} />}
          </div>
        </div>

        <div className="right-column">
          <Card className="price-card">
            <LocalizedHeading heading={carData.name} level={2} className="car-title" />
            <div className="price-display">
              <LocalizedText text={carData.price} className="price" />
            </div>
            <div className="action-buttons">
              <LocalizedButton
                label="Buy Now"
                onClick={() => console.log('Buy Now clicked')}
                className="buy-now-btn"
                variant="filled"
                size="md"
              />
              <LocalizedButton
                label="Make Offer"
                onClick={() => console.log('Make Offer clicked')}
                className="make-offer-btn"
                variant="filled"
                size="md"
              />
              <LocalizedButton
                label="Contact"
                onClick={() => console.log('Contact clicked')}
                className="contact-btn"
                variant="filled-dark-and-uppercase"
                size="md"
              />
            </div>
          </Card>

          <Card className="dealer-card">
            <LocalizedHeading heading="Dealer Information" level={3} className="card-title" />
            <div className="dealer-info">
              <LocalizedText text={dealerInfo.name} className="dealer-name" />
              <div className="rating">
                <SvgIcons name="star" size={16} color="#FFD700" />
                <LocalizedText text={`${dealerInfo.rating} rating`} className="rating-text" />
              </div>
              <div className="address">
                <SvgIcons name="location" size={16} color="#666" />
                <LocalizedText text={dealerInfo.address} className="address-text" />
              </div>
              <div className="contact-options">
                <div className="contact-item">
                  <SvgIcons name="phone" size={16} color="#666" />
                  <LocalizedText text="Signup" className="contact-text" />
                </div>
                <div className="contact-item">
                  <SvgIcons name="email" size={16} color="#666" />
                  <LocalizedText text="Signup" className="contact-text" />
                </div>
              </div>
              <LocalizedButton
                label="Contact Dealer"
                onClick={() => console.log('Contact Dealer clicked')}
                className="contact-dealer-btn"
                variant="filled"
                size="md"
              />
            </div>
          </Card>

          <Card className="stats-card">
            <LocalizedHeading heading="Quick Stats" level={3} className="card-title" />
            <div className="stats-list">
              <div className="stat-item">
                <LocalizedText text={`Listed: ${quickStats.listedDays}`} className="stat-text" />
              </div>
              <div className="stat-item">
                <LocalizedText text={`Views: ${quickStats.views}`} className="stat-text" />
              </div>
              <div className="stat-item">
                <LocalizedText text={`Interest: ${quickStats.inquiries} inquiries`} className="stat-text" />
              </div>
              <div className="stat-item">
                <LocalizedText text={`Market Value: ${quickStats.marketValue}`} className="market-value" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsOverviewPage;
