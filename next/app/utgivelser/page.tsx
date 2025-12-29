import { client, urlForImage } from "@/sanity/client";
import { Release } from "@/types";
import { defineQuery } from "next-sanity";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const ALBUMS_QUERY = defineQuery(`
  *[_type == "albums"]{
    id,
    title,
    releaseDate,
    coverArt,
    spotifyLink,
  } | order(releaseDate desc)
`);

const SINGLES_QUERY = defineQuery(`
  *[_type == "Singles"]{
    id,
    title,
    releaseDate,
    coverArt,
    spotifyLink,
  } | order(releaseDate desc)
`);

export default async function page() {
  const albums = await client.fetch<Release[]>(ALBUMS_QUERY, {});
  const singles = await client.fetch<Release[]>(SINGLES_QUERY, {});

  return (
    <div className="space-y-12">
      <h1>Utgivelser</h1>
      <section>
        <h2>Album</h2>
        <ul className="grid sm:grid-cols-2 gap-4">
          {albums.map((album) => (
            <li key={album.title} className="group">
              <Link
                href={album.spotifyLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="line-clamp-1">{album.title}</h3>
                <Image
                  src={urlForImage(album.coverArt).url()}
                  alt={album.title}
                  width={500}
                  height={500}
                  className="w-full group-hover:scale-101 transition-transform duration-200"
                />
                <p>Utgitt {new Date(album.releaseDate).toLocaleDateString()}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Singler</h2>
        <ul className="grid sm:grid-cols-3 gap-4">
          {singles.map((single) => (
            <li key={single.title} className="group">
              <Link
                href={single.spotifyLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="line-clamp-1">{single.title}</h3>
                <Image
                  src={urlForImage(single.coverArt).url()}
                  alt={single.title}
                  width={500}
                  height={500}
                  className="w-full group-hover:scale-101 transition-transform duration-200"
                />
                <p>
                  Utgitt {new Date(single.releaseDate).toLocaleDateString()}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
