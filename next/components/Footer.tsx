import React from "react";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";
import type { Footer } from "@/types";

const FOOTER_QUERY = defineQuery(`*[_type == "footer"][0] {
  buttons[],
  links[],
  phoneNumber,
  email,
  somePlatforms[]
}`);

export default async function Footer() {
  const footerData = await client.fetch<Footer>(FOOTER_QUERY);

  return (
    <footer className="p-8 bg-background text-foreground">
      <div className="grid gap-6 *:text-center *:sm:text-left lg:flex lg:justify-between max-w-6xl mx-auto">
        {footerData.buttons && (
          <ul>
            {footerData.buttons.map((button, index) => (
              <li key={index}>
                <Link
                  href={button.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                >
                  {button.title}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <ul className="*:block">
          <p className="font-medium">Kontakt oss:</p>
          {footerData.phoneNumber && (
            <p>
              <Link
                href={`tel:${footerData.phoneNumber}`}
                className="underline hover:no-underline"
              >
                {footerData.phoneNumber}
              </Link>
            </p>
          )}
          {footerData.email && (
            <p>
              <Link
                href={`mailto:${footerData.email}`}
                className="underline hover:no-underline"
              >
                {footerData.email}
              </Link>
            </p>
          )}
        </ul>

        {footerData.somePlatforms && (
          <ul>
            <p className="font-medium">Følg oss:</p>
            {footerData.somePlatforms.map((platform, index) => (
              <li key={index}>
                <Link
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  {platform.title}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {footerData.links && (
          <ul>
            <p className="font-medium">Våre samarbeidspartnere:</p>
            {footerData.links.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="text-center text-foreground/50 mt-10">
        © {new Date().getFullYear()} Det Nye Norske Storband
      </p>
    </footer>
  );
}
