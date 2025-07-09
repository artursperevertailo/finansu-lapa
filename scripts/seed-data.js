import 'dotenv/config';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'oqst5cr0',
  dataset: 'production',
  apiVersion: '2023-07-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Make sure to set this in your environment
});

const testimonials = [
  {
    _type: 'testimonial',
    name: 'Jānis Bērziņš',
    quote: 'Ļoti profesionāla attieksme un izcili finanšu risinājumi! Palīdzēja izvēlēties piemērotu uzkrājumu stratēģiju, kas ļauj man droši plānot nākotni.',
    company: 'SIA Lieliska Firma',
    rating: 5,
    publishedAt: new Date().toISOString(),
  },
  {
    _type: 'testimonial',
    name: 'Anna Ozola',
    quote: 'Palīdzēja saprast uzkrājumu stratēģiju un izvēlēties piemērotus risinājumus. Tagad jūtos drošāk par savu finanšu nākotni.',
    company: 'Privātpersona',
    rating: 5,
    publishedAt: new Date().toISOString(),
  },
  {
    _type: 'testimonial',
    name: 'Māris Kalniņš',
    quote: 'Profesionāls pieejums un skaidri skaidrojumi. Palīdzēja optimizēt nodokļu maksājumus un sākt uzkrāt pensijai.',
    company: 'SIA Mākslinieks',
    rating: 4,
    publishedAt: new Date().toISOString(),
  },
  {
    _type: 'testimonial',
    name: 'Līga Priede',
    quote: 'Ļoti apmierināta ar saņemto konsultāciju. Palīdzēja izvēlēties apdrošināšanas risinājumus un sākt uzkrāt bērnu izglītībai.',
    company: 'Māte ar 2 bērniem',
    rating: 5,
    publishedAt: new Date().toISOString(),
  },
  {
    _type: 'testimonial',
    name: 'Kārlis Ozols',
    quote: 'Pēc konsultācijas sapratu, ka varu sākt uzkrāt pat ar nelielām iemaksām. Tagad regulāri uzkrāju un jūtos drošāk.',
    company: 'Students',
    rating: 4,
    publishedAt: new Date().toISOString(),
  },
  {
    _type: 'testimonial',
    name: 'Inese Liepiņa',
    quote: 'Profesionāls pieejums un individuāli risinājumi. Palīdzēja izvēlēties piemērotu apdrošināšanu un sākt uzkrāt.',
    company: 'SIA Inovācijas',
    rating: 5,
    publishedAt: new Date().toISOString(),
  }
];

