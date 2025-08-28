"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Price from "../components/UIComponents/Price/Price";
import Ai from "../components/UIComponents/Ai/Ai";
import Network from "../components/UIComponents/Network/Network";
import "./cars/cars.scss";
import ContactInfo from "@/components/UIComponents/ContactInfo/ContactInfo";
import ContactForm from "@/components/UIComponents/ContactForm/ContactForm";
import Banner from "@/components/UIComponents/Banner/Banner";
import LocalizedButton from "@/components/UIComponents/LocalizedButton/LocalizedButton";
import Hero from "@/components/AppComponents/Hero/Hero";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import CustomModal from "@/components/UIComponents/LocalizedModal/LocalizedModal";
import { Typography, Button, Input } from "@mui/material";
import { fetchAllCarAds } from "@/api/cars";
import axios from "axios";
import { BACKEND_URL } from "@/config/server";

const features = [
  {
    icon: (
      <img
        src="/images/power.png"
        alt="AI Search"
        style={{ width: 36, height: 36 }}
      />
    ),
    title: "AI-Powered Search",
    subtitle:
      "Advanced algorithms to find the perfect vehicles matching your criteria instantly.",
  },
  {
    icon: (
      <img
        src="/images/secure.png"
        alt="Secure Transactions"
        style={{ width: 36, height: 36 }}
      />
    ),
    title: "Secure Transactions",
    subtitle:
      "Bank-level security for all transactions with escrow protection.",
  },
  {
    icon: (
      <img
        src="/images/pricing.png"
        alt="Wholesale Pricing"
        style={{ width: 36, height: 36 }}
      />
    ),
    title: "Wholesale Pricing",
    subtitle:
      "Direct access to wholesale prices with transparent fee structure.",
  },
  {
    icon: (
      <img
        src="/images/verified-person.png"
        alt="Verified Dealers"
        style={{ width: 36, height: 36 }}
      />
    ),
    title: "Verified Dealers",
    subtitle:
      "All dealers are thoroughly vetted and verified for your peace of mind.",
  },
];

const networkSteps = [
  {
    image: <img src="/images/application.png" alt="Application" />,
    title: "Application",
    subtitle: "Submit your dealer application with business documentation",
  },
  {
    image: <img src="/images/verification.png" alt="Verification" color="black"/>,
    title: "Verification",
    subtitle: "Our team verifies your credentials and business license",
  },
  {
    image: <img src="/images/user.png" alt="Go Live" />,
    title: "Go Live",
    subtitle: "Start buying and selling with full platform access",
  },
];

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const dealer = useSelector((state: RootState) => state.SignuinDealer.dealer);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hasSeenRegisterModal");

    if (!dealer && !hasSeenModal) {
      setShowModal(true);
      localStorage.setItem("hasSeenRegisterModal", "true");
    }
  }, [dealer]);

  const handleRegisterClick = () => {
    router.push("/signup");
    setShowModal(false);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (
      file &&
      (file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "text/csv")
    ) {
      setSelectedFile(file);
      setUploadStatus("");
    } else {
      setSelectedFile(null);
      setUploadStatus("Please select a valid Excel (.xlsx) or CSV file");
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile || !dealer?._id) {
      setUploadStatus("Please select a file and ensure you are logged in");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/cars/${dealer._id}/upload-excel`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus("File uploaded successfully!");
      setSelectedFile(null);
      dispatch(fetchAllCarAds()); // Refresh the car list
    } catch (error: any) {
      setUploadStatus(error.response?.data?.message || "Failed to upload file");
    }
  };

  return (
    <div className="main-container">
      <CustomModal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Why Register?"
        actionButtonText="Register"
        onActionClick={handleRegisterClick}
      >
        <Typography variant="body1">
          Gated access ensures serious buyers, allows personalized
          recommendations, and tracks transaction history. Free to register, no
          subscription fees.
        </Typography>
      </CustomModal>

      <Banner
        className="banner-left-align"
        imageSrc="/images/home-banner.png"
        altText="A beautiful banner image"
        headingLevel={1}
        title={
          <>
            <div>
              <span className="white">Professional </span>
              <span className="red">Wholesale</span>
            </div>
            <div>
              <span className="red">Automotive </span>
              <span className="white">Platform</span>
            </div>
          </>
        }
        subtitle="Streamline your wholesale operations with our comprehensive platform designed for dealers and automotive professionals. AI-powered search, secure transactions, and verified dealer network."
        button={
          <LocalizedButton
            label="Start Searching"
            size="sm"
            variant="outlined"
            className="banner-cta"
            onClick={() => router.push("/cars")}
          />
        }
      />

      {/* <div className="hero-wrapper">
        <div className="hero-background" />
        <div className="hero-overlay">
          <Hero />
        </div>
      </div> */}

      <Price />

      {/* {dealer && (
        <div
          className="upload-section"
          style={{ margin: "20px 0", textAlign: "center", padding: "2rem" }}
        >
          <Typography variant="h6">Upload Car Inventory</Typography>
          <Input
            type="file"
            onChange={handleFileChange}
            inputProps={{ accept: ".xlsx,.csv" }}
            style={{ margin: "10px 0" }}
          />
          <Button
            variant="contained"
            onClick={handleFileUpload}
            disabled={!selectedFile}
            style={{ marginLeft: "10px" }}
          >
            Upload Excel
          </Button>
          {uploadStatus && (
            <Typography
              variant="body2"
              color={uploadStatus.includes("success") ? "green" : "error"}
            >
              {uploadStatus}
            </Typography>
          )}
        </div>
      )} */}

      <div className="featured-heading-wrapper">
        <h2 className="featured-heading">Why Choose DirectWholesaleCars?</h2>
        <div className="featured-subheading">
          We&apos;ve built the most advanced platform for wholesale vehicle
          trading, combining cutting-edge technology with industry expertise.
        </div>
      </div>
      <Ai features={features} />
      <Network
        heading="Join Our Dealer Network"
        subheading={
          "Get verified and start accessing our premium wholesale inventory.\nJoin thousands of trusted dealers who rely on our platform daily."
        }
        steps={networkSteps}
      />

      <div className="contact-container">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
}