import {defineField, defineType} from 'sanity'

export const musicians = defineType({
  name: 'musicians',
  title: 'Musikere',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'instrument',
      title: 'Instrument',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'section',
      title: 'Seksjon',
      type: 'string',
      options: {
        list: [
          {title: 'Sax', value: 'sax'},
          {title: 'Trompet', value: 'trompet'},
          {title: 'Trombone', value: 'trombone'},
          {title: 'Komp', value: 'komp'},
          {title: 'Musikalsk leder', value: 'musikalisk_leder'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'info',
      title: 'Info',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Sosiale medier',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'platform', title: 'Plattform', type: 'string'},
            {name: 'url', title: 'URL', type: 'url'},
          ],
        },
      ],
    }),
    defineField({
      name: 'quote',
      title: 'Sitat',
      type: 'text',
    }),
    defineField({
      name: 'photo',
      title: 'Bilde',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'text',
          type: 'string',
          title: 'Bildetekst',
          options: {
            isHighlighted: true,
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'photo',
    },
  },
})
