// app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import React from "react";

import Navbar from "@/components/AppComponents/Navbar/Navbar";
import Footer from "@/components/AppComponents/Footer/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} layout-body`}>
        <div className="layout-wrapper">
          <Navbar />
          <main className="layout-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
