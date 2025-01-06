import React from "react";

interface SortControlsProps {
  sortField: string;
  setSortField: (field: string) => void;
  handleSort: (order: "asc" | "desc") => void;
}

const SortControls: React.FC<SortControlsProps> = ({
  sortField,
  setSortField,
  handleSort,
}) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <label htmlFor="sortField" className="text-lg">
        Sort by:
      </label>
      <select
        id="sortField"
        value={sortField}
        onChange={(e) => setSortField(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="title">Title</option>
        <option value="album">Album</option>
        <option value="artist">Artist</option>
        <option value="song_length">Song Length</option>
      </select>
      <button
        onClick={() => handleSort("asc")}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Sort Ascending
      </button>
      <button
        onClick={() => handleSort("desc")}
        className="p-2 bg-red-500 text-white rounded"
      >
        Sort Descending
      </button>
    </div>
  );
};

export default SortControls;
