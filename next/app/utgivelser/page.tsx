import SpotifyPlayer from "@/components/SpotifyPlayer";
import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import React from "react";

const ALBUMS_QUERY = defineQuery(`
  *[_type == "albums"]{
    id,
    title,
    releaseDate,
    coverArt,
    spotifyLink,
  } | order(releaseDate desc)
`);

interface Album {
  id: string;
  title: string;
  releaseDate: string;
  coverArt: any;
  spotifyLink: string;
}

export default async function page() {
  const albums = await client.fetch(ALBUMS_QUERY, {});
  console.log(albums);
  return (
    <>
      <h1>Utgivelser</h1>
      <ul>
        {albums.map((album: Album) => (
          <li key={album.title} className="mb-8">
            <h2 className="text-2xl font-bold">{album.title}</h2>
            <p>
              Released on: {new Date(album.releaseDate).toLocaleDateString()}
            </p>
            <SpotifyPlayer size="large" url={album.spotifyLink} />
          </li>
        ))}
      </ul>
    </>
  );
}
