"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Price from "../components/UIComponents/Price/Price";
import Card from "../components/UIComponents/Card/Card";
import Ai from "../components/UIComponents/Ai/Ai";
import Network from "../components/UIComponents/Network/Network";
import "./cars/cars.scss";
import ContactInfo from "@/components/UIComponents/ContactInfo/ContactInfo";
import ContactForm from "@/components/UIComponents/ContactForm/ContactForm";

import Banner from "@/components/UIComponents/Banner/Banner";
import LocalizedButton from "@/components/UIComponents/LocalizedButton/LocalizedButton";
import Hero from "@/components/AppComponents/Hero/Hero";
import Dropdown from "@/components/UIComponents/Dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import CustomModal from "@/components/UIComponents/LocalizedModal/LocalizedModal";
import { Typography } from "@mui/material";
import { fetchAllCarAds } from "@/api/cars";

const features = [
  {
    icon: (
      <img
        src="/images/power.png"
        alt="AI Search"
        style={{ width: 36, height: 36 }}
      />
    ),
    title: "AI-Powered Search",
    subtitle:
      "Advanced algorithms to find the perfect vehicles matching your criteria instantly.",
  },
  {
    icon: (
      <img
        src="/images/secure.png"
        alt="Secure Transactions"
        style={{ width: 36, height: 36 }}
      />
    ),
    title: "Secure Transactions",
    subtitle:
      "Bank-level security for all transactions with escrow protection.",
  },
  {
    icon: (
      <img
        src="/images/pricing.png"
        alt="Wholesale Pricing"
        style={{ width: 36, height: 36 }}
      />
    ),
    title: "Wholesale Pricing",
    subtitle:
      "Direct access to wholesale prices with transparent fee structure.",
  },
  {
    icon: (
      <img
        src="/images/verified-person.png"
        alt="Verified Dealers"
        style={{ width: 36, height: 36 }}
      />
    ),
    title: "Verified Dealers",
    subtitle:
      "All dealers are thoroughly vetted and verified for your peace of mind.",
  },
];

const networkSteps = [
  {
    image: <img src="/images/application.png" alt="Application" />,
    title: "Application",
    subtitle: "Submit your dealer application with business documentation",
  },
  {
    image: <img src="/images/verification.png" alt="Verification" />,
    title: "Verification",
    subtitle: "Our team verifies your credentials and business license",
  },
  {
    image: <img src="/images/user.png" alt="Go Live" />,
    title: "Go Live",
    subtitle: "Start buying and selling with full platform access",
  },
];

