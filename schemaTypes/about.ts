import {defineField, defineType} from 'sanity'

export const about = defineType({
  name: 'about',
  type: 'document',
  title: 'Om oss siden',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Tittel',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Bilde',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Innhold',
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
    }),
  ],
})
