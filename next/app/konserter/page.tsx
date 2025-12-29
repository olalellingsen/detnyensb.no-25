import React from "react";
import { client } from "@/sanity/client";
import { Concert } from "@/types";
import ConcertList from "@/components/ConcertList";
import { defineQuery } from "next-sanity";

const UPCOMING_CONCERTS_QUERY =
  defineQuery(`*[_type == "concerts" && date >= now()] | order(date asc) {
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

const PAST_CONCERTS_QUERY =
  defineQuery(`*[_type == "concerts" && date < now()] | order(date desc) {
  title,
  date,
  location,
  description
}`);

export default async function page() {
  const upcoming_concerts = await client.fetch<Concert[]>(
    UPCOMING_CONCERTS_QUERY
  );

  const past_concerts = await client.fetch<Concert[]>(PAST_CONCERTS_QUERY);

  return (
    <article>
      <h1>Konserter</h1>
      <ConcertList
        upcoming_concerts={upcoming_concerts}
        past_concerts={past_concerts}
      />
    </article>
  );
}
