"use client";

import React, { useState, useEffect } from "react";
import SongTable from "./ui/SongTable";

export default function Home() {
  const [songs, setSongs] = useState<
    { title: string; album: string; artist: string; song_length: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<string>("title");
  const [playlist, setPlaylist] = useState<
    { title: string; album: string; artist: string; song_length: string }[]
  >([]);

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

  const handleSort = (order: "asc" | "desc") => {
    const sorted = [...songs].sort((a, b) => {
      const valueA = a[sortField as keyof typeof a];
      const valueB = b[sortField as keyof typeof b];

      if (!isNaN(Number(valueA)) && !isNaN(Number(valueB))) {
        return order === "asc"
          ? Number(valueA) - Number(valueB)
          : Number(valueB) - Number(valueA);
      }
      return order === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });

    setSongs(sorted);
  };

  const handleSongClick = (song: {
    title: string;
    album: string;
    artist: string;
    song_length: string;
  }) => {
    setPlaylist((prevPlaylist) => {
      const isAlreadySelected = prevPlaylist.some(
        (selectedSong) => selectedSong.title === song.title
      );
      if (isAlreadySelected) {
        return prevPlaylist.filter(
          (selectedSong) => selectedSong.title !== song.title
        );
      } else {
        return [...prevPlaylist, song];
      }
    });
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
          <SongTable songs={songs} onSongClick={handleSongClick} />
          <div className="mt-4">
            <h3 className="text-lg font-bold">Your Groovy Playlist:</h3>
            {playlist.length > 0 ? (
              <ul>
                {playlist.map((song, index) => (
                  <li key={index}>
                    {song.title} - {song.artist}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No songs selected yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
