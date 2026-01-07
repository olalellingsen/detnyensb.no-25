import { Concert } from "@/types";
import React from "react";
import ConcertCard from "./ConcertCard";

export default function ConcertsBlock({
  concertList,
  title,
}: {
  concertList: Concert[];
  title?: string;
}) {
  if (concertList) {
    return (
      <>
        <h2>{title}</h2>
        <ul className="w-full flex flex-row gap-2 md:gap-4 overflow-x-auto no-scrollbar overflow-y-hidden snap-x snap-mandatory no-scrollbar scroll-smooth lg:grid lg:grid-cols-3">
          {concertList.map((concert) => (
            <li
              key={concert._id}
              className="bg-primary text-background dark:text-foreground min-w-9/10 w-full sm:min-w-4/10 snap-start"
            >
              <ConcertCard concert={concert} />
            </li>
          ))}
        </ul>
      </>
    );
  }
}
