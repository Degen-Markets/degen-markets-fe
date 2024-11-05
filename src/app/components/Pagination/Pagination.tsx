"use client";
import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const pageRange = 5;

    let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    let endPage = Math.min(totalPages, currentPage + Math.floor(pageRange / 2));

    if (endPage - startPage + 1 < pageRange) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + pageRange - 1);
      } else {
        startPage = Math.max(1, endPage - pageRange + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="mt-10 flex items-center space-x-3">
      {currentPage > 1 && (
        <div
          onClick={handlePrevious}
          className="bg-blue-light bg-opacity-70 p-1 rounded-lg cursor-pointer hover:bg-gunmetal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="size-6 rotate-90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      )}

      {getPageNumbers().map((page, index) => (
        <div
          key={index}
          className={`p-1 px-4 rounded-lg cursor-pointer ${
            page === currentPage
              ? "bg-secondary text-black"
              : "bg-primary-light bg-opacity-70"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </div>
      ))}

      {currentPage < totalPages && (
        <div
          onClick={handleNext}
          className="bg-blue-light bg-opacity-70 p-1 rounded-lg cursor-pointer hover:bg-gunmetal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="size-6 -rotate-90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Pagination;
