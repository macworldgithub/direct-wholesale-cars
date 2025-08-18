"use client";

import Banner from "@/components/UIComponents/Banner/Banner";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "../SearchBar/SearchBar";
import "../../../app/cars/cars.scss";
import Hero from "../Hero/Hero";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchAllCarAds } from "@/api/cars";
import Dropdown from "@/components/UIComponents/Dropdown/Dropdown";

const sortOptions = [
  { label: "Sort by Price: Low to high", value: "price_low_to_high" },
  { label: "Sort by Price: High to low", value: "price_high_to_low" },
  { label: "Sort by Date: Newest first", value: "date_new" },
  { label: "Sort by Date: Oldest first", value: "date_old" },
];

const CarsPage = () => {
  const { ads, pagination, loading } = useSelector(
    (state: RootState) => state.carAds
  );
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

  // Sort the ads based on selected option
  const sortedAds = [...ads].sort((a, b) => {
    switch (sortValue) {
      case "price_low_to_high":
        return a.asking - b.asking;
      case "price_high_to_low":
        return b.asking - a.asking;
      case "date_new":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "date_old":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      default:
        return 0;
    }
  });

  // Filter ads based on search
  const filteredAds = sortedAds.filter(
    (car) =>
      car.stock.toLowerCase().includes(search.toLowerCase()) ||
      car.vin.toLowerCase().includes(search.toLowerCase()) ||
      car.branch.toLowerCase().includes(search.toLowerCase()) ||
      car.description.toLowerCase().includes(search.toLowerCase())
  );

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
            {pagination.total} {pagination.total === 1 ? "Vehicle" : "Vehicles"}{" "}
            Found
          </div>
          <div className="sort-dropdown">
            <Dropdown
              options={sortOptions}
              value={sortValue}
              onChange={handleSortChange}
            />
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading vehicles...</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="cars-table">
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>VIN</th>
                  <th>Branch</th>
                  <th>Bay</th>
                  <th>Description</th>
                  <th>Odometer</th>
                  <th>Build Date</th>
                  <th>Drive Type</th>
                  <th>Fuel Type</th>
                  <th>Seats</th>
                  <th>Rego Due</th>
                  <th>Asking Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAds.map((car) => (
                  <tr key={car._id} className="car-row">
                    <td className="stock-cell">{car.stock}</td>
                    <td className="vin-cell">{car.vin}</td>
                    <td className="branch-cell">{car.branch}</td>
                    <td className="bay-cell">{car.bayNumber}</td>
                    <td className="description-cell">{car.description}</td>
                    <td className="odometer-cell">
                      {car.odometer.toLocaleString()} miles
                    </td>
                    <td className="build-date-cell">{car.buildDate}</td>
                    <td className="drive-type-cell">{car.driveType}</td>
                    <td className="fuel-type-cell">{car.fuelType}</td>
                    <td className="seats-cell">{car.seats}</td>
                    <td className="rego-due-cell">{car.regoDue}</td>
                    <td className="price-cell">
                      ${car.asking.toLocaleString()}
                    </td>
                    <td className="status-cell">
                      <span
                        className={`status-badge ${
                          car.available ? "available" : "unavailable"
                        }`}
                      >
                        {car.available ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button
                        className="view-details-btn"
                        onClick={() => handleViewDetails(car._id)}
                      >
                        View Details
                      </button>
                      <button
                        className="message-btn"
                        onClick={() => {
                          window.dispatchEvent(
                            new CustomEvent("openChat", {
                              detail: {
                                receiverId: car.wholesaler,
                                name: car.branch,
                              },
                            })
                          );
                        }}
                      >
                        Message Seller
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredAds.length === 0 && !loading && (
              <div className="no-results">
                <p>No vehicles found matching your search criteria.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default CarsPage;
