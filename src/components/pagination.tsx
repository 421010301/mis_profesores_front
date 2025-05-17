import React, { useMemo } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  delta?: number;
}

export default function Pagination({
  currentPage,
  onPageChange,
  totalPages,
  delta = 1,
}: PaginationProps) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const visiblePages = useMemo(() => {
    const pages: (number | -1)[] = [];

    if (totalPages <= 5 + delta * 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);
    if (left > 2) pages.push(-1);

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages - 1) pages.push(-1);
    pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages, delta]);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination gap-1">
        {/* Botón Anterior */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link shadow-sm rounded border-0 bg-white"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous"
          >
            &laquo;
          </button>
        </li>

        {/* Números de Página */}
        {visiblePages.map((page, index) =>
          page === -1 ? (
            <li key={`ellipsis-${index}`} className="page-item disabled">
              <span className="page-link shadow-sm rounded border-0 bg-white">
                ...
              </span>
            </li>
          ) : (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <button
                className={`page-link shadow-sm rounded border-0 ${
                  currentPage === page
                    ? ""
                    : "bg-white text-primary"
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </li>
          )
        )}

        {/* Botón Siguiente */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link shadow-sm rounded border-0 bg-white"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next"
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
}
