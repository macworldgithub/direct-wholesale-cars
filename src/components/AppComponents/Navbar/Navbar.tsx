"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BurgerMenu from "@/components/UIComponents/BurgerMenu/BurgerMenu";
import "./Navbar.scss";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={140}
              height={40}
              className="navbar-logo-img"
            />
          </Link>
        </div>

        {/* Desktop Links only */}
        <div className="navbar-links">
          <Link href="/">Home</Link>
          <Link href="/cars">Cars</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Desktop Login */}
        <div className="navbar-login">
          <Link href="/login">Login</Link>
          <Link href="/signup" className="signup">
            Signup
          </Link>
        </div>

        {/* Burger icon + dropdown */}
        <div className="navbar-burger">
          <BurgerMenu isOpen={menuOpen} toggle={toggleMenu} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
