"use client";

import Banner from "@/components/UIComponents/Banner/Banner";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../../UIComponents/Card/Card";
import "../../../app/cars/cars.scss";
import Hero from "../Hero/Hero";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchAllCarAds } from "@/api/cars";
import Dropdown from "@/components/UIComponents/Dropdown/Dropdown";

const carsData = [
  {
    name: "2023 Toyota Camry LE",
    description: "25,420 miles · Automatic · FWD",
    price: "$22,500",
    tags: ["Certified"],
    image: "/images/cars.png",
    location: "Atlanta, GA · Premium Auto Dealer",
  },
  {
    name: "2023 Toyota Camry LE",
    description: "25,420 miles · Automatic · FWD",
    price: "$35,900",
    tags: ["Featured"],
    image: "/images/cars.png",
    location: "Atlanta, GA · Premium Auto Dealer",
  },
  {
    name: "2023 Toyota Camry LE",
    description: "25,420 miles · Automatic · FWD",
    price: "$28,750",
    tags: ["New"],
    image: "/images/cars.png",
    location: "Atlanta, GA · Premium Auto Dealer",
  },
];

const sortOptions = [
  { label: "Sort by Price: Low to high", value: "price_low_to_high" },
  { label: "Sort by Price: High to low", value: "price_high_to_low" },
  { label: "Sort by Date: Newest first", value: "date_new" },
  { label: "Sort by Date: Oldest first", value: "date_old" },
];

const CarsPage = () => {
  const dealer = useSelector((state: RootState) => state.SignuinDealer.dealer);
  const ads = useSelector((state: RootState) => state.carAds.ads);

  const [sortValue, setSortValue] = useState<string>(sortOptions[0].value);

  const [search, setSearch] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const onScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleViewDetails = (carId: string) => {
    router.push(`/car_Details?id=${carId}`);
  };

  useEffect(() => {
    dispatch(fetchAllCarAds());
  }, [dispatch]);

  const handleSortChange = (value: string) => {
    setSortValue(value);
  };

  return (
    <div className="main-container">
      <main className="page-content">
        <Banner
          imageSrc="/images/car-banner.jpg"
          altText="A beautiful banner image"
          headingLevel={1}
          title={
            <>
              <span className="red">AI-Powered </span>
              <span className="white">Vehicle Search</span>
            </>
          }
        >
          <SearchBar
            value={search}
            onChange={setSearch}
            className={isSticky ? "sticky" : ""}
            iconColor="#fff"
            backgroundColor="rgba(0, 0, 0, 0.2)"
            borderColor="#fff"
          />
          <Hero />
        </Banner>

        <div className="results-header">
          <div className="results-count">
            {ads.length} {ads.length === 1 ? "Vehicle" : "Vehicles"} Found
          </div>
          <div className="sort-dropdown">
            <Dropdown
              options={sortOptions}
              value={sortValue}
              onChange={handleSortChange}
            />
          </div>
        </div>

        <div className="cards-rows-wrapper">
          <div className="cards-wrapper">
            {ads.map((car) => (
              <Card
                key={car._id}
                id={car._id}
                name={
                  car.title || `${car.make ?? ""} ${car.model ?? ""}`.trim()
                }
                description={`${car.odometer?.toLocaleString() ?? 0} miles · ${
                  car.transmission || "Unknown"
                } · ${car.driveType || "N/A"}`}
                price={`$${car.price.toLocaleString()}`}
                tags={car.condition ? [car.condition] : []}
                image={car.images?.length ? car.images[0] : ""}
                location={`${car.city ?? ""}, ${car.state ?? ""} · ${
                  car.businessType || "B2C"
                }`}
                fuelType={car.fuelType}
                cyls={car.cyls}
                seats={car.seats}
                onClick={() => handleViewDetails(car._id)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarsPage;
