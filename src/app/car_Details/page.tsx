"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import "./car_Details_Overview.scss";
import Banner from "../../components/AppComponents/CarDetails/Banner";
import OverviewCard from "../../components/AppComponents/CarDetails/OverviewCard";
import FeaturesCard from "../../components/AppComponents/CarDetails/FeaturesCard";
import InspectionReportCard from "../../components/AppComponents/CarDetails/InspectionReportCard";
import LocalizedHeading from "../../components/UIComponents/LocalizedHeading/LocalizedHeading";
import LocalizedText from "../../components/UIComponents/LocalizedText/LocalizedText";
import LocalizedButton from "../../components/UIComponents/LocalizedButton/LocalizedButton";
import Card from "../../components/UIComponents/Card/Card";
import SvgIcons from "../../components/UIComponents/SvgIcons/SvgIcons";
import { fetchCarAdById } from "@/api/cars";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

const CarDetailsOverviewPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const carId = searchParams?.get("wholesalerId") ?? "";
  const vinId = searchParams?.get("vin") ?? "";

  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carData, setCarData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (carId && vinId) {
      dispatch(fetchCarAdById({ wholesalerId: carId, vin: vinId }))
        .unwrap()
        .then((data) => setCarData(data))
        .finally(() => setLoading(false));
    }
  }, [carId, vinId, dispatch]);

  const handleImageChange = (direction: "prev" | "next") => {
    if (!carData?.images?.length) return;
    if (direction === "prev") {
      setCurrentImageIndex((prev) =>
        prev === 0 ? carData.images.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === carData.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const renderOverview = () => (
    <div className="overview-content">
      <OverviewCard carData={carData} />
    </div>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!carData) {
    return <div>Car not found.</div>;
  }

  const images = carData.images ?? [];
  const mainImage = images[currentImageIndex] || "/images/placeholder-car.png";

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
                src={mainImage}
                alt={`Car ${currentImageIndex + 1}`}
                className="main-car-image"
              />
              {images.length > 0 && (
                <div className="image-counter">
                  <LocalizedText
                    text={`${currentImageIndex + 1}/${images.length}`}
                    className="counter-text"
                  />
                </div>
              )}
              {images.length > 1 && (
                <div className="image-controls">
                  <button
                    className="nav-button prev"
                    onClick={() => handleImageChange("prev")}
                  >
                    <SvgIcons name="arrow" size={20} color="white" />
                  </button>
                  <button
                    className="nav-button next"
                    onClick={() => handleImageChange("next")}
                  >
                    <SvgIcons name="arrow" size={20} color="white" />
                  </button>
                </div>
              )}
              <div className="action-buttons">
                <button className="action-btn">
                  <SvgIcons name="heart" size={20} color="white" />
                </button>
                <button className="action-btn">
                  <SvgIcons name="share" size={20} color="white" />
                </button>
              </div>
            </div>

            {images.length > 1 && (
              <div className="thumbnail-container">
                {images.map((img: string, index: number) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className={`thumbnail ${index === currentImageIndex ? "active" : ""
                      }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="navigation-tabs">
            <LocalizedButton
              label="Overview"
              onClick={() => setActiveTab("overview")}
              className={`tab-button ${activeTab === "overview" ? "active" : ""
                }`}
              variant="transparent-bottom-rounded"
              size="md"
            />
            <LocalizedButton
              label="Features"
              onClick={() => setActiveTab("features")}
              className={`tab-button ${activeTab === "features" ? "active" : ""
                }`}
              variant="transparent-bottom-rounded"
              size="md"
            />
            <LocalizedButton
              label="Inspection Report"
              onClick={() => setActiveTab("inspection")}
              className={`tab-button ${activeTab === "inspection" ? "active" : ""
                }`}
              variant="transparent-bottom-rounded"
              size="md"
            />
          </div>

          <div className="tab-content">
            {activeTab === "overview" && renderOverview()}
            {activeTab === "features" && (
              <FeaturesCard carData={carData} />
            )}
            {activeTab === "inspection" && (
              <InspectionReportCard />
            )}
          </div>
        </div>

        <div className="right-column">
          <Card className="price-card">
            <LocalizedHeading
              heading={carData.title ?? "Untitled Car"}
              level={2}
              className="car-title"
            />
            {carData.price && (
              <div className="price-display">
                <LocalizedText
                  text={`$${carData.price.toLocaleString()}`}
                  className="price"
                />
              </div>
            )}
            <div className="action-buttons">
              <LocalizedButton
                label="Reserve"
                onClick={() => console.log("Make Offer clicked")}
                className="make-offer-btn"
                variant="full"
              />
              <LocalizedButton
                label="Contact"
                onClick={() => console.log("Contact clicked")}
                className="contact-btn"
                variant="full"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsOverviewPage;
