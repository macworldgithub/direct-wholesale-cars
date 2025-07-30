"use client";

import Banner from "@/components/UIComponents/Banner/Banner";
import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../../UIComponents/Card/Card";
import "../../../app/cars/cars.scss";

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

const CarsPage = () => {
  const [search, setSearch] = useState("");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="main-container">
      <main className="page-content">
        <Banner
          imageSrc="/images/home-banner.jpg"
          altText="A beautiful banner image"
          headingLevel={1}
          title={
            <>
              <span className="red">AI-Powered </span>
              <span className="white">Vehicle Search</span>
              <SearchBar
                value={search}
                onChange={setSearch}
                className={isSticky ? "sticky" : ""}
                iconColor="#fff"
                backgroundColor="rgba(0, 0, 0, 0.2)"
                borderColor="#fff"
              />
            </>
          }
        />



   <div className="results-header">
          <div className="results-count">6 Vehicles Found</div>
          <div className="sort-dropdown">
            <select className="sort-select">
              <option>Sort by Price: Low to high</option>
              <option>Sort by Price: High to low</option>
              
            </select>
          </div>
        </div>




         <div className="cards-rows-wrapper">
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
        <div className="cards-wrapper">
          {carsData.map((car, idx) => (
            <Card
              key={idx + carsData.length}
              name={car.name}
              description={car.description}
              price={car.price}
              tags={car.tags}
              image={car.image}
              location={car.location}
            />
          ))}
        </div>
      </div>
      </main>
      {/* <div className="cards-rows-wrapper">
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
        <div className="cards-wrapper">
          {carsData.map((car, idx) => (
            <Card
              key={idx + carsData.length}
              name={car.name}
              description={car.description}
              price={car.price}
              tags={car.tags}
              image={car.image}
              location={car.location}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default CarsPage;
