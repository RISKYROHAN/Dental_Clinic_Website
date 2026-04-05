import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-slate-800 pb-8 mb-8">
          <div>
            <span className="font-heading font-bold text-2xl text-white tracking-tight block mb-2">Digital Clinic</span>
            <p className="text-sm text-slate-400 max-w-xs">Premium Dental Care. Experience painless, state-of-the-art dentistry with our exceptional team.</p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-slate-400">
            <h4 className="font-bold text-white text-base mb-1">Contact Us</h4>
            <p>Email: contact@digitalclinic.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Address: 1, Camac St, Kolkata, 700016</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Digital Clinic. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:text-teal-400 transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
