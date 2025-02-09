import { useState, useMemo } from "react";

const DataTable = ({ data, columns, rowsPerPage = 3 }) => {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "firstName", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);

  // **Sorting Logic**
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // **Filtering Logic**
  const filteredData = useMemo(() => {
    return sortedData.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, sortedData]);

  // **Pagination Logic**
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const paginatedData = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            {columns.map((key) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className="cursor-pointer border p-2"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
                {sortConfig.key === key ? (sortConfig.direction === "asc" ? " 🔼" : " 🔽") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index} className="border">
              {columns.map((col) => (
                <td key={col} className="p-2">{row[col]}</td>
              ))}
            </tr>
          ))}
          {paginatedData.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="text-center p-2">No results found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
