import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'model',
  title: 'Model',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'Available' },
          { title: 'Travelling', value: 'Travel' },
          { title: 'Unavailable', value: 'Unavailable' },
        ],
        layout: 'radio',
      },
      initialValue: 'Available',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gender',
      title: 'Gender',
      type: 'string',
      options: {
        list: [
          { title: 'Female', value: 'Female' },
          { title: 'Male', value: 'Male' },
          { title: 'Non-Binary', value: 'Non-Binary' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Mainboard', value: 'Mainboard' },
          { title: 'Development', value: 'Development' },
          { title: 'Classic', value: 'Classic' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location (City, Country)',
      type: 'string',
      placeholder: 'e.g. Paris, France',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'height',
      title: 'Height (cm)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'bust',
      title: 'Bust (cm)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'waist',
      title: 'Waist (cm)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'hips',
      title: 'Hips (cm)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'shoe',
      title: 'Shoe Size (EU)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'hair',
      title: 'Hair Color',
      type: 'string',
    }),
    defineField({
      name: 'eyes',
      title: 'Eye Color',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'portfolio',
      title: 'Portfolio Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'polaroids',
      title: 'Polaroid Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: { title: 'name', media: 'coverImage', subtitle: 'location' },
  },
});
