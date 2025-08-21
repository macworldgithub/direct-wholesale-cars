// import Image from "next/image";
// import Link from "next/link";
// import "./Footer.scss";

// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import PhoneIcon from "@mui/icons-material/Phone";
// import EmailIcon from "@mui/icons-material/Email";

// import FacebookIcon from "@mui/icons-material/Facebook";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import React from "react";

// export default function Footer() {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         <div className="footer-section">
//           <Image
//             src="/images/logo.png"
//             alt="Logo"
//             width={150}
//             height={50}
//             className="navbar-logo-img"
//           />
//           <p className="footer-description">
//             Your trusted partner for buying, selling, and valuing your property
//             with ease.
//           </p>
//         </div>

//         <div className="footer-section">
//           <h4 className="footer-heading">Menu</h4>
//           <ul className="footer-links">
//             <li>
//               <Link href="/about">About</Link>
//             </li>
//             <li>
//               <Link href="/contact">Contact</Link>
//             </li>
//             <li>
//               <Link href="/privacy-policy">Privacy Policy</Link>
//             </li>
//           </ul>
//         </div>

//         <div className="footer-section">
//           <h4 className="footer-heading">Contact</h4>
//           <ul className="footer-contact">
//             <li>
//               <LocationOnIcon /> 123 Main Street, City
//             </li>
//             <li>
//               <PhoneIcon /> +1 234 567 890
//             </li>
//             <li>
//               <EmailIcon /> info@example.com
//             </li>
//           </ul>
//           <div className="footer-social">
//             <a href="https://facebook.com">
//               <FacebookIcon />
//             </a>
//             <a href="https://instagram.com">
//               <InstagramIcon />
//             </a>
//             <a href="https://youtube.com">
//               <YouTubeIcon />
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className="footer-bottom">
//         © {new Date().getFullYear()} YourCompany. All rights reserved.
//       </div>
//     </footer>
//   );
// }



import Image from "next/image";
import Link from "next/link";
import "./Footer.scss";
import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section - Logo & Description */}
        <div className="footer-section footer-brand">
          <Image
            src="/images/logo1.png"
            alt="Direct Wholesale Cars"
            width={220}
            height={100}
            className="footer-logo"
          />
          <p className="footer-description">
            Your trusted partner in wholesale vehicle trading with AI-powered
            search and secure transactions.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/search">Search Vehicle</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h4 className="footer-heading">Services</h4>
          <ul className="footer-links">
            <li>AI-Powered Search</li>
            <li>Vehicle Inspection</li>
            <li>Secure Transaction</li>
            <li>Wholesale Pricing</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4 className="footer-heading">Contact</h4>
          <ul className="footer-contact">
            <li>
              <a href="mailto:info@omnisuiteai.com">
                info@omnisuiteai.com
              </a>
            </li>
             <li>
              <a href="tel:+61435386534">+61 435 386 534</a>
            </li> 
            <li>Sydney, Australia</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <hr className="footer-divider" />
        © {new Date().getFullYear()} DirectWholesaleCars. All rights reserved.
      </div>
    </footer>
  );
}
