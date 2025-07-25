import Image from "next/image";
import Link from "next/link";
import "./Navbar.scss";
import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              fill={false}
              width={150}
              height={50}
              priority
              className="navbar-logo-img" 
            />
          </Link>
        </div>

        <div className="navbar-links">
          <Link href="/">HOME</Link>
          <Link href="/buy">BUY</Link>
          <Link href="/sell">SELL</Link>
          <Link href="/valuations">VALUATION</Link>
          <Link href="/insights">INSIGHTS</Link>
        </div>

        <div className="navbar-login">
          <Link href="/login">LOGIN</Link>
        </div>
      </div>
    </nav>
  );
}
