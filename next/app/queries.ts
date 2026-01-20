import { defineQuery } from "next-sanity";

export const HOME_QUERY = defineQuery(`
  *[_type == "home"][0]{
    title,
    homeImage,
    pageBuilder[]{
      _type == "richText" => {
        _type,
        content
      },
      _type == "gallery" => {
        _type,
        images
      },
      _type == "spotifyPlayer" => {
        _type,
        url,
        size
      },
      _type == "concertsBlock" => {
        _type,
        title,
        concertList[]-> {
          _id,
          title,
          date,
          location,
          locationLink,
          slug,
          ticketsLink,
          description,
          image
        }
      },
      _type == "videos" => {
        _type,
        title,
        videosList[] {
          _type,
          url,
          caption
        }
      }
    }
  }
`);

export const ABOUT_QUERY = defineQuery(`*[_type == "about"][0]{
  title,
  content,
  image
}`);

export const MUSICIANS_QUERY = defineQuery(`*[_type == "musicians"]{
  name,
  info,
  socialLinks,
  instrument,
  quote,
  section,
  order,
  slug,
  photo{asset->{_id,url}}
}`);

export const MUSICIAN_QUERY =
  defineQuery(`*[_type == "musicians" && slug.current == $slug][0]{
  name,
  info,
  socialLinks,
  instrument,
  quote,
  section,
  slug,
  photo{asset->{_id,url}}
}`);

export const ALBUMS_QUERY = defineQuery(`
  *[_type == "albums"]{
    id,
    title,
    releaseDate,
    coverArt,
    spotifyLink,
  } | order(releaseDate desc)
`);

export const SINGLES_QUERY = defineQuery(`
  *[_type == "Singles"]{
    id,
    title,
    releaseDate,
    coverArt,
    spotifyLink,
  } | order(releaseDate desc)
`);

export const UPCOMING_CONCERTS_QUERY =
  defineQuery(`*[_type == "concerts" && date >= now()] | order(date asc) {
  title,
  date,
  time,
  location,
  locationLink,
  slug,
  ticketsLink,
  description,
  image
}`);

export const PAST_CONCERTS_QUERY =
  defineQuery(`*[_type == "concerts" && date < now()] | order(date desc) {
  title,
  date,
  location,
  description
}`);

export const CONCERT_QUERY =
  defineQuery(`*[_type == "concerts" && slug.current == $slug][0]{
  _id,
  title,
  date,
  time,
  location,
  locationLink,
  slug,
  ticketsLink,
  description,
  image
}`);