const sortOptions = [
  { label: "Sort by Price: Low to high", value: "price_low_to_high" },
  { label: "Sort by Price: High to low", value: "price_high_to_low" },
  { label: "Sort by Date: Newest first", value: "date_new" },
  { label: "Sort by Date: Oldest first", value: "date_old" },
];

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [sortValue, setSortValue] = useState<string>(sortOptions[0].value);
  const [showModal, setShowModal] = useState(false);

  const dealer = useSelector((state: RootState) => state.SignuinDealer.dealer);
  const ads = useSelector((state: RootState) => state.carAds.ads);
  console.log(ads);

  useEffect(() => {
    dispatch(fetchAllCarAds());
  }, [dispatch]);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hasSeenRegisterModal");

    if (!dealer && !hasSeenModal) {
      setShowModal(true);
      localStorage.setItem("hasSeenRegisterModal", "true");
    }
  }, [dealer]);

  const handleRegisterClick = () => {
    router.push("/signup");
    setShowModal(false);
  };

  const handleSortChange = (value: string) => {
    setSortValue(value);
  };

  const handleViewDetails = (carId: string) => {
    router.push(`/car_Details?id=${carId}`);
  };

  return (
    <div className="main-container">
      <CustomModal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Why Register?"
        actionButtonText="Register"
        onActionClick={handleRegisterClick}
      >
        <Typography variant="body1">
          Gated access ensures serious buyers, allows personalized
          recommendations, and tracks transaction history. Free to register, no
          subscription fees.
        </Typography>
      </CustomModal>

      <Banner
        className="banner-left-align"
        imageSrc="/images/home-banner.png"
        altText="A beautiful banner image"
        headingLevel={1}
        title={
          <>
            <div>
              <span className="white">Professional </span>
              <span className="red">Wholesale</span>
            </div>
            <div>
              <span className="red">Automotive </span>
              <span className="white">Platform</span>
            </div>
          </>
        }
        subtitle="Streamline your wholesale operations with our comprehensive platform designed for dealers and automotive professionals. AI-powered search, secure transactions, and verified dealer network."
        button={
          <LocalizedButton
            label="Start Searching"
            size="sm"
            variant="outlined"
            className="banner-cta"
            onClick={() => console.log("CTA clicked")}
          />
        }
      />
      <div className="hero-wrapper">
        <div className="hero-background" />
        {/* <div className="hero-overlay">
          <Hero />
        </div> */}
      </div>

      <Price />

      <div className="results-header">
        <div className="results-count">
          {ads.length} {ads.length === 1 ? "Vehicle" : "Vehicles"} Found
        </div>
        <div className="sort-dropdown">
          <Dropdown
            options={sortOptions}
            value={sortValue}
            onChange={handleSortChange}
          />
        </div>
      </div>

      <div className="featured-heading-wrapper">
        <h2 className="featured-heading">Featured Inventory</h2>
        <div className="featured-subheading">
          Premium vehicles from verified dealers
        </div>
      </div>
      <div className="cards-wrapper">
        {ads.map((car) => (
          <Card
            key={car._id}
            id={car._id}
            name={car.title || `${car.make ?? ""} ${car.model ?? ""}`.trim()}
            description={`${car.odometer?.toLocaleString() ?? 0} miles · ${
              car.transmission || "Unknown"
            } · ${car.driveType || "N/A"}`}
            price={`$${car.price.toLocaleString()}`}
            tags={car.condition ? [car.condition] : []}
            image={car.images?.length ? car.images[0] : ""}
            location={`${car.city ?? ""}, ${car.state ?? ""} · ${
              car.businessType || "B2C"
            }`}
            fuelType={car.fuelType}
            cyls={car.cyls}
            seats={car.seats}
            onClick={() => handleViewDetails(car._id)}
          />
        ))}
      </div>
      <div className="featured-heading-wrapper">
        <h2 className="featured-heading">Why Choose DirectWholesaleCars?</h2>
        <div className="featured-subheading">
          We&apos;ve built the most advanced platform for wholesale vehicle
          trading, combining cutting-edge technology with industry expertise.
        </div>
      </div>
      <Ai features={features} />
      <Network
        heading="Join Our Dealer Network"
        subheading={
          "Get verified and start accessing our premium wholesale inventory.\nJoin thousands of trusted dealers who rely on our platform daily."
        }
        steps={networkSteps}
      />

      {/* <div className="featured-heading-wrapper">
        <h2 className="featured-heading">Get In Touch</h2>
        <div className="featured-subheading">Have questions? Our support team is here to help you succeed.</div>
      </div> */}

      <div className="contact-container">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
}

// "use client";

// import React, { useEffect, useState, ChangeEvent } from "react";
// import { useRouter } from "next/navigation";
// import Price from "../components/UIComponents/Price/Price";
// import Ai from "../components/UIComponents/Ai/Ai";
// import Network from "../components/UIComponents/Network/Network";
// import "./cars/cars.scss";
// import ContactInfo from "@/components/UIComponents/ContactInfo/ContactInfo";
// import ContactForm from "@/components/UIComponents/ContactForm/ContactForm";
// import Banner from "@/components/UIComponents/Banner/Banner";
// import LocalizedButton from "@/components/UIComponents/LocalizedButton/LocalizedButton";
// import Hero from "@/components/AppComponents/Hero/Hero";
// import Dropdown from "@/components/UIComponents/Dropdown/Dropdown";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/store/store";
// import CustomModal from "@/components/UIComponents/LocalizedModal/LocalizedModal";
// import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Input } from "@mui/material";
// import { fetchAllCarAds } from "@/api/cars";
// import axios from "axios";
// import { BACKEND_URL } from "@/config/server";