const faqs = [
  {
    _type: 'faq',
    question: 'Kā sākt uzkrāt naudu?',
    answer: 'Sāciet ar nelielām, regulārām iemaksām. Ieteicams sākt ar 10-20% no ikmēneša ienākumiem. Izvēlieties piemērotu uzkrājumu veidu atkarībā no jūsu mērķiem un laika horizonta.',
    order: 1,
    category: 'Uzkrājumi'
  },
  {
    _type: 'faq',
    question: 'Kāda ir minimālā iemaksa uzkrājumiem?',
    answer: 'Minimālā iemaksa ir 10 eiro mēnesī. Tomēr ieteicams sākt ar lielāku summu, ja to atļauj jūsu budžets.',
    order: 2,
    category: 'Uzkrājumi'
  },
  {
    _type: 'faq',
    question: 'Cik ilgi jāuzkrāj, lai redzētu rezultātus?',
    answer: 'Pirmos rezultātus var redzēt jau pēc 6-12 mēnešiem, bet ilgtermiņa uzkrājumi (5+ gadi) dod labākos rezultātus.',
    order: 3,
    category: 'Uzkrājumi'
  },
  {
    _type: 'faq',
    question: 'Vai uzkrājumi ir droši?',
    answer: 'Jā, visi uzkrājumu risinājumi ir licencēti un regulēti. Jūsu nauda ir aizsargāta un apdrošināta.',
    order: 1,
    category: 'Drošība'
  },
  {
    _type: 'faq',
    question: 'Kādi ir nodokļu priekšrocības?',
    answer: 'Uzkrājumi dod iespēju saņemt nodokļu atvieglojumus. Ikgadēji var saņemt atvieglojumu līdz 4000 eiro uzkrājumiem.',
    order: 2,
    category: 'Drošība'
  },
  {
    _type: 'faq',
    question: 'Kā izvēlēties piemērotu apdrošināšanu?',
    answer: 'Izvēlieties apdrošināšanu atkarībā no jūsu vajadzībām: dzīvības apdrošināšana, veselības apdrošināšana vai īpašuma apdrošināšana.',
    order: 1,
    category: 'Apdrošināšana'
  },
  {
    _type: 'faq',
    question: 'Vai varu pārtraukt uzkrājumus?',
    answer: 'Jā, uzkrājumus var pārtraukt jebkurā laikā. Tomēr ieteicams turpināt regulārus uzkrājumus ilgtermiņa mērķiem.',
    order: 4,
    category: 'Uzkrājumi'
  },
  {
    _type: 'faq',
    question: 'Kā aprēķināt nepieciešamo uzkrājumu summu?',
    answer: 'Aprēķiniet, cik naudas jums būs nepieciešams mērķa sasniegšanai un sadaliet to pa mēnešiem. Ņemiet vērā inflāciju un ienākumu pieaugumu.',
    order: 5,
    category: 'Uzkrājumi'
  },
  {
    _type: 'faq',
    question: 'Kādi ir komisijas maksājumi?',
    answer: 'Komisijas maksājumi ir atkarīgi no izvēlētā risinājuma. Mēs piedāvājam caurspīdīgus nosacījumus bez slēptiem maksājumiem.',
    order: 3,
    category: 'Drošība'
  },
  {
    _type: 'faq',
    question: 'Vai varu uzkrāt bērnu nākotnei?',
    answer: 'Jā, ir īpaši risinājumi bērnu izglītības un nākotnes uzkrājumiem ar nodokļu priekšrocībām.',
    order: 6,
    category: 'Uzkrājumi'
  }
];

async function clearData() {
  try {
    const testimonialIds = await client.fetch(`*[_type == "testimonial"]._id`);
    const faqIds = await client.fetch(`*[_type == "faq"]._id`);
    for (const id of testimonialIds.concat(faqIds)) {
      await client.delete(id);
    }
  } catch (error) {
    console.error('❌ Kļūda dzēšot datus:', error);
  }
}

async function seedData({ clear = false } = {}) {
  try {
    if (!process.env.SANITY_API_TOKEN) {
      console.error('❌ SANITY_API_TOKEN not found in environment variables');
      console.log('💡 Please set SANITY_API_TOKEN in your .env file');
      return;
    }
    
    if (clear) await clearData();
    console.log('🌱 Sāk datu iestatīšanu...');

    // Create testimonials
    console.log('📝 Izveido atsauksmes...');
    for (const testimonial of testimonials) {
      await client.create(testimonial);
      console.log(`✅ Izveidota atsauksme: ${testimonial.name}`);
    }

    // Create FAQs
    console.log('❓ Izveido jautājumus...');
    for (const faq of faqs) {
      await client.create(faq);
      console.log(`✅ Izveidots jautājums: ${faq.question.substring(0, 50)}...`);
    }

    console.log('🎉 Visi dati veiksmīgi iestatīti!');
  } catch (error) {
    console.error('❌ Kļūda datu iestatīšanā:', error.message);
    if (error.message.includes('Unauthorized') || error.message.includes('Insufficient permissions')) {
      console.log('💡 Check your SANITY_API_TOKEN - it needs write permissions');
    }
  }
}

// CLI usage: node scripts/seed-data.js [--clear]
const isMainModule = process.argv[1] && process.argv[1].endsWith('seed-data.js');

if (isMainModule) {
  const clear = process.argv.includes('--clear');
  seedData({ clear });
} 