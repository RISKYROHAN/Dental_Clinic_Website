import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsConditions() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-slate-200 rounded-3xl p-8 md:p-16 shadow-sm prose prose-slate prose-teal max-w-none">
          <h1 className="font-heading font-extrabold text-4xl text-slate-900 mb-8 pb-4 border-b border-slate-100">Terms & Conditions</h1>
          
          <p className="font-medium"><strong>Last Updated:</strong> January 1, 2026</p>

          <p>
            Welcome to Digital Clinic. By accessing our website, booking an appointment, or using any of our digital services, you agree to be bound by the succeeding Terms & Conditions. Please read them cautiously before proceeding with our services.
          </p>

          <h2 className="font-heading text-2xl font-bold mt-8 mb-4">1. Appointments and Cancellations</h2>
          <p>
            All appointment requests submitted through our Website Enquiry System are considered "Requests" until physically confirmed by one of our team members. 
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
             <li>Please expect a phone call shortly after your digital booking.</li>
             <li>If you need to cancel or adjust your timeslot, kindly notify us at least 24 hours in advance to allow reallocation of the timeframe to other patients in need.</li>
          </ul>

          <h2 className="font-heading text-2xl font-bold mt-8 mb-4">2. Professional Medical Disclaimer</h2>
          <p>
            The content, information, and FAQs provided on this website are exclusively for informational purposes. None of the digital materials should be arbitrarily used or considered as a substitute for direct professional medical advice, comprehensive diagnosis, or dedicated treatment plans authorized by a licensed healthcare provider in a clinical setting.
          </p>

          <h2 className="font-heading text-2xl font-bold mt-8 mb-4">3. Website Use and Security</h2>
          <p>
            In order to ensure fair usage of our digital enquiry platform, our systems utilize Rate Limiting technologies to prohibit abuse, spam, and brute-force interactions. Repeated automated submissions or attempts to breach restricted administrative areas will result in permanent IP blacklisting. 
          </p>

          <h2 className="font-heading text-2xl font-bold mt-8 mb-4">4. Revisions and Modifications</h2>
          <p>
            Digital Clinic definitively reserves the right to modify or replace these Terms at any given time without immediate external notice. We advise routinely visiting this page to remain informed to the latest operational expectations.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