// const features = [
//   {
//     icon: (
//       <img
//         src="/images/power.png"
//         alt="AI Search"
//         style={{ width: 36, height: 36 }}
//       />
//     ),
//     title: "AI-Powered Search",
//     subtitle:
//       "Advanced algorithms to find the perfect vehicles matching your criteria instantly.",
//   },
//   {
//     icon: (
//       <img
//         src="/images/secure.png"
//         alt="Secure Transactions"
//         style={{ width: 36, height: 36 }}
//       />
//     ),
//     title: "Secure Transactions",
//     subtitle:
//       "Bank-level security for all transactions with escrow protection.",
//   },
//   {
//     icon: (
//       <img
//         src="/images/pricing.png"
//         alt="Wholesale Pricing"
//         style={{ width: 36, height: 36 }}
//       />
//     ),
//     title: "Wholesale Pricing",
//     subtitle:
//       "Direct access to wholesale prices with transparent fee structure.",
//   },
//   {
//     icon: (
//       <img
//         src="/images/verified-person.png"
//         alt="Verified Dealers"
//         style={{ width: 36, height: 36 }}
//       />
//     ),
//     title: "Verified Dealers",
//     subtitle:
//       "All dealers are thoroughly vetted and verified for your peace of mind.",
//   },
// ];

// const networkSteps = [
//   {
//     image: <img src="/images/application.png" alt="Application" />,
//     title: "Application",
//     subtitle: "Submit your dealer application with business documentation",
//   },
//   {
//     image: <img src="/images/verification.png" alt="Verification" />,
//     title: "Verification",
//     subtitle: "Our team verifies your credentials and business license",
//   },
//   {
//     image: <img src="/images/user.png" alt="Go Live" />,
//     title: "Go Live",
//     subtitle: "Start buying and selling with full platform access",
//   },
// ];

// const sortOptions = [
//   { label: "Sort by Price: Low to high", value: "price_low_to_high" },
//   { label: "Sort by Price: High to low", value: "price_high_to_low" },
//   { label: "Sort by Date: Newest first", value: "date_new" },
//   { label: "Sort by Date: Oldest first", value: "date_old" },
// ];

// export default function Home() {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const [sortValue, setSortValue] = useState<string>(sortOptions[0].value);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [uploadStatus, setUploadStatus] = useState<string>("");
//   const dealer = useSelector((state: RootState) => state.SignuinDealer.dealer);
//   const ads = useSelector((state: RootState) => state.carAds.ads);

//   useEffect(() => {
//     dispatch(fetchAllCarAds());
//   }, [dispatch]);

//   useEffect(() => {
//     const hasSeenModal = localStorage.getItem("hasSeenRegisterModal");

//     if (!dealer && !hasSeenModal) {
//       setShowModal(true);
//       localStorage.setItem("hasSeenRegisterModal", "true");
//     }
//   }, [dealer]);

//   const handleRegisterClick = () => {
//     router.push("/signup");
//     setShowModal(false);
//   };

//   const handleSortChange = (value: string) => {
//     setSortValue(value);
//   };

