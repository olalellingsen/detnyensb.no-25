import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableTextBlock } from "next-sanity";

// Base image type used throughout the schema
export type SanityImage = {
  image: SanityImageSource;
  alt?: string;
  caption?: string;
};

// Rich text block type
export type RichTextBlock = {
  _type: "richText";
  content: PortableTextBlock[];
};

// Gallery block type
export type GalleryBlock = {
  _type: "gallery";
  title?: string;
  images: SanityImage[];
};

// Concerts block type
export type ConcertsBlock = {
  _type: "concertsBlock";
  title?: string;
  concertList: Concert[];
};

// Spotify player block type
export type SpotifyBlock = {
  _type: "spotifyPlayer";
  url: string;
  size: "compact" | "regular" | "large";
};

// Video block type
export type VideoBlock = {
  _type: "videos";
  videos: Array<{
    _type: string;
    url: string;
    caption: string;
  }>;
};

// Union type for all page builder blocks
export type PageBuilderBlock =
  | RichTextBlock
  | GalleryBlock
  | SpotifyBlock
  | VideoBlock
  | ConcertsBlock;

// Main HomePage type
export type HomePage = {
  title?: string;
  homeImage?: SanityImage;
  pageBuilder?: PageBuilderBlock[];
};

// About page type
export type AboutPage = {
  title?: string;
  image?: SanityImage;
  content?: PortableTextBlock[];
};

export type Concert = {
  _id: string;
  title: string;
  date?: string;
  time?: string;
  location?: string;
  locationLink?: string;
  slug: { current: string };
  ticketsLink?: string;
  description?: string;
  image?: SanityImage;
};

export type Musician = {
  name: string;
  info: string[];
  order: number;
  socialLinks: { platform: string; url: string }[];
  instrument: string;
  quote: string;
  section: "sax" | "trompet" | "trombone" | "komp" | "musikalisk_leder";
  photo: SanityImage;
  slug: { current: string };
};

export type Release = {
  id: string;
  title: string;
  releaseDate: string;
  coverArt: SanityImage;
  spotifyLink: string;
};

export type Footer = {
  buttons: {
    title: string;
    url: string;
  }[];
  phoneNumber?: string;
  email?: string;
  links: {
    title: string;
    url: string;
  }[];
  somePlatforms: {
    title: string;
    url: string;
  }[];
};
