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
import { fetchCarAdById, sendEmailInquiry } from "@/api/cars";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import Toast from "@/components/UIComponents/Toast/Toast";

const CarDetailsOverviewPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const carId = searchParams?.get("wholesalerId") ?? "";
  const vinId = searchParams?.get("vin") ?? "";

  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carData, setCarData] = useState<any>(null);
  console.log(carData)
  const [loading, setLoading] = useState(true);

  const [buttonLabel, setButtonLabel] = useState("Request More Info");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">("success");

  const dealer = useSelector((state: RootState) => state.SignuinDealer.dealer);
  const wholesaler = useSelector(
    (state: RootState) => state.SigninWholesaler.wholesaler
  );
  const user = dealer || wholesaler;
  const senderId = user?._id;
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

  useEffect(() => {
    // Check per-car flag in localStorage
    const inquirySent = localStorage.getItem(`inquirySent_${carId}`);
    if (inquirySent === "true") {
      setButtonLabel("Reserve Now");
    }
  }, [carId]);

  const handleRequestInfo = () => {
    if (!user?._id || !carData?._id || !carData?.wholesaler) {
      setToastMessage("Please log in to send an inquiry.");
      setToastSeverity("error");
      setToastOpen(true);
      return;
    }

    dispatch(
      sendEmailInquiry({
        senderId: user._id,
        receiverId: carData.wholesaler,
        carId: carData._id,
      })
    )
      .unwrap()
      .then((res) => {
        setToastMessage(res.message || "Inquiry sent successfully!");
        setToastSeverity("success");
        setToastOpen(true);

        localStorage.setItem(`inquirySent_${carData._id}`, "true"); // per car
        setButtonLabel("Reserve Now");
      })
      .catch((err) => {
        setToastMessage(err || "Failed to send inquiry");
        setToastSeverity("error");
        setToastOpen(true);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!carData) {
    return <div>Car not found.</div>;
  }

  const images = carData.images ?? [];
  const mainImage = images[currentImageIndex] || "/images/placeholder-image.jpg";

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
          {/* <div className="car-gallery">
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
          </div> */}
          <div className="car-description-container">
            <h2 className="car-description-heading">Description</h2>
            <p className="car-description-text">
              {carData.description || "No description available."}
            </p>
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
            {/* <LocalizedHeading
              heading={carData.title ?? "Untitled Car"}
              level={2}
              className="car-title"
            /> */}
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
                label={buttonLabel}
                onClick={handleRequestInfo}
                className="make-offer-btn"
                variant="full"
              />
              <LocalizedButton
                label="Contact"
                onClick={() => console.log("Contact clicked")}
                className="contact-btn"
                variant="full"
              />
              <Toast
                open={toastOpen}
                onClose={() => {
                  setToastOpen(false);
                  if (toastSeverity === "success") {
                    window.location.reload();
                  }
                }}
                message={toastMessage}
                severity={toastSeverity}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsOverviewPage;
