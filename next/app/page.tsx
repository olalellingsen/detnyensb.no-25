import ConcertsBlock from "@/components/ConcertsBlock";
import Gallery from "@/components/Gallery";
import PortableTextComponent from "@/components/PortableTextSection";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import VideoBlock from "@/components/VideoBlock";
import { client, urlForImage } from "@/sanity/client";
import { HomePage } from "@/types";
import { HOME_QUERY } from "./queries";
import Image from "next/image";

export default async function Home() {
  const home = await client.fetch<HomePage>(HOME_QUERY, { revalidate: 60 });

  if (!home) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-center">Det Nye Norske Storband</h1>

      {home.homeImage && (
        <section className="-mx-2 sm:-mx-0">
          <Image
            src={urlForImage(home.homeImage.image).url()}
            alt={home.homeImage.alt || "Home Image"}
            width={800}
            height={600}
            className="w-full aspect-3/4 sm:aspect-video object-cover"
          />
          {home.homeImage.caption && (
            <figcaption>{home.homeImage.caption}</figcaption>
          )}
        </section>
      )}

      {home.pageBuilder?.map((block, index) => {
        switch (block._type) {
          case "richText":
            return <PortableTextComponent key={index} content={block} />;
          case "gallery":
            return (
              <section key={index} className="my-10 -mx-2 sm:-mx-0">
                <Gallery images={block.images} />
              </section>
            );
          case "spotifyPlayer":
            return (
              <section key={index} className="my-10">
                <SpotifyPlayer url={block.url} size={block.size} />
              </section>
            );
          case "videos":
            return (
              <section key={index} className="my-10">
                <VideoBlock videosList={block.videosList} />
              </section>
            );
          case "concertsBlock":
            return (
              <section key={index} className="my-10">
                <ConcertsBlock
                  concertList={block.concertList}
                  title={block.title}
                />
              </section>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
