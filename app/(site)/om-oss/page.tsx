import React from "react";
import { client, urlForImage } from "@/sanity/client";
import { ABOUT_QUERY } from "@/app/queries";
import Image from "next/image";
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
        <Image
          src={urlForImage(about.image).url()}
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
