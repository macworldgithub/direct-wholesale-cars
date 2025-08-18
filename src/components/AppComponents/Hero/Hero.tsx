"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Hero.scss";
import Dropdown from "../../UIComponents/Dropdown/Dropdown";
import LocalizedInput from "../../UIComponents/LocalizedInput/LocalizedInput";
import SvgIcons from "../../UIComponents/SvgIcons/SvgIcons";
import { fetchCarsWithFilters, CarsFilterParams } from "../../../api/cars";

interface HeroProps {
  onSearch?: (searchData: SearchData) => void;
}

interface SearchData {
  search: string;
  vin: string;
  stock: string;
  branch: string;
  odometer: string;
  bayNumber: string;
  page: string;
  limit: string;
  wholesalerId: string;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const dispatch = useDispatch();

  const [searchData, setSearchData] = useState<SearchData>({
    search: "",
    vin: "",
    stock: "",
    branch: "",
    odometer: "",
    bayNumber: "",
    page: "1",
    limit: "20",
    wholesalerId: "",
  });

  const branchOptions = [
    { label: "Select Branch", value: "" },
    { label: "W - WS QLD", value: "W - WS QLD" },
    { label: "W - WS NSW", value: "W - WS NSW" },
    { label: "W - WS VIC", value: "W - WS VIC" },
    { label: "W - WS WA", value: "W - WS WA" },
    { label: "W - WS SA", value: "W - WS SA" },
  ];

  const bayOptions = [
    { label: "Select Bay", value: "" },
    { label: "BAY01", value: "BAY01" },
    { label: "BAY02", value: "BAY02" },
    { label: "BAY03", value: "BAY03" },
    { label: "BAY04", value: "BAY04" },
    { label: "BAY05", value: "BAY05" },
    { label: "BAY06", value: "BAY06" },
    { label: "BAY07", value: "BAY07" },
    { label: "BAY08", value: "BAY08" },
    { label: "BAY09", value: "BAY09" },
    { label: "BAY10", value: "BAY10" },
  ];

  const handleInputChange = (field: keyof SearchData, value: string) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      // Filter out empty values
      const filterParams: CarsFilterParams = {};
      Object.entries(searchData).forEach(([key, value]) => {
        if (value && value.trim() !== "") {
          filterParams[key as keyof CarsFilterParams] = value.trim();
        }
      });

      // Dispatch the Redux action
      const result = await dispatch(fetchCarsWithFilters(filterParams) as any);

      if (fetchCarsWithFilters.fulfilled.match(result)) {
        console.log("API Response:", result.payload);

        // Call the onSearch callback with the data
        if (onSearch) {
          onSearch(searchData);
        }
      } else {
        console.error("Failed to fetch cars:", result.error);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="hero">
      <div className="search-container">
        {/* Top Search Bar */}
        <div className="top-search-bar">
          <div className="search-field">
            <SvgIcons name="search" size={20} color="white" />
            <input
              type="text"
              value={searchData.search}
              onChange={(e) => handleInputChange("search", e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search by make, model and keywords"
              className="search-input"
            />
            <button onClick={handleSearch} className="top-search-button">
              <SvgIcons name="search" size={18} color="white" />
            </button>
          </div>
        </div>

        {/* Bottom Filter Options */}
        <div className="filter-container">
          <div className="search-field">
            <LocalizedInput
              name="vin"
              value={searchData.vin}
              onChange={(value) => handleInputChange("vin", value)}
              placeholderKey="VIN"
              className="hero-input"
              size="md"
            />
          </div>

          <div className="search-field">
            <LocalizedInput
              name="stock"
              value={searchData.stock}
              onChange={(value) => handleInputChange("stock", value)}
              placeholderKey="Stock"
              className="hero-input"
              size="md"
            />
          </div>

          <div className="search-field">
            <Dropdown
              options={branchOptions}
              value={searchData.branch}
              onChange={(value) => handleInputChange("branch", value)}
              className="search-dropdown"
            />
          </div>

          <div className="search-field">
            <LocalizedInput
              name="odometer"
              value={searchData.odometer}
              onChange={(value) => handleInputChange("odometer", value)}
              placeholderKey="Odometer"
              className="hero-input"
              size="md"
            />
          </div>

          <div className="search-field">
            <Dropdown
              options={bayOptions}
              value={searchData.bayNumber}
              onChange={(value) => handleInputChange("bayNumber", value)}
              className="search-dropdown"
            />
          </div>

          <div className="search-field">
            <button onClick={handleSearch} className="search-button">
              <SvgIcons name="search" size={25} color="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
