"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";

import BurgerMenu from "@/components/UIComponents/BurgerMenu/BurgerMenu";
import ProfileDropdownMenu from "../ProfileDropdownMenu/ProfileDropdownMenu";

import "./Navbar.scss";
import { restoreSession } from "@/slices/signinDealerSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated } = useSelector(
    (state: RootState) => state.SignuinDealer
  );

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(restoreSession({ token }));
    }
  }, [dispatch]);

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

        <div className="navbar-links">
          <Link href="/">Home</Link>
          <Link href="/cars">Cars</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="navbar-login">
          {isAuthenticated ? (
            <ProfileDropdownMenu />
          ) : (
            <>
              <Link href="/login" className="auth-link">
                Login
              </Link>
              <Link href="/signup" className="auth-link">
                Signup
              </Link>
            </>
          )}
        </div>

        <div className="navbar-burger">
          <BurgerMenu isOpen={menuOpen} toggle={toggleMenu} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
