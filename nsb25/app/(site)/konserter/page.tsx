import React from "react";
import { client } from "@/sanity/client";
import { Concert } from "@/types";
import ConcertList from "../components/ConcertList";
import { UPCOMING_CONCERTS_QUERY, PAST_CONCERTS_QUERY } from "@/app/queries";

export default async function page() {
  const upcoming = await client.fetch<Concert[]>(UPCOMING_CONCERTS_QUERY);

  const past = await client.fetch<Concert[]>(PAST_CONCERTS_QUERY);

  return (
    <article>
      <h1>Konserter</h1>
      <ConcertList upcoming_concerts={upcoming} past_concerts={past} />
    </article>
  );
}
