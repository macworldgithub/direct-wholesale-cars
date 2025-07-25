import Footer from "@/components/AppComponents/Footer/Footer";
import Navbar from "@/components/AppComponents/Navbar/Navbar";
import "./home.scss"; 
import React from "react";

export default function Home() {
  return (
    <div className="main-container">
      <Navbar />

      <main className="page-content">
        {/* Add your actual content here later */}
      </main>

      <Footer />
    </div>
  );
}
