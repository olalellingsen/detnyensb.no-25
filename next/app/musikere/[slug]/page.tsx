import { client, urlForImage } from "@/sanity/client";
import { Musician } from "@/types";
import { url } from "inspector";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { defineQuery } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MUSICIAN_QUERY =
  defineQuery(`*[_type == "musicians" && slug.current == $slug][0]{
  name,
  info,
  socialLinks,
  instrument,
  quote,
  section,
  slug,
  photo{asset->{_id,url}}
}`);

export default async function page({ params }: { params: { slug: string } }) {
  const musician = await client.fetch<Musician>(MUSICIAN_QUERY, {
    slug: params.slug,
  });
  return (
    <>
      <div className="mb-4">
        <Link
          href="/musikere"
          className="hover:underline text-primary dark:text-foreground"
        >
          Tilbake til oversikten
        </Link>
      </div>
      <h1 className="text-center sm:text-left">{musician.name}</h1>
      <h2 className="text-center sm:text-left">{musician.instrument}</h2>

      <article className="grid md:grid-cols-2 gap-4">
        {musician.photo && (
          <Image
            src={urlForImage(musician.photo).url()}
            alt={musician.name}
            className="w-full md:w-md aspect-3/4 object-cover"
            width={400}
            height={800}
          />
        )}

        <section className="space-y-4 sm:space-y-8">
          {musician.quote && (
            <blockquote className="p-8 sm:p-0 text-2xl font-bold text-primary dark:text-foreground">
              - {musician.quote}
            </blockquote>
          )}

          {musician.info && (
            <ul>
              {musician.info.map((info, index) => (
                <li key={index}>
                  <p>
                    <strong>
                      {info.split(":")[0]}
                      {":"}
                    </strong>
                    {info.split(":")[1]}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {musician.socialLinks && (
            <ul>
              {musician.socialLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-primary dark:text-foreground"
                  >
                    {link.platform}
                    <ExternalLink className="inline-block ml-1 w-4" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </article>
    </>
  );
}
