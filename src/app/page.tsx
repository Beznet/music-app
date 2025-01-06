"use client";

import React, { useState, useEffect } from "react";
import SongTable from "./ui/SongTable";

export default function Home() {
  const [songs, setSongs] = useState<
    { title: string; album: string; artist: string; song_length: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<string>("title");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("/api/songs");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();

        setSongs(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  const handleSort = () => {
    const sorted = [...songs].sort((a, b) => {
      const valueA = a[sortField as keyof typeof a];
      const valueB = b[sortField as keyof typeof b];

      if (!isNaN(Number(valueA)) && !isNaN(Number(valueB))) {
        return Number(valueA) - Number(valueB);
      }

      return valueA.localeCompare(valueB);
    });

    setSongs(sorted);
  };

  return (
    <div className="items-center justify-items-center flex flex-col">
      {loading ? (
        <div>Loading Your Music...</div>
      ) : (
        <div>
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
              onClick={handleSort}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sort
            </button>
          </div>
          <SongTable songs={songs} />
        </div>
      )}
    </div>
  );
}
