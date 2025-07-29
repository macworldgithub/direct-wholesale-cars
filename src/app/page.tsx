"use client";

import React from "react";
import Price from "../components/UIComponents/Price/Price";
import Card from "../components/UIComponents/Card/Card";
import Ai from "../components/UIComponents/Ai/Ai";
import Network from "../components/UIComponents/Network/Network";
import "./cars/cars.scss";

const carsData = [
  {
    name: "2023 Toyota Camry LE",
    description: "25,420 miles · Automatic · FWD",
    price: "$22,500",
    tags: ["Certified"],
    image: "/images/cars.png",
    location: "Atlanta, GA · Premium Auto Dealer"
  },
  {
    name: "2023 Toyota Camry LE",
    description: "25,420 miles · Automatic · FWD",
    price: "$35,900",
    tags: ["Featured"],
    image: "/images/cars.png",
    location: "Atlanta, GA · Premium Auto Dealer"
  },
  {
    name: "2023 Toyota Camry LE",
    description: "25,420 miles · Automatic · FWD",
    price: "$28,750",
    tags: ["New"],
    image: "/images/cars.png",
    location: "Atlanta, GA · Premium Auto Dealer"
  }
];

const features = [
  {
    icon: <img src="/images/power.png" alt="AI Search" style={{ width: 36, height: 36 }} />,
    title: "AI-Powered Search",
    subtitle: "Advanced algorithms to find the perfect vehicles matching your criteria instantly."
  },
  {
    icon: <img src="/images/secure.png" alt="Secure Transactions" style={{ width: 36, height: 36 }} />,
    title: "Secure Transactions",
    subtitle: "Bank-level security for all transactions with escrow protection."
  },
  {
    icon: <img src="/images/pricing.png" alt="Wholesale Pricing" style={{ width: 36, height: 36 }} />,
    title: "Wholesale Pricing",
    subtitle: "Direct access to wholesale prices with transparent fee structure."
  },
  {
    icon: <img src="/images/verified person.png" alt="Verified Dealers" style={{ width: 36, height: 36 }} />,
    title: "Verified Dealers",
    subtitle: "All dealers are thoroughly vetted and verified for your peace of mind."
  }
];

const networkSteps = [
  {
    image: <img src="/images/application.png" alt="Application" />,
    title: "Application",
    subtitle: "Submit your dealer application with business documentation"
  },
  {
    image: <img src="/images/verification.png" alt="Verification" />,
    title: "Verification",
    subtitle: "Our team verifies your credentials and business license"
  },
  {
    image: <img src="/images/user.png" alt="Go Live" />,
    title: "Go Live",
    subtitle: "Start buying and selling with full platform access"
  }
];

export default function Home() {
  const handleSearch = (searchData: any) => {
    console.log('Search performed:', searchData);
  };

  return (
    <div className="main-container">
    
      <Price />
      
      <div className="featured-heading-wrapper">
        <h2 className="featured-heading">Featured Inventory</h2>
        <div className="featured-subheading">Premium vehicles from verified dealers</div>
      </div>
      <div className="cards-wrapper">
        {carsData.map((car, idx) => (
          <Card
            key={idx}
            name={car.name}
            description={car.description}
            price={car.price}
            tags={car.tags}
            image={car.image}
            location={car.location}
          />
        ))}
      </div>
       <div className="featured-heading-wrapper">
        <h2 className="featured-heading">Why Choose DirectWholesaleCars?</h2>
        <div className="featured-subheading">We've built the most advanced platform for wholesale vehicle trading,combining cutting-edge technology with industry expertise.</div>
      </div>
      <Ai features={features} />
      <Network
        heading="Join Our Dealer Network"
        subheading={"Get verified and start accessing our premium wholesale inventory.\nJoin thousands of trusted dealers who rely on our platform daily."}
        steps={networkSteps}
      />
    </div>
  );
}
