import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

interface Song {
  title: string;
  album: string;
  artist: string;
  song_length: string;
}

interface SongTableProps {
  songs: Song[];
  playlist: Song[];
  onSongClick: (song: Song) => void;
}

const SongTable: React.FC<SongTableProps> = ({
  songs,
  playlist,
  onSongClick,
}) => {
  const isSelected = (song: Song) =>
    playlist.some((selectedSong) => selectedSong.title === song.title);

  return (
    <Table aria-label="table">
      <TableHeader>
        <TableColumn allowsSorting>Title</TableColumn>
        <TableColumn allowsSorting>Album</TableColumn>
        <TableColumn allowsSorting>Artist</TableColumn>
        <TableColumn allowsSorting>Song Length</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>
        {songs.map((song, index) => (
          <TableRow
            key={index}
            onClick={() => onSongClick(song)}
            className={`cursor-pointer ${
              isSelected(song) ? "bg-blue-100" : ""
            } hover:bg-gray-100`}
          >
            <TableCell>{song.title}</TableCell>
            <TableCell>{song.album}</TableCell>
            <TableCell>{song.artist}</TableCell>
            <TableCell>{song.song_length}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SongTable;
