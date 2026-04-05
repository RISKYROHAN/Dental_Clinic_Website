import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-slate-200 rounded-3xl p-8 md:p-16 shadow-sm prose prose-slate prose-teal max-w-none">
          <h1 className="font-heading font-extrabold text-4xl text-slate-900 mb-8 pb-4 border-b border-slate-100">Privacy Policy</h1>
          
          <p className="font-medium"><strong>Effective Date:</strong> January 1, 2026</p>

          <p>
            At Digital Clinic ("we", "our", or "us"), we are uncompromisingly committed to protecting your privacy and ensuring the safety of all personal and medical information you entrust to us. This Privacy Policy describes how we collect, use, specify, and secure your personal data when you use our website or visit our clinic.
          </p>

          <h2 className="font-heading text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
          <p>
            When you interact with our website to book an appointment or send an inquiry, we may collect:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li><strong>Personal Identification Data:</strong> Your Name, Contact Number, and Preferred Date.</li>
            <li><strong>Medical Context:</strong> The stated reason for your visit (e.g., General Checkup, Tooth Pain) solely for preparation purposes.</li>
            <li><strong>Technical Data:</strong> For security monitoring (such as our spam and rate-limiting protections), we temporarily evaluate your IP Address.</li>
          </ul>

          <h2 className="font-heading text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            Your information is confidentially kept in a secure database and is strictly utilized for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>To schedule and physically confirm your dental appointment times.</li>
            <li>To reach out to you via call or email for patient care coordination.</li>
            <li>To protect our systems against automated abuse patterns using strict backend validation logic.</li>
          </ul>

          <h2 className="font-heading text-2xl font-bold mt-8 mb-4">3. Data Security and Retention</h2>
          <p>
            We implement sophisticated security parameters, state-of-the-art caching technologies, and strict administrative authentication layers on our digital properties to protect your data. Your data will only be kept as long as reasonably required to furnish dental services or fulfill legal and regulatory obligations.
          </p>

          <h2 className="font-heading text-2xl font-bold mt-8 mb-4">4. Contacting Us</h2>
          <p>
            If you have any questions or require revisions applied to the personal records we maintain on file, please refer to the contact details found in the footer of this website or reach out directly to <strong>contact@digitalclinic.com</strong>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
