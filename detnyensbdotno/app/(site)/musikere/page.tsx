import { client } from "@/sanity/client";
import React from "react";
import { Musician } from "@/types";
import MusicianCard from "../components/MusicianCard";
import { MUSICIANS_QUERY } from "@/app/queries";

export default async function page() {
  const musicians = await client.fetch<Musician[]>(MUSICIANS_QUERY);

  const sections = [
    { key: "sax" as const, title: "Saxofon" },
    { key: "trompet" as const, title: "Trompet" },
    { key: "trombone" as const, title: "Trombone" },
    { key: "komp" as const, title: "Komp" },
    { key: "musikalisk_leder" as const, title: "Musikalsk Leder" },
  ];

  return (
    <>
      <h1>Musikere</h1>
      {sections.map(({ key, title }) => {
        const sectionMusicians = musicians
          .filter((musician) => musician.section === key)
          .sort((a, b) => a.order - b.order);

        if (sectionMusicians.length === 0) return null;

        return (
          <section key={key} className="mb-8 sm:mb-16">
            <h2>{title}</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-4">
              {sectionMusicians.map((musician) => (
                <MusicianCard key={musician.name} musician={musician} />
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
