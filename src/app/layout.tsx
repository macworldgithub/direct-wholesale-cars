// app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import React from "react";

import Navbar from "@/components/AppComponents/Navbar/Navbar";
import Footer from "@/components/AppComponents/Footer/Footer";
import { Providers } from "./providers";
import { LayoutClientWrapper } from "@/components/AppComponents/LayoutClientWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Direct WholeSale",
  description: "Find your next car with Direct Wholesale Cars. We connect buyers with trusted dealers to provide affordable, reliable vehicles at wholesale rates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} layout-body`}>
        <Providers>
          <div className="layout-wrapper">
            <Navbar />
            <LayoutClientWrapper>
              <main className="layout-content">{children}</main>
            </LayoutClientWrapper>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
