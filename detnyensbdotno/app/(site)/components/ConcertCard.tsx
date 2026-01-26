import React from "react";
import { urlForImage } from "@/sanity/client";
import { Concert } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/utils/formatDate";

export default function ConcertCard({ concert }: { concert: Concert }) {
  return (
    <div className="bg-primary text-background dark:text-foreground flex flex-col gap-2 w-full">
      {concert.image && (
        <Image
          src={urlForImage(concert.image).url()}
          alt={concert.image.alt || "Concert Image"}
          width={300}
          height={200}
          className="aspect-square object-cover w-full"
        />
      )}
      <div className="p-4 space-y-4">
        <div>
          <h3 className="font-medium">{concert.title}</h3>
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
            <Link
              href={concert.ticketsLink}
              target="_blank"
              className="button-secondary"
            >
              Kjøp billett!
            </Link>
          )}
          {concert.slug && (
            <Link
              href={`/konserter/${concert.slug.current}`}
              className="button-tertiary"
            >
              Les mer
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
