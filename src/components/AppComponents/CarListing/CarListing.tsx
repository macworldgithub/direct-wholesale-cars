"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocalizedTable from "../../UIComponents/LocalizedTable/LocalizedTable";
import Pagination from "../../UIComponents/Pagination/Pagination";
import { AppDispatch, RootState } from "@/store/store";
import { fetchAllCarAds, deleteCarAd } from "@/api/cars"; // <-- import delete
import Link from "next/link";
import LocalizedButton from "@/components/UIComponents/LocalizedButton/LocalizedButton";

const CarListing: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const ads = useSelector((state: RootState) => state.carAds.ads);
  const loading = useSelector((state: RootState) => state.carAds.loading);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchAllCarAds());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this car ad?")) {
      dispatch(deleteCarAd(id));
    }
  };

  const columns = [
    { key: "title", header: "Title" },
    { key: "make", header: "Make" },
    { key: "model", header: "Model" },
    { key: "odometer", header: "Odometer" },
    { key: "condition", header: "Condition" },
    { key: "transmission", header: "Transmission" },
    { key: "fuelType", header: "Fuel" },
    { key: "price", header: "Price" },
    { key: "city", header: "City" },
    { key: "state", header: "State" },
    { key: "update", header: "Update" },
    { key: "delete", header: "Delete" },
  ];

  const tableData = ads.map((car) => ({
    title: (
      <Link href={`/car_Details?id=${car?._id}`} style={{ color: "#1800B2" }}>
        {car.title || `${car.make ?? ""} ${car.model ?? ""}`}
      </Link>
    ),
    make: car.make || "—",
    model: car.model || "—",
    odometer: car.odometer || "—",
    condition: car.condition || "—",
    transmission: car.transmission || "—",
    fuelType: car.fuelType || "—",
    price: car.price ? `$${car.price.toLocaleString()}` : "—",
    city: car.city || "—",
    state: car.state || "—",
    update: (
      <LocalizedButton
        onClick={() => (window.location.href = `/add_car?id=${car?._id}`)}
        size="sm"
        label="Update"
      />  
    ),
    delete: (
      <LocalizedButton
        onClick={() => handleDelete(car._id)}
        disabled={loading}
        size="sm"
        label="Delete"
      />
    ),
  }));

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = tableData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <LocalizedTable
        columns={columns}
        data={currentData}
        emptyMessage="No cars found"
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default CarListing;
