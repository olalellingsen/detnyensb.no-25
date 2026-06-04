import Link from "next/link";
import React from "react";
import { Musician } from "@/types";
import SanityImage from "./SanityImage";

export default function MusicianCard({ musician }: { musician: Musician }) {
  return (
    <Link href={`/musikere/${musician.slug.current}`} className="group mb-2">
      <SanityImage
        image={musician.photo}
        alt={musician.name}
        width={400}
        height={400}
        className="w-full group-hover:scale-101 transition-transform duration-200 shadow-lg"
      />
      <h3 className="group-hover:underline translate-y-1">{musician.name}</h3>
      <p className="text-foreground/60">{musician.instrument}</p>
    </Link>
  );
}
