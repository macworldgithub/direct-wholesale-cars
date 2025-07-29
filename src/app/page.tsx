"use client";

import React from "react";
import Hero from "../components/AppComponents/Hero/Hero";

export default function Home() {
  const handleSearch = (searchData: any) => {
    console.log('Search performed:', searchData);
  };

  return (
    <div className="main-container">
      <main className="page-content">
        <Hero onSearch={handleSearch} />
      </main>
    </div>
  );
}
