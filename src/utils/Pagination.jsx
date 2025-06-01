import React from 'react';

const Pagination = ({ totalBooks, booksPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalBooks / booksPerPage);
  const ELLIPSIS = '...';
  
  const handlePageClick = (page) => {
    if (page !== ELLIPSIS) {
      setCurrentPage(page);
    }
  };
  
  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    const pages = [];
    pages.push(1);
    
    // Calculate page window around current page
    let start = 2;
    let end = totalPages - 1;
    
    if (currentPage <= 4) {
      end = 5;
    } else if (currentPage >= totalPages - 3) {
      start = totalPages - 4;
    } else {
      start = currentPage - 1;
      end = currentPage + 1;
    }
    
    // First ellipsis
    if (currentPage > 4) {
      pages.push(ELLIPSIS);
    }
    
    // Middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // Second ellipsis
    if (currentPage < totalPages - 3) {
      pages.push(ELLIPSIS);
    }
    
    // Last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center space-x-1 my-6">
      <button
        onClick={goToPrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-md font-medium ${
            page === ELLIPSIS 
              ? 'text-gray-500 cursor-default' 
              : currentPage === page 
                ? 'bg-blue-600 text-white' 
                : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={goToNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;