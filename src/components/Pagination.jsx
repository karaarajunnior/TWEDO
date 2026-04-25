import React from 'react';
import { ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-4 py-8 overflow-x-auto">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`text-2xl font-light px-2 relative ${
            currentPage === page ? 'text-[#8c2a5e]' : 'text-[#a14073] hover:text-[#8c2a5e]'
          }`}
        >
          {page}
          {currentPage === page && (
            <span className="absolute bottom-[-4px] left-0 w-full h-[3px] bg-[#4a4a4a]"></span>
          )}
        </button>
      ))}

      <button 
        className="text-[#a14073] hover:text-[#8c2a5e] ml-2 transition-colors disabled:opacity-50"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={28} className="font-light" />
      </button>

      <button 
        className="text-xl text-[#a14073] hover:text-[#8c2a5e] transition-colors font-light ml-2 disabled:opacity-50"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
