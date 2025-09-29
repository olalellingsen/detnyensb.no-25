import {defineType, defineField} from 'sanity'

export const concerts = defineType({
  name: 'concerts',
  type: 'document',
  title: 'Konserter',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Tittel',
    }),
    defineField({
      name: 'date',
      type: 'date',
      title: 'Dato',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
    }),
    defineField({
      name: 'time',
      type: 'string',
      title: 'Tid',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Bilde',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt tekst',
          options: {
            isHighlighted: true,
          },
        },
      ],
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Sted',
    }),
    defineField({
      name: 'locationLink',
      type: 'string',
      title: 'Google Maps link til sted',
    }),
    defineField({
      name: 'ticketsLink',
      title: 'Link til billetter',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Beskrivelse',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
    },
    prepare(selection) {
      const {title, date} = selection
      return {
        title: title,
        subtitle: date || 'No date set',
      }
    },
  },
})
