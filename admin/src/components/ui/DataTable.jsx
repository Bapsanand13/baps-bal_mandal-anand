import React from 'react';

export default function DataTable({ columns, data, loading, search, onSearch, page, total, limit, onPageChange, error }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        {search !== undefined && (
          <input
            type="text"
            placeholder="Search..."
            className="border px-3 py-2 rounded w-full sm:w-64"
            value={search}
            onChange={e => onSearch(e.target.value)}
            aria-label="Search"
          />
        )}
        {typeof total === 'number' && (
          <div className="text-gray-500">Total: {total}</div>
        )}
      </div>
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <table className="min-w-full text-sm sm:text-base" aria-label="Data table">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} className="px-2 sm:px-4 py-2 text-left font-semibold border-b whitespace-nowrap">{col.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={columns.length} className="text-center py-8">
                <span className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600 align-middle mr-2"></span>
                Loading...
              </td></tr>
            ) : error ? (
              <tr><td colSpan={columns.length} className="text-center py-8 text-red-600">{error}</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={columns.length} className="text-center py-8">No data found</td></tr>
            ) : (
              data.map((row, i) => (
                <tr key={row._id || i} className="hover:bg-gray-50">
                  {columns.map(col => (
                    <td key={col.key} className="px-2 sm:px-4 py-2 border-b whitespace-nowrap">{col.render ? col.render(row) : row[col.key]}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {typeof total === 'number' && limit && (
        <nav className="flex flex-wrap justify-end mt-4 gap-2" aria-label="Pagination">
          {Array.from({ length: Math.ceil(total / limit) }, (_, idx) => (
            <button
              key={idx}
              className={`px-3 py-2 rounded min-w-[40px] min-h-[40px] ${page === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => onPageChange(idx + 1)}
              aria-current={page === idx + 1 ? 'page' : undefined}
              aria-label={`Go to page ${idx + 1}`}
            >
              {idx + 1}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
} 