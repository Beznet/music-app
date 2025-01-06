import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch(
      "https://storage.googleapis.com/atticus-frontend-assessment/api/songs.json"
    );
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `failed to fetch songs: ${response.statusText}` });
    }

    const data = await response.json();

    interface Song {
      title: string;
      album: string;
      artist: string;
      song_length: number;
    }

    interface SongsResponse {
      songs: Song[];
    }

    const songs = (data as SongsResponse).songs.map((song: Song) => {
      return {
        title: song.title,
        album: song.album,
        artist: song.artist,
        song_length: parseInt(song.song_length as unknown as string, 10),
      };
    });

    return res.status(200).json(songs);
  } catch (e) {
    console.log(e);
  }
};

export default handler;
