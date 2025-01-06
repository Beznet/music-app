"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useSongs } from "./hooks/useSongs";
import SongTable from "./ui/SongTable";
import SortControls from "./ui/Sort";
import Playlist from "./ui/Playlist";

export default function Home() {
  const { songs, loading, setSongs } = useSongs();
  const [sortField, setSortField] = useState<string>("title");
  const [playlist, setPlaylist] = useState<
    { title: string; album: string; artist: string; song_length: string }[]
  >([]);

  const handleSort = useCallback(
    (order: "asc" | "desc") => {
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
    },
    [songs, sortField, setSongs]
  );

  const handleSongClick = useCallback(
    (song: {
      title: string;
      album: string;
      artist: string;
      song_length: string;
    }) => {
      setPlaylist((prevPlaylist) => {
        const isAlreadySelected = prevPlaylist.some(
          (selectedSong) => selectedSong.title === song.title
        );
        return isAlreadySelected
          ? prevPlaylist.filter((s) => s.title !== song.title)
          : [...prevPlaylist, song];
      });
    },
    [setPlaylist]
  );

  const shufflePlaylist = useCallback(() => {
    setPlaylist((prevPlaylist) => {
      const shuffled = [...prevPlaylist];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  }, [setPlaylist]);

  const filteredSongs = useMemo(() => {
    return songs;
  }, [songs]);

  return (
    <div className="items-center justify-items-center flex flex-col">
      {loading ? (
        <div>Loading Your Tunes...</div>
      ) : (
        <div>
          <SortControls
            sortField={sortField}
            setSortField={setSortField}
            handleSort={handleSort}
          />
          <SongTable
            songs={filteredSongs} // Use memoized filtered songs
            playlist={playlist}
            onSongClick={handleSongClick}
          />
          <Playlist playlist={playlist} shufflePlaylist={shufflePlaylist} />
        </div>
      )}
    </div>
  );
}
