'use client';

/**
 * Sanity Studio — embedded at /studio
 * Access at http://localhost:3000/studio in development
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID to be set to a real project ID
 */
import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity/sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
