"use client";

import React, { useState } from 'react';
import './Hero.scss';
import Dropdown from '../../UIComponents/Dropdown/Dropdown';
import LocalizedInput from '../../UIComponents/LocalizedInput/LocalizedInput';
import SvgIcons from '../../UIComponents/SvgIcons/SvgIcons';

interface HeroProps {
  onSearch?: (searchData: SearchData) => void;
}

interface SearchData {
  make: string;
  model: string;
  year: string;
  maxPrice: string;
  maxMileage: string;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [searchData, setSearchData] = useState<SearchData>({
    make: '',
    model: '',
    year: '',
    maxPrice: '',
    maxMileage: ''
  });

  const makeOptions = [
    { label: 'Select Make', value: '' },
    { label: 'Toyota', value: 'toyota' },
    { label: 'Honda', value: 'honda' },
    { label: 'Ford', value: 'ford' },
    { label: 'BMW', value: 'bmw' },
    { label: 'Mercedes', value: 'mercedes' },
    { label: 'Audi', value: 'audi' }
  ];

  const modelOptions = [
    { label: 'Select Model', value: '' },
    { label: 'Camry', value: 'camry' },
    { label: 'Civic', value: 'civic' },
    { label: 'F-150', value: 'f-150' },
    { label: 'X5', value: 'x5' },
    { label: 'C-Class', value: 'c-class' },
    { label: 'A4', value: 'a4' }
  ];

  const yearOptions = [
    { label: 'Select Year', value: '' },
    { label: '2024', value: '2024' },
    { label: '2023', value: '2023' },
    { label: '2022', value: '2022' },
    { label: '2021', value: '2021' },
    { label: '2020', value: '2020' },
    { label: '2019', value: '2019' },
    { label: '2018', value: '2018' }
  ];

  const handleInputChange = (field: keyof SearchData, value: string) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchData);
    }
    console.log('Search data:', searchData);
  };

  return (
    <div className="hero">
      <div className="search-container">
        <div className="search-bar">
          <div className="search-field">
            <Dropdown
              options={makeOptions}
              value={searchData.make}
              onChange={(value) => handleInputChange('make', value)}
              className="search-dropdown"
            />
          </div>

          <div className="search-field">
            <Dropdown
              options={modelOptions}
              value={searchData.model}
              onChange={(value) => handleInputChange('model', value)}
              className="search-dropdown"
            />
          </div>

          <div className="search-field">
            <Dropdown
              options={yearOptions}
              value={searchData.year}
              onChange={(value) => handleInputChange('year', value)}
              className="search-dropdown"
            />
          </div>

          <div className="search-field">
            <LocalizedInput
              name="maxPrice"
              value={searchData.maxPrice}
              onChange={(value) => handleInputChange('maxPrice', value)}
              placeholderKey="Max Price"
              className="hero-input"
              size="md"
            />
          </div>

          <div className="search-field">
            <LocalizedInput
              name="maxMileage"
              value={searchData.maxMileage}
              onChange={(value) => handleInputChange('maxMileage', value)}
              placeholderKey="Max Mileage"
              className="hero-input"
              size="md"
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
