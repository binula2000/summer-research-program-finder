import React from 'react';

interface PageNavigatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PageNavigator: React.FC<PageNavigatorProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    // Always show first page
    pageNumbers.push(1);

    if (currentPage > 3) {
      pageNumbers.push('...');
    }
    
    if (currentPage > 2) {
      pageNumbers.push(currentPage - 1);
    }
    
    if (currentPage !== 1 && currentPage !== totalPages) {
        pageNumbers.push(currentPage);
    }
    
    if (currentPage < totalPages - 1) {
      pageNumbers.push(currentPage + 1);
    }
    
    if (currentPage < totalPages - 2) {
      pageNumbers.push('...');
    }
    
    // Always show last page
    if (totalPages > 1) {
        pageNumbers.push(totalPages);
    }


    const uniquePageNumbers = [...new Set(pageNumbers)];


    return uniquePageNumbers.map((number, index) =>
      number === '...' ? (
        <span key={`ellipsis-${index}`} className="px-4 py-2 text-slate-500">
          ...
        </span>
      ) : (
        <button
          key={number}
          onClick={() => onPageChange(number as number)}
          className={`px-4 py-2 mx-1 text-sm font-medium rounded-md transition-colors duration-150 ${
            currentPage === number
              ? 'bg-indigo-600 text-white'
              : 'text-slate-700 bg-white hover:bg-slate-100'
          }`}
          aria-current={currentPage === number ? 'page' : undefined}
        >
          {number}
        </button>
      )
    );

  };

  return (
    <nav className="mt-6 pb-6 flex items-center justify-between" aria-label="Pagination">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm font-medium text-slate-700 bg-white rounded-md hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
      >
        Previous
      </button>
      <div className="hidden sm:flex">
        {renderPageNumbers()}
      </div>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm font-medium text-slate-700 bg-white rounded-md hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
      >
        Next
      </button>
    </nav>
  );
};

export default PageNavigator;