"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What should I do if I have a toothache?",
    answer: "A toothache can be a sign of infection, decay, or damage. Rinse your mouth with warm water, gently floss to remove any food caught between teeth, and take over-the-counter pain relievers if needed. Contact us immediately to schedule an appointment."
  },
  {
    question: "How often should I get a dental checkup and cleaning?",
    answer: "We generally recommend visiting the dentist for a routine checkup and professional cleaning every six months. However, your specific needs may vary depending on your oral health status."
  },
  {
    question: "Do you offer treatments for bleeding gums?",
    answer: "Yes, bleeding gums are often a sign of gingivitis or gum disease. We provide comprehensive periodontal therapies including deep cleaning (scaling and root planing) to restore your gum health."
  },
  {
    question: "What are my options for replacing a missing tooth?",
    answer: "We offer several solutions for missing teeth, including dental implants, bridges, and dentures. During a consultation, our dentists will assess your situation and recommend the best personalized option."
  },
  {
    question: "Is teeth whitening safe for my enamel?",
    answer: "Professional teeth whitening performed or supervised by a dentist is extremely safe. We use specialized clinical-grade whitening agents that effectively lift stains without compromising your tooth enamel."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-extrabold text-4xl text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-600 text-lg">Find answers to common dental concerns and problems.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-teal-500 shadow-md' : 'border-slate-200'}`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none cursor-pointer"
              >
                <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-teal-600 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
