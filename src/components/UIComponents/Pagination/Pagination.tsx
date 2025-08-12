import React from "react";
import LocalizedButton from "../LocalizedButton/LocalizedButton";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import "./Pagination.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 2;

    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, idx) => idx + 1);
    }

    pages.push(1);

    if (currentPage > maxVisible) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - maxVisible + 1) {
      pages.push("...");
    }

    pages.push(totalPages);
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination">
      <LocalizedButton
        label={<ArrowBack />}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        size="sm"
        variant="outlined"
        outlineColor="#1800B2"
      />

      {pageNumbers.map((page, idx) =>
        typeof page === "number" ? (
          <LocalizedButton
            key={idx}
            label={page.toString()}
            onClick={() => onPageChange(page)}
            size="sm"
            variant={page === currentPage ? "filled" : "outlined"}
            outlineColor="#1800B2"
          />
        ) : (
          <span key={idx} className="pagination-ellipsis">
            {page}
          </span>
        )
      )}

      <LocalizedButton
        label={<ArrowForward />}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        size="sm"
        variant="outlined"
        outlineColor="#1800B2"
      />
    </div>
  );
};

export default Pagination;
