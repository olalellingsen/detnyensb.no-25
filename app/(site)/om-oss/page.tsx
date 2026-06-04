import React from "react";
import { client } from "@/sanity/client";
import { ABOUT_QUERY } from "@/app/queries";
import SanityImage from "../components/SanityImage";
import PortableTextComponent from "../components/PortableTextSection";
import { AboutPage } from "@/types";

export default async function page() {
  const about = await client.fetch<AboutPage>(ABOUT_QUERY);

  if (!about) {
    return <div>Loading...</div>;
  }

  // Create a RichTextBlock structure for the PortableTextComponent
  const richTextBlock = {
    _type: "richText" as const,
    content: about.content || [],
  };

  return (
    <>
      <h1>{about.title}</h1>

      {about.image && (
        <SanityImage
          image={about.image}
          alt="About Image"
          width={800}
          height={600}
          className="w-full aspect-video object-cover"
        />
      )}

      <PortableTextComponent content={richTextBlock} />
    </>
  );
}
