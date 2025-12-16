import { Concert } from "@/types";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/client";
import { formatDate } from "./ConcertList";

export default function ConcertsBlock({
  concertList,
  title,
}: {
  concertList: Concert[];
  title?: string;
}) {
  return (
    <>
      <h2>{title}</h2>
      <ul className="w-full flex flex-row gap-2 md:gap-4 overflow-x-auto no-scrollbar overflow-y-hidden snap-x snap-mandatory no-scrollbar scroll-smooth lg:grid lg:grid-cols-3">
        {concertList.map((concert) => (
          <li
            key={concert._id}
            className="bg-primary text-background min-w-9/10 sm:min-w-4/10 snap-start"
          >
            {concert.image && (
              <Image
                src={urlForImage(concert.image).url()}
                alt={concert.image.alt || "Concert Image"}
                width={400}
                height={300}
                className="w-full aspect-square object-cover"
              />
            )}
            <div className="p-4">
              <h3>{concert.title}</h3>
              <p>
                {formatDate(concert.date || "")} - {concert.time}
              </p>
              <p>{concert.location}</p>
              {concert.ticketsLink && (
                <Link
                  href={concert.ticketsLink}
                  target="_blank"
                  className="button block w-max"
                >
                  Kjøp billetter
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
