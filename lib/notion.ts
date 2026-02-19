import { Client } from '@notionhq/client';

/**
 * Notion Client for ME Modeling Agency
 * Used for syncing bookings and agency data.
 */
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

export const notionService = {
  /**
   * Add a new booking request to Notion
   */
  async addBooking(data: any) {
    if (!DATABASE_ID) {
      console.warn('NOTION_DATABASE_ID is not set');
      return null;
    }

    try {
      const response = await notion.pages.create({
        parent: { database_id: DATABASE_ID },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: data.name || 'New Booking Request',
                },
              },
            ],
          },
          Email: {
            email: data.email,
          },
          Model: {
            rich_text: [
              {
                text: {
                  content: data.modelName || 'General Inquiry',
                },
              },
            ],
          },
          Status: {
            select: {
              name: 'Pending',
            },
          },
        },
      });
      return response;
    } catch (error) {
      console.error('Error adding booking to Notion:', error);
      return null;
    }
  },
};
