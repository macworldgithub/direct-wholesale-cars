"use client";

import React from "react";
import Image from "next/image";
import LocalizedButton from "@/components/UIComponents/LocalizedButton/LocalizedButton";
import "./About.scss";
import { LuUserRoundSearch } from "react-icons/lu";

const About: React.FC = () => {
  return (
    <div className="about-page">
      {/* Unique Hero */}
      <section className="about-hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <h1>
            Built for <span>Wholesale Dealers</span>
          </h1>
          <p>
            DirectWholesaleCars connects verified dealers to the most efficient
            way of sourcing and trading inventory with AI insights and secure
            workflows.
          </p>
          <div className="hero-actions">
            <LocalizedButton
              label="Get Started"
              size="md"
              onClick={() => (window.location.href = "/signup")}
            />
            <LocalizedButton
              label="Explore Cars"
              size="md"
              variant="outlined"
              onClick={() => (window.location.href = "/cars")}
            />
          </div>
        </div>
        <div className="hero-card">
          <div className="card-item">
            <Image src="/images/verified-person.png" alt="Verified" width={28} height={28} />
            <div>
              <div className="metric">Verified Network</div>
              <div className="sub">Trusted, vetted dealers</div>
            </div>
          </div>
          <div className="card-item">
            <Image src="/images/power.png" alt="AI" width={28} height={28} />
            <div>
              <div className="metric">AI-Powered</div>
              <div className="sub">Smart search & filters</div>
            </div>
          </div>
          <div className="card-item">
            <Image src="/images/secure.png" alt="Secure" width={28} height={28} />
            <div>
              <div className="metric">Secure</div>
              <div className="sub">Escrow-like protection</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="about-stats">
        <div className="stat">
          <div className="value">10k+</div>
          <div className="label">Vehicles Listed</div>
        </div>
        <div className="stat">
          <div className="value">1.5k+</div>
          <div className="label">Verified Dealers</div>
        </div>
        <div className="stat">
          <div className="value">99.9%</div>
          <div className="label">Uptime</div>
        </div>
        <div className="stat">
          <div className="value">24/7</div>
          <div className="label">Support</div>
        </div>
      </section>

      {/* How it works - Steps grid */}
      <section className="about-steps">
        <div className="section-head">
          <h2>How It Works</h2>
          <p>Start fast with four straightforward steps.</p>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <Image src="/images/Application.png" alt="Apply" width={36} height={36} />
            <h3>Apply</h3>
            <p>Register your dealership and submit basic business documents.</p>
          </div>
          <div className="step-card">
            <Image src="/images/Verification.png" alt="Verify" width={36} height={36} />
            <h3>Verify</h3>
            <p>We verify licencing and credentials to keep the network trusted.</p>
          </div>
          <div className="step-card">
            {/* <Image src="/images/search.png" alt="Search" width={36} height={36} /> */}
            <LuUserRoundSearch size={36} color="#01050aff" />

            <h3>Search</h3>
            <p>Use AI search and filters to find matching wholesale vehicles.</p>
          </div>
          <div className="step-card">
            <Image src="/images/secure.png" alt="Transact" width={36} height={36} />
            <h3>Transact</h3>
            <p>Negotiate securely and complete purchases with confidence.</p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="about-faq">
        <div className="section-head">
          <h2>FAQs</h2>
          <p>Essential details for wholesale buyers and sellers.</p>
        </div>
        <div className="faq-list">
          <details>
            <summary>Who can join the platform?</summary>
            <p>Only licensed dealers/wholesalers with valid business documentation.</p>
          </details>
          <details>
            <summary>How do you verify dealers?</summary>
            <p>We check business registration, dealer licence and identity before activation.</p>
          </details>
          <details>
            <summary>Are there subscription or listing fees?</summary>
            <p>No subscription is required to register or browse; standard marketplace fees may apply to transactions.</p>
          </details>
          <details>
            <summary>Do you support inspections and reports?</summary>
            <p>Yes, sellers can attach inspection details and buyers can request additional checks where available.</p>
          </details>
          <details>
            <summary>How is payment handled?</summary>
            <p>Transactions are facilitated with bank-level security; escrow-like arrangements can be used for higher assurance.</p>
          </details>
          <details>
            <summary>Which regions do you serve?</summary>
            <p>We currently serve Australia-based dealers; contact us for other regions.</p>
          </details>
        </div>
      </section>
    </div>
  );
};

export default About;


