import { Concert } from "@/types";
import { formatDate } from "@/utils/formatDate";
import ConcertCard from "./ConcertCard";

export default function ConcertList({
  upcoming_concerts,
  past_concerts,
}: {
  upcoming_concerts: Concert[];
  past_concerts: Concert[];
}) {
  return (
    <>
      {upcoming_concerts.length > 0 && (
        <section className="mb-12">
          <h2>Kommende konserter</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcoming_concerts.map((concert, index) => (
              <li key={index}>
                <ConcertCard concert={concert} />
              </li>
            ))}
          </ul>
        </section>
      )}
      {past_concerts.length > 0 && (
        <section>
          <h2>Tidligere konserter</h2>
          <ul className="space-y-2">
            {past_concerts.map((concert, index) => (
              <li
                key={index}
                className="py-1 border-b border-gray-300 grid lg:grid-cols-5"
              >
                <p>{formatDate(concert.date || "")}</p>
                <p className="col-span-3">{concert.title}</p>
                <p>{concert.location}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
