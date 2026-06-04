import React from "react";
import { Concert } from "@/types";
import Link from "next/link";
import SanityImage from "./SanityImage";
import Button from "./Button";
import { formatDate } from "@/utils/formatDate";

export default function ConcertCard({ concert }: { concert: Concert }) {
  console.log(concert.time);
  return (
    <div className="flex flex-col h-full shadow-xl">
      <Link
        href={concert.slug ? `/konserter/${concert.slug.current}` : "#"}
        className="group overflow-hidden"
      >
        {concert.image && (
          <SanityImage
            image={concert.image}
            width={600}
            height={600}
            className="aspect-square object-cover w-full group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </Link>
      <div className="p-6 bg-primary text-background dark:text-foreground flex flex-col flex-1 gap-4">
        <div className="flex-1 flex flex-col">
          <h3 className="font-medium flex-1">{concert.title}</h3>
          <p>
            {formatDate(concert.date || "")} - {concert.time}
          </p>
          <Link
            href={concert.locationLink || "#"}
            target="_blank"
            className="underline hover:no-underline"
          >
            {concert.location}
          </Link>
        </div>
        <div className="flex justify-between">
          {concert.ticketsLink && (
            <Button
              href={concert.ticketsLink}
              target="_blank"
              variant="secondary"
            >
              Kjøp billett!
            </Button>
          )}
          {concert.slug && (
            <Link
              href={`/konserter/${concert.slug.current}`}
              className="underline hover:no-underline p-2"
            >
              Les mer
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
