"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocalizedTable from "../../UIComponents/LocalizedTable/LocalizedTable";
import Pagination from "../../UIComponents/Pagination/Pagination";
import { AppDispatch, RootState } from "@/store/store";
import { fetchAllCarAds, deleteCarAd, fetchCarsWithFilters } from "@/api/cars"; // <-- import delete
import Link from "next/link";
import LocalizedButton from "@/components/UIComponents/LocalizedButton/LocalizedButton";

const CarListing: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { ads, pagination, loading } = useSelector(
    (state: RootState) => state.carAds
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(
      fetchCarsWithFilters({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      })
    );
  }, [dispatch, currentPage]);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this car ad?")) {
      dispatch(deleteCarAd(id));
    }
  };

  const columns = [
    { key: "stock", header: "Stock" },
    { key: "vin", header: "VIN" },
    { key: "branch", header: "Branch" },
    { key: "bayNumber", header: "Bay" },
    { key: "description", header: "Description" },
    { key: "odometer", header: "Odometer" },
    { key: "buildDate", header: "Build Date" },
    { key: "driveType", header: "Drive Type" },
    { key: "fuelType", header: "Fuel Type" },
    { key: "seats", header: "Seats" },
    { key: "regoDue", header: "Rego Due" },
    { key: "asking", header: "Asking Price" },
    { key: "available", header: "Status" },
    { key: "update", header: "Update" },
    { key: "delete", header: "Delete" },
  ];

  const tableData = ads.map((car) => ({
    stock: (
      <Link href={`/car_Details?id=${car?._id}`} style={{ color: "#1800B2" }}>
        {car.stock}
      </Link>
    ),
    vin: car.vin || "—",
    branch: car.branch || "—",
    bayNumber: car.bayNumber || "—",
    description: car.description || "—",
    odometer: car.odometer ? `${car.odometer.toLocaleString()} miles` : "—",
    buildDate: car.buildDate || "—",
    driveType: car.driveType || "—",
    fuelType: car.fuelType || "—",
    seats: car.seats || "—",
    regoDue: car.regoDue || "—",
    asking: car.asking ? `$${car.asking.toLocaleString()}` : "—",
    available: (
      <span
        style={{
          padding: "4px 8px",
          borderRadius: "12px",
          fontSize: "12px",
          backgroundColor: car.available ? "#d1fae5" : "#fee2e2",
          color: car.available ? "#065f46" : "#991b1b",
        }}
      >
        {car.available ? "Available" : "Unavailable"}
      </span>
    ),
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
        currentPage={pagination.page ?? 1}
        totalPages={pagination.totalPages ?? 1}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default CarListing;
