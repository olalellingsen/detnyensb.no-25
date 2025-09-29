import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Musician } from "./../types";

export default function MusicianCard({ musician }: { musician: Musician }) {
  return (
    <Link href={`/musikere/${musician.slug.current}`}>
      <Image
        src={musician.photo.asset.url}
        alt={musician.name}
        width={400}
        height={200}
        className="w-full h-auto object-cover"
      />
      <p>{musician.name}</p>
      <p>{musician.instrument}</p>
    </Link>
  );
}
