import { useRef, useState } from "react";

const Pagination = () => {
  const totalPages = 20; // Adjust this as needed
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const paginationRef = useRef<HTMLDivElement>(null);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!paginationRef.current?.contains(event.relatedTarget as Node)) {
      setIsDropdownOpen(false);
    }
  };
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      setIsDropdownOpen(false); // Close dropdown after selecting a page
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
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 4);

    // Add previous ellipsis if needed
    if (startPage > 1) {
      pageNumbers.push("...");
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add next ellipsis if needed
    if (endPage < totalPages) {
      pageNumbers.push("...");
    }

    return pageNumbers;
  };

  const renderDropdownOptions = () => {
    const options = [];
    const startPage = Math.max(1, currentPage - 5);
    const endPage = Math.min(totalPages, currentPage + 10);

    for (let i = startPage; i <= endPage; i++) {
      options.push(
        <button
          key={i}
          className={`block w-full text-left p-2 ${i === currentPage ? "bg-purple-light text-white" : "bg-blue-light text-black"}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>,
      );
    }

    return options;
  };

  return (
    <div
      className="mt-10 flex items-center space-x-3 relative"
      onBlur={handleBlur}
      tabIndex={0}
      ref={paginationRef}
    >
      {/* Previous Button */}
      {currentPage > 1 && (
        <button
          className="bg-blue-light bg-opacity-70 p-1 px-4 rounded-lg"
          onClick={handlePrevious}
        >
          P
        </button>
      )}

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          className={`p-1 px-4 rounded-lg ${
            page === currentPage
              ? "bg-purple-light"
              : "bg-blue-light bg-opacity-70"
          } ${page === "..." ? "text-gray-500" : ""}`}
          onClick={() => {
            if (page !== "...") {
              handlePageChange(page as number);
            } else {
              setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown on ellipsis click
            }
          }}
        >
          {page}
        </button>
      ))}

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg z-10 h-60 overflow-auto">
          {renderDropdownOptions()}
        </div>
      )}

      {/* Next Button */}
      {currentPage < totalPages && (
        <button
          className="bg-blue-light bg-opacity-70 p-1 px-4 rounded-lg"
          onClick={handleNext}
        >
          N
        </button>
      )}
    </div>
  );
};

export default Pagination;
