import HomePage from "@/components/AppComponents/HomePage/HomePage";
import React from "react";
// import Hero from "../components/AppComponents/Hero/Hero";

export default function Home() {
  const handleSearch = (searchData: any) => {
    console.log('Search performed:', searchData);
  };

  return (
    <div>
      <HomePage/>
    </div>
  );
}
