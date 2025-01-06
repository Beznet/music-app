import React from "react";

interface PlaylistProps {
  playlist: { title: string; artist: string }[];
  shufflePlaylist: () => void;
}

const Playlist: React.FC<PlaylistProps> = ({ playlist, shufflePlaylist }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold">Your Groovy Playlist:</h3>
      {playlist.length > 0 ? (
        <div>
          <ul>
            {playlist.map((song, index) => (
              <li key={index}>
                {song.title} - {song.artist}
              </li>
            ))}
          </ul>
          <button
            onClick={shufflePlaylist}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Shuffle Me!
          </button>
        </div>
      ) : (
        <p>No songs selected!</p>
      )}
    </div>
  );
};

export default Playlist;
