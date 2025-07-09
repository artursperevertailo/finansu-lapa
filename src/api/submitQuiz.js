import { createClient } from '@sanity/client';

const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'oqst5cr0',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2023-07-01',
  useCdn: false,
  token: import.meta.env.VITE_SANITY_API_TOKEN, // set this in your environment for write access
});

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, phone, answers } = data;
    const doc = {
      _type: 'quizResult',
      name,
      email,
      phone,
      answers,
      submittedAt: new Date().toISOString(),
    };
    const result = await client.create(doc);
    return new Response(JSON.stringify({ success: true, id: result._id }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
} 