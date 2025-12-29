import { client, urlForImage } from "@/sanity/client";
import { Concert } from "@/types";
import { formatDate } from "@/utils/formatDate";
import { defineQuery } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const CONCERT_QUERY =
  defineQuery(`*[_type == "concerts" && slug.current == $slug][0]{
  _id,
  title,
  date,
  time,
  location,
  locationLink,
  slug,
  ticketsLink,
  description,
  image
}`);

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concert = await client.fetch<Concert | null>(CONCERT_QUERY, {
    slug,
  });

  if (!concert) notFound();

  return (
    <article className="space-y-8">
      <div>
        <Link
          href="/konserter"
          className="hover:underline text-primary dark:text-foreground"
        >
          Tilbake til oversikten
        </Link>
      </div>

      <section className="grid gap-4 *:text-center">
        <h1>{concert.title}</h1>

        {(concert.date || concert.time) && concert.location && (
          <div>
            <h2>
              {concert.date ? formatDate(concert.date) : ""}
              {concert.date && concert.time ? " – " : ""}
              {concert.time || ""}
            </h2>

            <h3>
              {concert.locationLink ? (
                <Link
                  href={concert.locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  {concert.location}
                </Link>
              ) : (
                concert.location
              )}
            </h3>
          </div>
        )}

        {concert.ticketsLink && (
          <Link
            href={concert.ticketsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="button mx-auto text-xl"
          >
            Kjøp billett!
          </Link>
        )}
      </section>

      <section className="-mx-2 sm:-mx-0">
        {concert.image && (
          <Image
            src={urlForImage(concert.image).url()}
            alt={concert.image.alt || concert.title}
            width={1200}
            height={800}
            className="w-full aspect-square sm:aspect-video object-cover"
            priority
          />
        )}
      </section>

      {concert.description && <p>{concert.description}</p>}
    </article>
  );
}
