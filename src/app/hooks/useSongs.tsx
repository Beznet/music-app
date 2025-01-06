import { useState, useEffect } from "react";

export const useSongs = () => {
  const [songs, setSongs] = useState<
    { title: string; album: string; artist: string; song_length: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

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

  return { songs, loading, setSongs };
};
