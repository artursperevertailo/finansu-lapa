import { createClient } from '@sanity/client';

const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'oqst5cr0',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2023-07-01',
  useCdn: true, // use CDN for faster, read-only queries
});

export default client; 