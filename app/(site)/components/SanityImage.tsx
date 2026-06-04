"use client";

import NextImage, { ImageProps } from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "@/sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

type Props = Omit<ImageProps, "src" | "alt"> & {
  image: SanityImageSource;
  alt?: string;
};

export default function SanityImage({ image, style, alt, ...props }: Props) {
  const imageProps = useNextSanityImage(client, image);

  if (!imageProps) return null;

  const img = image as { hotspot?: { x: number; y: number }; alt?: string };
  const x = img.hotspot?.x ?? 0.5;
  const y = img.hotspot?.y ?? 0.5;

  return (
    <NextImage
      {...imageProps}
      alt={alt ?? img.alt ?? ""}
      style={{ objectPosition: `${x * 100}% ${y * 100}%`, ...style }}
      {...props}
    />
  );
}
