import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'oqst5cr0', // replace with your project ID if different
  dataset: 'production',
  apiVersion: '2023-07-01',
  useCdn: true, // use CDN for faster, read-only queries
});

export default client; 