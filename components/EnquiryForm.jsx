"use client";
import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function EnquiryForm() {
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const formData = {
      name: e.target[0].value,
      phone: e.target[1].value,
      preferredDate: e.target[2].value,
      reason: e.target[3].value,
    };

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setStatus('success');
      e.target.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      alert('Failed to submit. Please try again.');
      setStatus('idle');
    }
  };

  return (
    <section id="book" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">

          <div className="flex-1">
            <h2 className="font-heading font-extrabold text-4xl text-slate-900 mb-6">Book Your Appointment</h2>
            <p className="text-slate-600 text-lg mb-8">
              Take the first step towards a perfect smile. Fill out the form, and our digital clinic coordinator will contact you to confirm your slot.
            </p>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Clinic Location</h3>
              <div className="w-full h-64 bg-slate-200 rounded-xl overflow-hidden relative border border-slate-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.7674407896952!2d88.35104070968063!3d22.550382833701097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02773d5cc75f8f%3A0xffbae06d892adea7!2sSurya%20Alloy%20Industries%20Ltd!5e0!3m2!1sen!2sin!4v1775124524864!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Clinic Location Map"
                />
              </div>
              <div className="mt-4">
                <p className="font-medium text-slate-900">Digital Dental Clinic</p>
                <p className="text-slate-600">1, Camac St, Park Street area, Kolkata, West Bengal 700016</p>
                <p className="text-teal-600 font-medium mt-2">Mon - Sat: 9:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100">
              {status === 'success' && (
                <div className="mb-6 p-4 bg-teal-50 border border-teal-200 text-teal-800 rounded-xl flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-teal-600" />
                  <div>
                    <p className="font-bold">Request Received!</p>
                    <p className="text-sm">We'll call you shortly to confirm.</p>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" placeholder="Full Name" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                    <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none transition-all" placeholder="+91 1234567890" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Date</label>
                    <input required type="date" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Reason for Visit</label>
                  <select required className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none transition-all bg-white text-slate-700">
                    <option value="">Select a reason...</option>
                    <option value="General Checkup">General Checkup</option>
                    <option value="Tooth Pain">Tooth Pain</option>
                    <option value="Cosmetic">Tooth Whitening</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-teal-600/30 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === 'loading' ? (
                    <span className="animate-pulse">Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Enquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
