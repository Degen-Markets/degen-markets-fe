"use client";
import { useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Pagination = () => {
  const totalPages = 20; // Adjust this as needed
  const [currentPage, setCurrentPage] = useState(1);

  const paginationRef = useRef<HTMLDivElement>(null);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!paginationRef.current?.contains(event.relatedTarget as Node)) {
    }
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
    <div
      className="mt-10 flex items-center space-x-3 relative"
      onBlur={handleBlur}
      tabIndex={0}
      ref={paginationRef}
    >
      {currentPage > 1 && (
        <div className="bg-blue-light bg-opacity-70 p-1 rounded-lg cursor-pointer">
          <IoIosArrowDown
            size={32}
            onClick={handlePrevious}
            className="rotate-90"
            aria-label="Previous page"
          />
        </div>
      )}

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          className={`p-1 px-4 rounded-lg ${
            page === currentPage
              ? "bg-purple-light"
              : "bg-blue-light bg-opacity-70"
          }`}
          onClick={() => handlePageChange(page as number)}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages && (
        <div className="bg-blue-light bg-opacity-70 p-1 rounded-lg cursor-pointer">
          <IoIosArrowDown
            size={32}
            onClick={handleNext}
            className="-rotate-90"
            aria-label="Next page"
          />
        </div>
      )}
    </div>
  );
};

export default Pagination;