//   const handleViewDetails = (carId: string) => {
//     router.push(`/car_Details?id=${carId}`);
//   };

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "text/csv")) {
//       setSelectedFile(file);
//       setUploadStatus("");
//     } else {
//       setSelectedFile(null);
//       setUploadStatus("Please select a valid Excel (.xlsx) or CSV file");
//     }
//   };

//   const handleFileUpload = async () => {
//     if (!selectedFile || !dealer?._id) {
//       setUploadStatus("Please select a file and ensure you are logged in");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       const response = await axios.post(`${BACKEND_URL}/cars/${dealer._id}/upload-excel`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setUploadStatus("File uploaded successfully!");
//       setSelectedFile(null);
//       dispatch(fetchAllCarAds()); // Refresh the car list
//     } catch (error: any) {
//       setUploadStatus(error.response?.data?.message || "Failed to upload file");
//     }
//   };

//   return (
//     <div className="main-container">
//       <CustomModal
//         open={showModal}
//         onClose={() => setShowModal(false)}
//         title="Why Register?"
//         actionButtonText="Register"
//         onActionClick={handleRegisterClick}
//       >
//         <Typography variant="body1">
//           Gated access ensures serious buyers, allows personalized
//           recommendations, and tracks transaction history. Free to register, no
//           subscription fees.
//         </Typography>
//       </CustomModal>

//       <Banner
//         className="banner-left-align"
//         imageSrc="/images/home-banner.png"
//         altText="A beautiful banner image"
//         headingLevel={1}
//         title={
//           <>
//             <div>
//               <span className="white">Professional </span>
//               <span className="red">Wholesale</span>
//             </div>
//             <div>
//               <span className="red">Automotive </span>
//               <span className="white">Platform</span>
//             </div>
//           </>
//         }
//         subtitle="Streamline your wholesale operations with our comprehensive platform designed for dealers and automotive professionals. AI-powered search, secure transactions, and verified dealer network."
//         button={
//           <LocalizedButton
//             label="Start Searching"
//             size="sm"
//             variant="outlined"
//             className="banner-cta"
//             onClick={() => console.log("CTA clicked")}
//           />
//         }
//       />
//       <div className="hero-wrapper">
//         <div className="hero-background" />
//         {/* <div className="hero-overlay"> */}
//           {/* <Hero /> */}
//         {/* </div> */}
//       </div>

//       <Price />

//       {dealer && (
//         <div className="upload-section" style={{ margin: "20px 0" }}>
//           <Typography variant="h6">Upload Car Inventory</Typography>
//           <Input
//             type="file"
//             onChange={handleFileChange}
//             inputProps={{ accept: ".xlsx,.csv" }}
//             style={{ margin: "10px 0" }}
//           />
//           <Button
//             variant="contained"
//             onClick={handleFileUpload}
//             disabled={!selectedFile}
//             style={{ marginLeft: "10px" }}
//           >
//             Upload Excel
//           </Button>
//           {uploadStatus && (
//             <Typography
//               variant="body2"
//               color={uploadStatus.includes("success") ? "green" : "error"}
//             >
//               {uploadStatus}
//             </Typography>
//           )}
//         </div>
//       )}

//       <div className="results-header">
//         <div className="results-count">
//           {ads.length} {ads.length === 1 ? "Vehicle" : "Vehicles"} Found
//         </div>
//         <div className="sort-dropdown">
//           <Dropdown
//             options={sortOptions}
//             value={sortValue}
//             onChange={handleSortChange}
//           />
//         </div>
//       </div>

//       <div className="featured-heading-wrapper">
//         <h2 className="featured-heading">Featured Inventory</h2>
//         <div className="featured-subheading">
//           Premium vehicles from verified dealers
//         </div>
//       </div>

//       <TableContainer component={Paper} style={{ margin: "20px 0" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Image</TableCell>
//               <TableCell>Title</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Price</TableCell>
//               <TableCell>Condition</TableCell>
//               <TableCell>Location</TableCell>
//               <TableCell>Fuel Type</TableCell>
//               <TableCell>Cylinders</TableCell>
//               <TableCell>Seats</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {ads.map((car) => (
//               <TableRow key={car._id}>
//                 <TableCell>
//                   {car.images?.length ? (
//                     <img
//                       src={car.images[0]}
//                       alt={car.title || `${car.make ?? ""} ${car.model ?? ""}`}
//                       style={{ width: 100, height: 60, objectFit: "cover" }}
//                     />
//                   ) : (
//                     "No Image"
//                   )}
//                 </TableCell>
//                 <TableCell>{car.title || `${car.make ?? ""} ${car.model ?? ""}`.trim()}</TableCell>
//                 <TableCell>
//                   {`${car.odometer?.toLocaleString() ?? 0} miles · ${car.transmission || "Unknown"} · ${car.driveType || "N/A"}`}
//                 </TableCell>
//                 <TableCell>${car.price.toLocaleString()}</TableCell>
//                 <TableCell>{car.condition || "N/A"}</TableCell>
//                 <TableCell>{`${car.city ?? ""}, ${car.state ?? ""} · ${car.businessType || "B2C"}`}</TableCell>
//                 <TableCell>{car.fuelType || "N/A"}</TableCell>
//                 <TableCell>{car.cyls || "N/A"}</TableCell>
//                 <TableCell>{car.seats || "N/A"}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="outlined"
//                     onClick={() => handleViewDetails(car._id)}
//                   >
//                     View Details
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <div className="featured-heading-wrapper">
//         <h2 className="featured-heading">Why Choose DirectWholesaleCars?</h2>
//         <div className="featured-subheading">
//           We&apos;ve built the most advanced platform for wholesale vehicle
//           trading, combining cutting-edge technology with industry expertise.
//         </div>
//       </div>
//       <Ai features={features} />
//       <Network
//         heading="Join Our Dealer Network"
//         subheading={
//           "Get verified and start accessing our premium wholesale inventory.\nJoin thousands of trusted dealers who rely on our platform daily."
//         }
//         steps={networkSteps}
//       />

//       <div className="contact-container">
//         <ContactInfo />
//         <ContactForm />
//       </div>
//     </div>
//   );
// }