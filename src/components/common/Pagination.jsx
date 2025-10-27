// src/components/common/Pagination.jsx
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-3 mt-10 md:mt-12">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-3 text-slate-600 bg-white rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50 transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      <div className="flex space-x-2">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 font-semibold rounded-lg transition-all duration-200 ${
              currentPage === page
                ? 'bg-blue-600 text-white shadow-xl'
                : 'bg-white text-slate-700 hover:bg-blue-100'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-3 text-slate-600 bg-white rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50 transition-colors duration-200"
      >
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}