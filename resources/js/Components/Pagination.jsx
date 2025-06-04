import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, currentPage + 2);

  if (currentPage <= 3) {
    end = Math.min(5, totalPages);
  }
  if (currentPage >= totalPages - 2) {
    start = Math.max(1, totalPages - 4);
  }

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center mt-10 space-x-2">
      <button
        className="px-3 py-1 rounded bg-[#2B4F00] text-white font-bold disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {start > 1 && (
        <span className="px-2 text-[#2B4F00]">...</span>
      )}
      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`px-3 py-1 rounded font-bold ${
            currentPage === num
              ? 'bg-[#F8E559] text-[#325700]'
              : 'bg-gray-200 text-[#2B4F00] hover:bg-[#F8E559] hover:text-[#325700]'
          }`}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}
      {end < totalPages && (
        <span className="px-2 text-[#2B4F00]">...</span>
      )}
      <button
        className="px-3 py-1 rounded bg-[#2B4F00] text-white font-bold disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
}