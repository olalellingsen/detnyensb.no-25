import Image from "next/image";
import { urlForImage } from "@/sanity/client";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { RichTextBlock } from "@/types";
import { PortableTextBlock } from "next-sanity";

// Type for image values in portable text
type ImageValue = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
};

// Type for mark definitions (like links)
type MarkValue = {
  href?: string;
};

const stylings: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ImageValue }) => (
      <figure className="my-6">
        <Image
          src={urlForImage(value).url()}
          alt={value.alt || ""}
          width={800}
          height={600}
          className="aspect-square sm:aspect-video object-cover w-full"
        />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
  },
  block: {
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value?: MarkValue;
    }) => (
      <a
        href={value?.href || "#"}
        className="text-blue-600 hover:text-blue-800 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export default function PortableTextSection({
  content,
  value,
}: {
  content?: RichTextBlock;
  // `value` kept for places that pass raw portable text or plain strings
  value?: PortableTextBlock[] | string;
}) {
  const blocks = content?.content ?? value;

  if (!blocks) return null;

  const isString = typeof blocks === "string";

  return (
    <article className="prose text-foreground max-w-3xl mx-auto mt-8 text-lg">
      {isString ? (
        <p>{blocks}</p>
      ) : (
        <PortableText value={blocks} components={stylings} />
      )}
    </article>
  );
}
