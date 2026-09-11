'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import FloatingMedicalElements from '@/components/FloatingMedicalElements';

const faqs = [
  { q: 'How do I book a test?', a: 'Simply browse our packages, select the ones you need, and proceed to checkout. You can also upload a prescription and our experts will recommend suitable tests.' },
  { q: 'What is the home collection process?', a: 'Once you book, our certified phlebotomist will visit your home at the selected time slot to collect the sample. The sample is then transported to our lab for testing.' },
  { q: 'How long does it take to get results?', a: 'Most test results are available within 24-48 hours. Some specialized tests may take 3-5 days. You will receive an SMS notification when results are ready.' },
  { q: 'Are the labs NABL accredited?', a: 'Yes, all our partner labs are NABL (National Accreditation Board for Testing and Calibration Laboratories) accredited, ensuring international quality standards.' },
  { q: 'Do I need to fast before the test?', a: 'Some tests require fasting. This information is clearly mentioned on each package. For fasting tests, we recommend 10-12 hours of fasting before sample collection.' },
  { q: 'How do I cancel or reschedule?', a: 'You can cancel or reschedule your appointment through the Track Order page or by contacting our customer support at least 4 hours before the scheduled slot.' },
  { q: 'Is my data secure?', a: 'Absolutely. We follow strict data protection protocols and comply with all relevant healthcare data regulations. Your medical information is encrypted and secure.' },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen">
      <FloatingMedicalElements />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-slate-600">Got questions? We've got answers</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full p-6 flex items-center justify-between text-left">
                <span className="font-medium text-slate-900">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="px-6 pb-6 text-slate-600">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}