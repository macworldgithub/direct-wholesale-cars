"use client";

import Banner from "@/components/UIComponents/Banner/Banner";
import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Hero from "../Hero/Hero";

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
      </main>
    </div>
  );
};

export default CarsPage;
