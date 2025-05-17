import React, { useState, useMemo } from "react";
import Pagination from "./pagination";

export interface Header<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  width?: string;
  className?: string;
}

interface TableProps<T> {
  headers: Header<T>[];
  data: T[];
  rowsPerPage?: number;
  onRowClick?: (rowData: T) => void;
  rowKey?: (row: T) => string | number;
  className?: {
    table?: string;
    row?: string;
    cell?: string;
    header?: string;
  };
  controlledPage?: number;
  onPageChange?: (page: number) => void;
}

export default function Table<T>({
  headers,
  data,
  rowsPerPage = 10,
  onRowClick,
  rowKey,
  className,
  controlledPage,
  onPageChange,
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  const [internalPage, setInternalPage] = useState(1);
  const currentPage = controlledPage ?? internalPage;
  const setPage = onPageChange ?? setInternalPage;

  const handleSort = (key: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key]! < b[sortConfig.key]!)
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key]! > b[sortConfig.key]!)
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="table-container">
      <table className={`e-table ${className?.table || ""}`}>
        <colgroup>
          {headers.map((header, index) => (
            <col key={index} style={{ width: header.width }} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                onClick={() => handleSort(header.key)}
                tabIndex={0}
                aria-sort={
                  sortConfig?.key === header.key
                    ? sortConfig.direction === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                style={{ width: header.width }}
                className={`sortable ${className?.header || ""} ${
                  header.className || ""
                } ${
                  sortConfig?.key === header.key
                    ? `sorted-${sortConfig.direction}`
                    : ""
                }`}
              >
                {header.label}
                {sortConfig?.key === header.key && (
                  <i
                    className={`ms-1 bi bi-caret-${
                      sortConfig.direction === "asc" ? "up" : "down"
                    }`}
                  ></i>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="text-center text-muted">
                No hay datos disponibles
              </td>
            </tr>
          ) : (
            paginatedData.map((row, rowIndex) => (
              <tr
                key={rowKey ? rowKey(row) : rowIndex}
                onClick={() => onRowClick?.(row)}
                className={`${onRowClick ? "clickable-row" : ""} ${
                  className?.row || ""
                }`}
              >
                {headers.map((header, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`${className?.cell || ""} ${
                      header.className || ""
                    }`}
                    style={{ width: header.width }}
                    data-titulo={header.label}
                  >
                    {header.render
                      ? header.render(row[header.key], row)
                      : (row[header.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          onPageChange={setPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

interface TablaSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 5 }: TablaSkeletonProps) {
  return (
    <table className="e-table placeholder-glow">
      <thead>
        <tr>
          {Array.from({ length: columns }).map((_, index) => (
            <th key={index}>
              <span className="placeholder rounded col-12"></span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <td key={colIndex}>
                <span className="placeholder rounded col-12"></span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
