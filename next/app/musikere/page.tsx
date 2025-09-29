import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MUSICIANS_QUERY = defineQuery(`*[_type == "musicians"]{
  name,
  info,
  socialLinks,
  instrument,
  quote,
  slug,
  photo{asset->{_id,url}}
}`);

interface Musician {
  name: string;
  info: string[];
  socialLinks: { platform: string; url: string }[];
  instrument: string;
  quote: string;
  photo: { asset: { _id: string; url: string } };
  slug: string;
}

export default async function page() {
  const musicians = await client.fetch<Musician[]>(MUSICIANS_QUERY, {});

  return (
    <>
      <h1>Musikere</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {musicians.map((musician) => (
          <li key={musician.slug} className="mb-8">
            <h2 className="text-2xl font-bold">{musician.name}</h2>
            <p className="italic">{musician.instrument}</p>
            {musician.photo && (
              <Image
                src={musician.photo.asset.url}
                alt={musician.name}
                width={200}
                height={400}
                className="object-cover mt-4"
              />
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
