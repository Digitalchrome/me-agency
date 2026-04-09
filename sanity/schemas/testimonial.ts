import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
    }),
    defineField({
      name: 'company',
      title: 'Company / Brand',
      type: 'string',
    }),
    defineField({
      name: 'approved',
      title: 'Approved to display',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'author', subtitle: 'company' },
  },
});
