import React, { useEffect, useState } from 'react';
import { client } from '../api/sanityClient';
import FadeInElement from './FadeInElement';

const FAQSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState([]);

  useEffect(() => {
    client.fetch(`*[_type == "faq"]|order(order asc){
      _id,
      question,
      answer,
      order,
      category
    }`).then(setFaqs).catch(() => setError('Neizdevās ielādēt BUJ.')).finally(() => setLoading(false));
  }, []);

  // Expand/collapse all
  const expandAll = () => setExpanded(faqs.map((_, i) => i));
  const collapseAll = () => setExpanded([]);

  if (loading) return (
    <section id="faq" className="section-padding bg-white">
      <div className="container">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto"></div>
          <p className="mt-4 text-gray-600">Ielādē BUJ...</p>
        </div>
      </div>
    </section>
  );

  if (error) return (
    <section id="faq" className="section-padding bg-white">
      <div className="container">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    </section>
  );

  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container max-w-3xl mx-auto">
        <FadeInElement className="text-center mb-12">
          <h2>BUJ</h2>
          <p className="text-xl text-gray-600 mt-4">Biežāk uzdotie jautājumi</p>
        </FadeInElement>
        {/* Expand/Collapse All Buttons */}
        <div className="flex justify-end gap-2 mb-4">
          <button onClick={expandAll} className="px-4 py-2 bg-brand text-white rounded hover:bg-brand-dark transition">Atvērt visus</button>
          <button onClick={collapseAll} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">Aizvērt visus</button>
        </div>
        {/* FAQ List */}
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, i) => (
            <div key={faq._id} className="py-4">
              <button
                className="w-full flex justify-between items-center text-left focus:outline-none"
                onClick={() => setExpanded((prev) => prev.includes(i) ? prev.filter(idx => idx !== i) : [...prev, i])}
                aria-expanded={expanded.includes(i)}
              >
                <span className="font-semibold text-lg text-gray-900">{faq.question}</span>
                <svg className={`w-6 h-6 ml-2 transform transition-transform duration-300 ${expanded.includes(i) ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ${expanded.includes(i) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                style={{ willChange: 'max-height, opacity' }}
                aria-hidden={!expanded.includes(i)}
              >
                <div className="mt-2 text-gray-700">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 