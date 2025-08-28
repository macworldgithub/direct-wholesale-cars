// "use client";

// import Banner from "@/components/UIComponents/Banner/Banner";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import "./CarsPage.scss";
// import Hero from "../Hero/Hero";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/store/store";
// import {
//   fetchAllCarAds,
//   deleteCarByWholesalerAndVin,
//   fetchCarsWithFilters,
// } from "@/api/cars";
// import Dropdown from "@/components/UIComponents/Dropdown/Dropdown";
// import { CarAd } from "@/slices/carAdsSlice";
// import Pagination from "../../UIComponents/Pagination/Pagination";

// const sortOptions = [
//   { label: "Sort by Price: Low to high", value: "price_low_to_high" },
//   { label: "Sort by Price: High to low", value: "price_high_to_low" },
//   { label: "Sort by Date: Newest first", value: "date_new" },
//   { label: "Sort by Date: Oldest first", value: "date_old" },
// ];

// const CarsPage = () => {
//   const { ads, pagination, loading } = useSelector(
//     (state: RootState) => state.carAds
//   );
//   const [sortValue, setSortValue] = useState<string>(sortOptions[0].value);
//   const [isSticky, setIsSticky] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     const onScroll = () => {
//       setIsSticky(window.scrollY > 100);
//     };
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     dispatch(
//       fetchCarsWithFilters({ page: currentPage.toString(), limit: "10" })
//     );
//   }, [dispatch, currentPage]);

//   const handleViewDetails = (car: CarAd) => {
//     router.push(`/car_Details?wholesalerId=${car.wholesaler}&vin=${car.vin}`);
//   };

//   const handleSortChange = (value: string) => {
//     setSortValue(value);
//   };

//   const sortedAds = [...ads].sort((a, b) => {
//     switch (sortValue) {
//       case "price_low_to_high":
//         return a.asking - b.asking;
//       case "price_high_to_low":
//         return b.asking - a.asking;
//       case "date_new":
//         return (
//           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//         );
//       case "date_old":
//         return (
//           new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
//         );
//       default:
//         return 0;
//     }
//   });

//   return (
//     <div className="main-container">
//       <main className="page-content">
//         <Banner
//           imageSrc="/images/car-banner.jpg"
//           altText="A beautiful banner image"
//           headingLevel={1}
//           title={
//             <>
//               <span className="red">AI-Powered </span>
//               <span className="white">Vehicle Search</span>
//             </>
//           }
//         >
//           <Hero />
//         </Banner>

//         <div className="results-header">
//           <div className="results-count">
//             {pagination.total} {pagination.total === 1 ? "Vehicle" : "Vehicles"}{" "}
//             Found
//           </div>
//           <div className="sort-dropdown">
//             <Dropdown
//               options={sortOptions}
//               value={sortValue}
//               onChange={handleSortChange}
//             />
//           </div>
//         </div>

//         {loading ? (
//           <div className="loading-container">
//             <div className="spinner"></div>
//             <p>Loading vehicles...</p>
//           </div>
//         ) : (
//           <div className="table-container">
//             <table className="cars-table">
//               <thead>
//                 <tr>
//                   <th>Stock</th>
//                   <th>VIN</th>
//                   <th>Branch</th>
//                   <th>Bay</th>
//                   <th>Description</th>
//                   <th>Odometer</th>
//                   <th>Build Date</th>
//                   <th>Drive Type</th>
//                   <th>Fuel Type</th>
//                   <th>Seats</th>
//                   <th>Asking Price</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sortedAds.map((car) => (
//                   <tr key={car._id} className="car-row">
//                     <td className="stock-cell" data-label="Stock">{car.stock}</td>
//                     <td className="vin-cell" data-label="VIN">{car.vin}</td>
//                     <td className="branch-cell" data-label="Branch">{car.branch}</td>
//                     <td className="bay-cell" data-label="Bay">{car.bayNumber}</td>
//                     <td className="description-cell" data-label="Description">{car.description}</td>
//                     <td className="odometer-cell" data-label="Odometer">
//                       {car.odometer.toLocaleString()} miles
//                     </td>
//                     <td className="build-date-cell" data-label="Build Date">{car.buildDate}</td>
//                     <td className="drive-type-cell" data-label="Drive Type">{car.driveType}</td>
//                     <td className="fuel-type-cell" data-label="Fuel Type">{car.fuelType}</td>
//                     <td className="seats-cell" data-label="Seats">{car.seats}</td>
//                     <td className="price-cell" data-label="Asking Price">${car.asking}</td>
//                     <td className="status-cell" data-label="Status">
//                       <span
//                         className={`status-badge ${
//                           car.available ? "available" : "unavailable"
//                         }`}
//                       >
//                         {car.available ? "Available" : "Unavailable"}
//                       </span>
//                     </td>
//                     <td className="actions-cell" data-label="Actions">
//                       <button
//                         className="view-details-btn"
//                         onClick={() => handleViewDetails(car)}
//                       >
//                         View Details
//                       </button>
//                       <button
//                         className="view-details-btn"
//                         onClick={() => {
//                           window.dispatchEvent(
//                             new CustomEvent("openChat", {
//                               detail: {
//                                 receiverId: car.wholesaler,
//                                 name: car.branch,
//                               },
//                             })
//                           );
//                         }}
//                       >
//                         Message Seller
//                       </button>
//                       <button
//                         className="view-details-btn"
//                         onClick={async () => {
//                           try {
//                             const confirmed = window.confirm(
//                               `Are you sure you want to delete car with VIN ${car.vin}?`
//                             );
//                             if (!confirmed) return;
//                             await dispatch(
//                               deleteCarByWholesalerAndVin({
//                                 wholesalerId: car.wholesaler,
//                                 vin: car.vin,
//                               })
//                             );
//                             dispatch(
//                               fetchCarsWithFilters({
//                                 page: currentPage.toString(),
//                                 limit: "10",
//                               })
//                             );
//                           } catch (e) {
//                             console.error(e);
//                           }
//                         }}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {sortedAds.length === 0 && !loading && (
//               <div className="no-results">
//                 <p>No vehicles found matching your search criteria.</p>
//               </div>
//             )}
//           </div>
//         )}

//         <Pagination
//           currentPage={pagination.page}
//           totalPages={pagination.totalPages}
//           onPageChange={(page) => setCurrentPage(page)}
//         />
//       </main>
//     </div>
//   );
// };

// export default CarsPage;



// "use client";

// import Banner from "@/components/UIComponents/Banner/Banner";
// import React, { useEffect, useState,useRef  } from "react";
// import { useRouter } from "next/navigation";
// import "./CarsPage.scss";
// import Hero from "../Hero/Hero";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/store/store";
// import {
//   fetchAllCarAds,
//   deleteCarByWholesalerAndVin,
//   fetchCarsWithFilters,
// } from "@/api/cars";
// import Dropdown from "@/components/UIComponents/Dropdown/Dropdown";
// import { CarAd } from "@/slices/carAdsSlice";
// import Pagination from "../../UIComponents/Pagination/Pagination";

// const sortOptions = [
//   { label: "Sort by Price: Low to high", value: "price_low_to_high" },
//   { label: "Sort by Price: High to low", value: "price_high_to_low" },
//   { label: "Sort by Date: Newest first", value: "date_new" },
//   { label: "Sort by Date: Oldest first", value: "date_old" },
// ];

// const CarsPage = () => {
//   const { ads, pagination, loading } = useSelector(
//     (state: RootState) => state.carAds
//   );
//   const [sortValue, setSortValue] = useState<string>(sortOptions[0].value);
//   const [isSticky, setIsSticky] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const resultsRef = useRef<HTMLDivElement | null>(null); // create ref
//   useEffect(() => {
//     const onScroll = () => {
//       setIsSticky(window.scrollY > 100);
//     };
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     dispatch(
//       fetchCarsWithFilters({ page: currentPage.toString(), limit: "10" })
//     );
//   }, [dispatch, currentPage]);

//   const handleViewDetails = (car: CarAd) => {
//     router.push(`/car_Details?wholesalerId=${car.wholesaler}&vin=${car.vin}`);
//   };

//   const handleSortChange = (value: string) => {
//     setSortValue(value);
//   };

//   const handleScrollToResults = () => {
//     if (resultsRef.current) {
//       resultsRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const sortedAds = [...ads].sort((a, b) => {
//     switch (sortValue) {
//       case "price_low_to_high":
//         return a.asking - b.asking;
//       case "price_high_to_low":
//         return b.asking - a.asking;
//       case "date_new":
//         return (
//           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//         );
//       case "date_old":
//         return (
//           new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
//         );
//       default:
//         return 0;
//     }
//   });

//   return (
//     <div className="main-container">
//       <main className="page-content">
//         <Banner
//           imageSrc="/images/car-banner.jpg"
//           altText="A beautiful banner image"
//           headingLevel={1}
//           title={
//             <>
//               <span className="red">AI-Powered </span>
//               <span className="white">Vehicle Search</span>
//             </>
//           }
//         >
//           <Hero onSearch={handleScrollToResults} />
//         </Banner>
//         <div ref={resultsRef}>
//         <div className="results-header">
//           <div className="results-count">
//             {pagination.total} {pagination.total === 1 ? "Vehicle" : "Vehicles"}{" "}
//             Found
//           </div>
//           <div className="sort-dropdown">
//             <Dropdown
//               options={sortOptions}
//               value={sortValue}
//               onChange={handleSortChange}
//             />
//           </div>
//         </div>
          
//         {loading ? (
//           <div className="loading-container">
//             <div className="spinner"></div>
//             <p>Loading vehicles...</p>
//           </div>
//         ) : (
//           <div className="table-container">
//             <table className="cars-table">
//               <thead>
//                 <tr>
//                   <th>Stock</th>
//                   <th>VIN</th>
//                   <th>Branch</th>
//                   <th>Bay</th>
//                   <th>Description</th>
//                   <th>Odometer</th>
//                   <th>Build Date</th>
//                   <th>Drive Type</th>
//                   <th>Fuel Type</th>
//                   <th>Seats</th>
//                   <th>Asking Price</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sortedAds.map((car) => (
//                   <tr key={car._id} className="car-row">
//                     <td className="stock-cell" data-label="Stock">{car.stock}</td>
//                     <td className="vin-cell" data-label="VIN">{car.vin}</td>
//                     <td className="branch-cell" data-label="Branch">{car.branch}</td>
//                     <td className="bay-cell" data-label="Bay">{car.bayNumber}</td>
//                     <td className="description-cell" data-label="Description">{car.description}</td>
//                     <td className="odometer-cell" data-label="Odometer">
//                       {car.odometer.toLocaleString()} miles
//                     </td>
//                     <td className="build-date-cell" data-label="Build Date">{car.buildDate}</td>
//                     <td className="drive-type-cell" data-label="Drive Type">{car.driveType}</td>
//                     <td className="fuel-type-cell" data-label="Fuel Type">{car.fuelType}</td>
//                     <td className="seats-cell" data-label="Seats">{car.seats}</td>
//                     <td className="price-cell" data-label="Asking Price">${car.asking}</td>
//                     <td className="status-cell" data-label="Status">
//                       <span
//                         className={`status-badge ${
//                           car.available ? "available" : "unavailable"
//                         }`}
//                       >
//                         {car.available ? "Available" : "Unavailable"}
//                       </span>
//                     </td>
//                     <td className="actions-cell" data-label="Actions">
//                       <button
//                         className="view-details-btn"
//                         onClick={() => handleViewDetails(car)}
//                       >
//                         View Details
//                       </button>
//                       <button
//                         className="view-details-btn"
//                         onClick={() => {
//                           window.dispatchEvent(
//                             new CustomEvent("openChat", {
//                               detail: {
//                                 receiverId: car.wholesaler,
//                                 name: car.branch,
//                               },
//                             })
//                           );
//                         }}
//                       >
//                         Message Seller
//                       </button>
//                       <button
//                         className="view-details-btn"
//                         onClick={async () => {
//                           try {
//                             const confirmed = window.confirm(
//                               `Are you sure you want to delete car with VIN ${car.vin}?`
//                             );
//                             if (!confirmed) return;
//                             await dispatch(
//                               deleteCarByWholesalerAndVin({
//                                 wholesalerId: car.wholesaler,
//                                 vin: car.vin,
//                               })
//                             );
//                             dispatch(
//                               fetchCarsWithFilters({
//                                 page: currentPage.toString(),
//                                 limit: "10",
//                               })
//                             );
//                           } catch (e) {
//                             console.error(e);
//                           }
//                         }}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {sortedAds.length === 0 && !loading && (
//               <div className="no-results">
//                 <p>No vehicles found matching your search criteria.</p>
//               </div>
//             )}
//           </div>
//         )}

//         <Pagination
//           currentPage={pagination.page}
//           totalPages={pagination.totalPages}
//           onPageChange={(page) => setCurrentPage(page)}
//         />
//         </div>
//       </main>
//     </div>
//   );
// };
// export default CarsPage;



"use client";

import Banner from "@/components/UIComponents/Banner/Banner";
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import "./CarsPage.scss";
import Hero from "../Hero/Hero";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  fetchAllCarAds,
  deleteCarByWholesalerAndVin,
  fetchCarsWithFilters,
} from "@/api/cars";
import Dropdown from "@/components/UIComponents/Dropdown/Dropdown";
import { CarAd } from "@/slices/carAdsSlice";
import Pagination from "../../UIComponents/Pagination/Pagination";

const sortOptions = [
  { label: "Sort by Price: Low to high", value: "price_low_to_high" },
  { label: "Sort by Price: High to low", value: "price_high_to_low" },
  { label: "Sort by Date: Newest first", value: "date_new" },
  { label: "Sort by Date: Oldest first", value: "date_old" },
];

const CarsPage = () => {
  const { ads, pagination, loading } = useSelector(
    (state: RootState) => state.carAds
  );
  const [sortValue, setSortValue] = useState<string>(sortOptions[0].value);
  const [isSticky, setIsSticky] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const resultsRef = useRef<HTMLDivElement | null>(null);

  // Ensure client-side rendering for proper CSS application
  useEffect(() => {
    setIsClient(true);
    // Small delay to ensure CSS is fully loaded
    const timer = setTimeout(() => {
      setShowTable(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    dispatch(
      fetchCarsWithFilters({ page: currentPage.toString(), limit: "10" })
    );
  }, [dispatch, currentPage]);

  // Force re-render after layout is complete
  useLayoutEffect(() => {
    if (isClient && !loading && ads.length > 0) {
      const timer = setTimeout(() => {
        setShowTable(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isClient, loading, ads.length]);

  const handleViewDetails = (car: CarAd) => {
    router.push(`/car_Details?wholesalerId=${car.wholesaler}&vin=${car.vin}`);
  };

  const handleSortChange = (value: string) => {
    setSortValue(value);
  };

  const handleScrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sortedAds = [...ads].sort((a, b) => {
    switch (sortValue) {
      case "price_low_to_high":
        return a.asking - b.asking;
      case "price_high_to_low":
        return b.asking - a.asking;
      case "date_new":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "date_old":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      default:
        return 0;
    }
  });

  if (!isClient) {
    return null; // Prevent SSR mismatch
  }

  return (
    <div className="main-container">
      <main className="page-content">
        <Banner
          imageSrc="/images/car-banner.jpg"
          altText="A beautiful banner image"
          headingLevel={1}
          title={
            <>
              <span className="red">AI-Powered </span>
              <span className="white">Vehicle Search</span>
            </>
          }
        >
          <Hero onSearch={handleScrollToResults} />
        </Banner>
        <div ref={resultsRef}>
          <div className="results-header">
            <div className="results-count">
              {pagination.total} {pagination.total === 1 ? "Vehicle" : "Vehicles"}{" "}
              Found
            </div>
            <div className="sort-dropdown">
              <Dropdown
                options={sortOptions}
                value={sortValue}
                onChange={handleSortChange}
              />
            </div>
          </div>
          
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading vehicles...</p>
            </div>
          ) : (
            <div className={`table-container ${showTable ? 'table-ready' : 'table-loading'}`}>
              <table className="cars-table">
                <thead>
                  <tr>
                    <th>Stock</th>
                    <th>VIN</th>
                    <th>Branch</th>
                    <th>Bay</th>
                    <th>Description</th>
                    <th>Odometer</th>
                    <th>Build Date</th>
                    <th>Drive Type</th>
                    <th>Fuel Type</th>
                    <th>Seats</th>
                    <th>Asking Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedAds.map((car) => (
                    <tr key={car._id} className="car-row">
                      <td className="stock-cell" data-label="Stock">{car.stock}</td>
                      <td className="vin-cell" data-label="VIN">{car.vin}</td>
                      <td className="branch-cell" data-label="Branch">{car.branch}</td>
                      <td className="bay-cell" data-label="Bay">{car.bayNumber}</td>
                      <td className="description-cell" data-label="Description">{car.description}</td>
                      <td className="odometer-cell" data-label="Odometer">
                        {car.odometer.toLocaleString()} miles
                      </td>
                      <td className="build-date-cell" data-label="Build Date">{car.buildDate}</td>
                      <td className="drive-type-cell" data-label="Drive Type">{car.driveType}</td>
                      <td className="fuel-type-cell" data-label="Fuel Type">{car.fuelType}</td>
                      <td className="seats-cell" data-label="Seats">{car.seats}</td>
                      <td className="price-cell" data-label="Asking Price">${car.asking}</td>
                      <td className="status-cell" data-label="Status">
                        <span
                          className={`status-badge ${
                            car.available ? "available" : "unavailable"
                          }`}
                        >
                          {car.available ? "Available" : "Unavailable"}
                        </span>
                      </td>
                      <td className="actions-cell" data-label="Actions">
                        <button
                          className="view-details-btn"
                          onClick={() => handleViewDetails(car)}
                        >
                          View Details
                        </button>
                        <button
                          className="view-details-btn"
                          onClick={() => {
                            window.dispatchEvent(
                              new CustomEvent("openChat", {
                                detail: {
                                  receiverId: car.wholesaler,
                                  name: car.branch,
                                },
                              })
                            );
                          }}
                        >
                          Message Seller
                        </button>
                        <button
                          className="view-details-btn"
                          onClick={async () => {
                            try {
                              const confirmed = window.confirm(
                                `Are you sure you want to delete car with VIN ${car.vin}?`
                              );
                              if (!confirmed) return;
                              await dispatch(
                                deleteCarByWholesalerAndVin({
                                  wholesalerId: car.wholesaler,
                                  vin: car.vin,
                                })
                              );
                              dispatch(
                                fetchCarsWithFilters({
                                  page: currentPage.toString(),
                                  limit: "10",
                                })
                              );
                            } catch (e) {
                              console.error(e);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {sortedAds.length === 0 && !loading && (
                <div className="no-results">
                  <p>No vehicles found matching your search criteria.</p>
                </div>
              )}
            </div>
          )}

          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </main>
    </div>
  );
};

export default CarsPage;


