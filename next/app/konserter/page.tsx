import React from "react";
import { client } from "@/sanity/client";
import { Concert } from "@/types";
import ConcertList from "@/components/ConcertList";
import { UPCOMING_CONCERTS_QUERY, PAST_CONCERTS_QUERY } from "../queries";

export default async function page() {
  const upcoming_concerts = await client.fetch<Concert[]>(
    UPCOMING_CONCERTS_QUERY,
    {},
    { next: { revalidate: 60 } },
  );

  const past_concerts = await client.fetch<Concert[]>(
    PAST_CONCERTS_QUERY,
    {},
    { next: { revalidate: 60 } },
  );

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
