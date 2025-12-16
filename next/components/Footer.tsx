import React from "react";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";
import type { Footer } from "@/types";

const FOOTER_QUERY = defineQuery(`*[_type == "footer"][0] {
  links[],
  contactInfo[]
}`);

export default async function Footer() {
  const footerData = await client.fetch<Footer>(FOOTER_QUERY);

  return (
    <footer className="p-8 bg-primary text-background dark:bg-background dark:text-foreground">
      {footerData && (
        <>
          <ul className="flex flex-wrap gap-4 justify-center">
            {footerData.links.map((link) => (
              <li key={link.url}>
                <Link className="hover:underline" href={link.url}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <br />
          <ul className="flex flex-wrap gap-4 justify-center">
            {footerData.contactInfo.map((info) => (
              <li key={info.url}>
                <Link className="hover:underline" href={info.url}>
                  {info.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      <br />

      <p className="text-center text-background/50">
        © {new Date().getFullYear()} Det Nye Norske Storband
      </p>
    </footer>
  );
}
