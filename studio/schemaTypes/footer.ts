import {defineField, defineType} from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'contactInfo',
      title: 'Kontaktinformasjon',
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
