import {defineField, defineType} from 'sanity'

export const home = defineType({
  name: 'home',
  title: 'Hjem side',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      type: 'object',
      name: 'homeImage',
      title: 'Hjem Bilde',
      fields: [
        {
          name: 'image',
          title: 'Bilde',
          type: 'image',
          options: {
            hotspot: true,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'alt',
          title: 'Alternativ tekst',
          type: 'string',
          description: 'Viktig for SEO og tilgjengelighet.',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          title: 'Bildetekst',
          type: 'string',
        },
      ],
      preview: {
        select: {
          media: 'image',
          alt: 'alt',
          caption: 'caption',
        },
        prepare({media, alt, caption}) {
          return {
            title: 'Image',
            subtitle: caption || alt,
            media,
          }
        },
      },
    }),

    defineField({
      name: 'pageBuilder',
      title: 'Sidebygger',
      description: 'Legg til innholdsblokker og endre rekkefølge etter behov.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'richText',
          title: 'Riktekst',
          fields: [
            {
              name: 'content',
              title: 'Innhold',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    {title: 'Normal', value: 'normal'},
                    {title: 'Heading 1', value: 'h1'},
                    {title: 'Heading 2', value: 'h2'},
                    {title: 'Heading 3', value: 'h3'},
                    {title: 'Quote', value: 'blockquote'},
                  ],
                },
                {
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: 'caption',
                      type: 'string',
                      title: 'Caption',
                      description: 'Image caption (optional)',
                    },
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alt text',
                      description: 'Alternative text for accessibility',
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              content: 'content',
            },
            prepare({content}) {
              const block = (content || []).find((block: any) => block._type === 'block')
              return {
                title: 'Rich Text',
                subtitle: block?.children?.[0]?.text || 'No content',
              }
            },
          },
        },
        // Spotify Player Block
        {
          type: 'object',
          name: 'spotifyPlayer',
          title: 'Spotify Player',
          fields: [
            {
              name: 'url',
              title: 'Spotify URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'size',
              title: 'Size',
              type: 'string',
              options: {
                list: [
                  {title: 'Compact', value: 'compact'},
                  {title: 'Regular', value: 'regular'},
                  {title: 'Large', value: 'large'},
                ],
              },
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            prepare({}) {
              return {
                title: 'Spotify Player',
              }
            },
          },
        },

        // Videos block
        {
          type: 'object',
          name: 'videos',
          title: 'Videoer',
          fields: [
            {
              name: 'title',
              title: 'Tittel',
              type: 'string',
            },
            {
              name: 'videosList',
              title: 'Legg til videoer',
              type: 'array',
              of: [
                {
                  name: 'video',
                  title: 'Video',
                  type: 'object',
                  fields: [
                    {
                      name: 'caption',
                      title: 'Bildetekst',
                      type: 'string',
                    },
                    {
                      name: 'url',
                      title: 'Video URL',
                      type: 'url',
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              videosList: 'videosList',
            },
            prepare({videosList}) {
              const count = videosList ? videosList.length : 0
              return {
                title: 'Videoer',
                subtitle: `${count} video${count !== 1 ? 'er' : ''} lagt til`,
              }
            },
          },
        },

        // Concerts Block
        {
          type: 'object',
          name: 'concertsBlock',
          title: 'Utvalgte konserter',
          fields: [
            {title: 'Tittel', name: 'title', type: 'string'},
            {
              name: 'concertList',
              title: 'Velg konserter',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{type: 'concerts'}],
                  options: {
                    filter: 'date >= $today',
                    filterParams: {today: new Date().toISOString().split('T')[0]},
                  },
                },
              ],
              validation: (Rule) => Rule.min(1).max(5),
            },
          ],
          preview: {
            select: {
              concertList: 'concertList',
            },
            prepare({concertList}) {
              const count = concertList ? concertList.length : 0
              return {
                title: 'Utvalgte konserter',
                subtitle: `${count} konsert${count !== 1 ? 'er' : ''} valgt`,
              }
            },
          },
        },

        // Gallery Block
        {
          type: 'object',
          name: 'gallery',
          title: 'Bildegalleri',
          fields: [
            {
              name: 'title',
              title: 'Galleri Tittel',
              type: 'string',
            },
            {
              name: 'images',
              title: 'Bilder',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'image',
                      title: 'Image',
                      type: 'image',
                      options: {
                        hotspot: true,
                      },
                    },
                    {
                      name: 'alt',
                      title: 'Alternative text',
                      type: 'string',
                    },
                    {
                      name: 'caption',
                      title: 'Caption',
                      type: 'string',
                    },
                  ],
                },
              ],
              validation: (Rule) => Rule.min(1),
            },
          ],
          preview: {
            select: {
              title: 'title',
              images: 'images',
            },
            prepare({images}) {
              const imageCount = images?.length || 0
              return {
                title: 'Bildegalleri',
                subtitle: `${imageCount} bilde${imageCount !== 1 ? 'r' : ''}`,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Hjem Side',
      }
    },
  },
})
