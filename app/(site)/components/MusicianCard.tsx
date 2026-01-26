import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Musician } from "@/types";
import { urlForImage } from "@/sanity/client";

export default function MusicianCard({ musician }: { musician: Musician }) {
  return (
    <Link href={`/musikere/${musician.slug.current}`} className="group mb-2">
      <Image
        src={urlForImage(musician.photo).url()}
        alt={musician.name}
        width={400}
        height={200}
        className="w-full h-auto object-cover group-hover:scale-101 transition-transform duration-200"
      />
      <h3 className="group-hover:underline translate-y-1">{musician.name}</h3>
      <p className="text-foreground/60">{musician.instrument}</p>
    </Link>
  );
}
