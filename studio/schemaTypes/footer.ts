import {defineField, defineType} from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'buttons',
      title: 'Knapper',
      type: 'array',
      of: [
        {
          name: 'buttonLink',
          title: 'Knappe lenke',
          type: 'object',
          fields: [
            {name: 'title', title: 'Tittel', type: 'string'},
            {name: 'url', title: 'URL', type: 'url'},
          ],
        },
      ],
    }),

    defineField({
      name: 'phoneNumber',
      title: 'Telefonnummer',
      type: 'string',
    }),

    defineField({
      name: 'email',
      title: 'E-post',
      type: 'string',
    }),

    defineField({
      name: 'somePlatforms',
      title: 'SoMe plattformer',
      type: 'array',
      of: [
        {
          name: 'platform',
          title: 'Plattform',
          type: 'object',
          fields: [
            {name: 'title', title: 'Navn', type: 'string'},
            {name: 'url', title: 'Lenke', type: 'url'},
          ],
        },
      ],
    }),

    defineField({
      name: 'links',
      title: 'Lenker til samarbeidspartnere',
      type: 'array',
      of: [
        {
          name: 'link',
          title: 'Lenke',
          type: 'object',
          fields: [
            {name: 'title', title: 'Tittel', type: 'string'},
            {name: 'url', title: 'URL', type: 'url'},
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer',
      }
    },
  },
})
